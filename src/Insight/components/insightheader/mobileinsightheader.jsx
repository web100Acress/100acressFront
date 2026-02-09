import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSidebar } from "../insightsidebar/SidebarContext";
import { useAuth } from "../../../AuthContext";

export default function MobileInsightsHeader() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { openMobileSidebar } = useSidebar();
    const { agentData, isAuthenticated, showLogin } = useAuth();

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
        <header className="fixed top-0 left-0 right-0 z-[1001] bg-gradient-to-r from-white via-gray-50 to-white backdrop-blur-md border-b border-gray-200 shadow-lg transition-all duration-300">
            <div className="h-16 flex items-center justify-between px-4">
                {/* Left: Hamburger & Branding */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={openMobileSidebar}
                        className="p-2.5 -ml-2 text-gray-600 hover:text-[#e53e3e] hover:bg-red-50 rounded-xl transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                        aria-label="Open sidebar"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <Link to="/analytics" className="group">
                        <div className="flex items-center gap-2">
                            {/* Logo Icon */}
                            <div className="w-8 h-8 bg-gradient-to-br from-[#e53e3e] to-[#c62828] rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>

                            <h1 className="text-lg font-bold text-gray-900 tracking-tight">
                                100acress <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e53e3e] to-[#c62828]">Insights</span>
                            </h1>
                        </div>
                    </Link>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                    {/* <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className={`p-2.5 rounded-xl transition-all duration-200 active:scale-95 shadow-sm ${isSearchOpen
                            ? "bg-gradient-to-br from-red-50 to-red-100 text-[#e53e3e] shadow-md"
                            : "text-gray-600 hover:bg-gray-100 hover:shadow-md"
                            }`}
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button> */}

                    <button className="p-2.5 text-gray-600 hover:text-[#e53e3e] hover:bg-red-50 rounded-xl relative transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-sm"></span>
                        </span>
                    </button>

                    <div
                        onClick={() => !isAuthenticated && showLogin()}
                        className="h-9 w-9 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center text-[#e53e3e] font-black text-[11px] border-2 border-white shadow-md hover:shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        {getInitials()}
                    </div>
                </div>
            </div>



            {/* Persistent Search Bar & Filter - Row 2 */}
            <div className="px-4 py-3 bg-white border-t border-gray-100">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        readOnly
                        onClick={() => setIsFilterOpen(true)}
                        className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-[#e53e3e] transition-all shadow-sm cursor-pointer"
                        placeholder="Search & Filter..."
                    />
                </div>
            </div>

            {/* Mobile Filter Overlay */}
            {isFilterOpen && (
                <div className="absolute top-full left-0 right-0 z-[1000] bg-white border-t border-gray-100 shadow-xl rounded-b-3xl max-h-[85vh] overflow-y-auto animate-slide-down">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-900">Search & Filter</h3>
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Active Search Input in Overlay */}
                        {/* <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                autoFocus
                                className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-[#e53e3e] transition-all shadow-sm"
                                placeholder="Search properties, trends, insights..."
                            />
                        </div> */}

                        <div className="space-y-6">
                            {/* Filter Options Placeholder */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Apartment', 'Villa', 'Plot', 'Commercial'].map(type => (
                                        <button key={type} className="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all">
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                                <input type="range" className="w-full accent-red-500" />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>₹0</span>
                                    <span>₹5Cr+</span>
                                </div>
                            </div>

                            <button className="w-full py-3 bg-[#e53e3e] text-white rounded-xl font-bold shadow-lg shadow-red-200 active:scale-95 transition-all">
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
