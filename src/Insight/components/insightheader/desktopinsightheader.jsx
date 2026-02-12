import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import { ChevronDown } from "lucide-react";
import { useSidebarContext } from "../insightsidebar/desktopinsightsidebar";
import AdvancedSearchOverlay from "./AdvancedSearchOverlay";
import NotificationOverlay from "./NotificationOverlay";

export default function DesktopInsightsHeader() {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const { agentData, isAuthenticated, showLogin } = useAuth();
    const { collapsed } = useSidebarContext();

    // Dynamic left margin based on sidebar state
    const sidebarWidth = collapsed ? 72 : 240;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Real user initials generator
    const getInitials = () => {
        if (!isAuthenticated) return "";

        // Try to get name from multiple sources
        const name = agentData?.name ||
            agentData?.fullName ||
            agentData?.firstName ||
            agentData?.userName ||
            localStorage.getItem("name") ||
            localStorage.getItem("firstName") ||
            localStorage.getItem("userName") ||
            localStorage.getItem("user_name") ||
            "";

        if (!name) {
            console.log("No user name found in agentData or localStorage");
            return "";
        }

        console.log("Found user name:", name);
        const names = name.trim().split(/\s+/);
        if (names.length >= 2) {
            return (names[0][0] + names[names.length - 1][0]).toUpperCase();
        }
        return names[0].slice(0, 2).toUpperCase();
    };

    return (
        <>
            <header
                style={{ left: `${sidebarWidth}px` }}
                className={`fixed top-0 right-0 h-16 z-[1001] transition-all duration-300 px-6 border-b flex items-center justify-between ${scrolled
                    ? "bg-white border-gray-200 shadow-md"
                    : "bg-white border-gray-100"
                    }`}
            >
                {/* Left: Branding & Context */}
                <div className="flex items-center gap-4">
                    <Link to="/real-estate-insights">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#e53e3e] rounded-lg flex items-center justify-center p-1.5 shadow-sm">
                                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-full h-full">
                                    <path d="M3 9.5L12 4l9 5.5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-11z" />
                                    <path d="M9 22V12h6v10" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-bold text-gray-900 tracking-tight mt-2">
                                Real Estate <span className="text-[#e53e3e]">Insights</span>
                            </h1>
                        </div>
                    </Link>
                </div>

                {/* Center: Search Trigger */}
                <div
                    className={`header-search-container max-w-md w-full mx-8 hidden sm:block transition-all duration-300 ${isSearchOverlayOpen ? "scale-[1.02]" : "hover:scale-[1.01]"
                        }`}
                >
                    <div className={`relative group flex items-center transition-all duration-300 ${isSearchOverlayOpen ? "z-[1001]" : ""}`}>
                        <div className="absolute left-0 pl-3.5 flex items-center pointer-events-none z-10">
                            <svg className={`h-4.5 w-4.5 transition-colors duration-300 ${isSearchOverlayOpen ? "text-[#e53e3e]" : "text-gray-400 group-focus-within:text-[#e53e3e]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            onFocus={() => setIsSearchOverlayOpen(true)}
                            onClick={() => setIsSearchOverlayOpen(true)}
                            className={`block w-full pl-11 pr-10 py-2.5 bg-gray-50 border rounded-xl leading-relaxed text-sm transition-all shadow-sm outline-none ${isSearchOverlayOpen
                                ? "border-[#e53e3e] bg-white text-gray-900 ring-2 ring-red-50"
                                : "border-gray-200 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                                }`}
                            placeholder="Search properties, trends, reports..."
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsSearchOverlayOpen(!isSearchOverlayOpen);
                            }}
                            className="absolute right-3 p-1 text-gray-400 hover:text-[#e53e3e] transition-colors"
                        >
                            <ChevronDown size={18} className={`transition-transform duration-300 ${isSearchOverlayOpen ? "rotate-180 text-[#e53e3e]" : ""}`} />
                        </button>
                    </div>
                </div>

                {/* Right: Actions & Profile */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                            className={`relative p-2 rounded-full transition-all group ${isNotificationOpen ? "bg-red-50 text-[#e53e3e]" : "text-gray-500 hover:text-[#e53e3e] hover:bg-red-50"}`}
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute top-2 right-2 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                        </button>

                        <NotificationOverlay
                            isOpen={isNotificationOpen}
                            onClose={() => setIsNotificationOpen(false)}
                        />
                    </div>

                    {/* Profile Icon Only */}
                    <div
                        onClick={() => !isAuthenticated && showLogin()}
                        className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-[#e53e3e] font-black text-xs shadow-inner cursor-pointer hover:bg-red-200 transition-colors"
                        title={agentData?.name || "Guest"}
                    >
                        {getInitials()}
                    </div>
                </div>
            </header>

            <AdvancedSearchOverlay
                isOpen={isSearchOverlayOpen}
                onClose={() => setIsSearchOverlayOpen(false)}
            />
        </>
    );
}