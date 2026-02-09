import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { icons } from "./sidebarIcons";
import { useSidebar } from "./SidebarContext";

export default function MobileInsightsSidebar() {
    const { isMobileSidebarOpen: mobileOpen, closeMobileSidebar: setMobileOpenFalse } = useSidebar();
    const setMobileOpen = (val) => { if (!val) setMobileOpenFalse(); };

    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const drawerRef = useRef(null);
    const closeBtnRef = useRef(null);

    const [expandedSections, setExpandedSections] = useState({
        insights: true
    });

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpenFalse();
    }, [location.pathname]);

    // Handle ESC key
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') setMobileOpenFalse();
        };
        if (mobileOpen) {
            window.addEventListener('keydown', onKey);
        }
        return () => window.removeEventListener('keydown', onKey);
    }, [mobileOpen]);

    // Prevent background scroll
    useEffect(() => {
        const original = document.body.style.overflow;
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = original || '';
        }
        return () => {
            document.body.style.overflow = original || '';
        };
    }, [mobileOpen]);

    // Focus trap implementation
    useEffect(() => {
        if (!mobileOpen) return;
        const t = setTimeout(() => {
            closeBtnRef.current?.focus();
        }, 0);
        const getFocusable = () => {
            const root = drawerRef.current;
            if (!root) return [];
            return Array.from(root.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
        };
        const handleTab = (e) => {
            if (e.key !== 'Tab') return;
            const focusables = getFocusable();
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            const active = document.activeElement;
            if (e.shiftKey) {
                if (active === first || !drawerRef.current?.contains(active)) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (active === last || !drawerRef.current?.contains(active)) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', handleTab, true);
        return () => {
            clearTimeout(t);
            document.removeEventListener('keydown', handleTab, true);
        };
    }, [mobileOpen]);

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <>
            {/* Enhanced Backdrop with Gradient */}
            <div
                className={`${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} md:hidden fixed inset-0 bg-gradient-to-br from-gray-900/70 via-gray-900/60 to-black/70 backdrop-blur-md z-[9991] transition-all duration-500`}
                onClick={() => setMobileOpenFalse()}
                aria-hidden="true"
            />

            {/* Redesigned Compact Sidebar - Reduced Width */}
            <div
                role="dialog"
                aria-modal="true"
                className={`md:hidden fixed z-[9993] top-0 bottom-0 left-0 w-[280px] bg-white from-white via-gray-50/50 to-white border-r border-gray-200 shadow-2xl transform transition-all duration-500 ease-out flex flex-col ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
                ref={drawerRef}
            >
                {/* Premium Header - Matching Desktop Theme */}
                <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-3">
                        {/* Logo Icon - Matching Desktop */}
                        <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-[#e53e3e] shadow-sm">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-black text-gray-900 tracking-wider uppercase leading-none">Intelligence</span>
                            <span className="text-[9px] text-gray-400 font-bold mt-1 tracking-tighter leading-none uppercase">100ACRESS INSIGHTS</span>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setMobileOpenFalse()}
                        ref={closeBtnRef}
                        className="p-2 text-gray-400 hover:text-[#e53e3e] rounded-xl bg-gray-50 hover:bg-red-50 transition-all duration-200 border border-transparent hover:border-red-100 active:scale-95"
                    >
                        {icons.close}
                    </button>
                </div>

                {/* Navigation with Enhanced Spacing */}
                <nav className="overflow-y-auto py-4 px-3 flex-1 space-y-5">
                    <div className="space-y-2">
                        <button
                            onClick={() => toggleSection('insights')}
                            className="w-full flex items-center justify-between px-2.5 py-1.5 text-[10px] font-black text-gray-500 uppercase tracking-widest focus:outline-none hover:text-[#e53e3e] transition-colors rounded-lg hover:bg-red-50/50"
                        >
                            <span>Dashboard</span>
                            <span className={`transform transition-transform duration-300 ${expandedSections.insights ? 'rotate-180' : ''}`}>
                                {icons.chevronDown}
                            </span>
                        </button>

                        {expandedSections.insights && (
                            <div className="space-y-1.5 mt-2">
                                <SidebarItemLux
                                    to="/insights/property-insights"
                                    label="Property Insights"
                                    icon={icons.property}
                                    active={isActive('/insights/property-insights')}
                                    onClick={() => setMobileOpen(false)}
                                />
                                <SidebarItemLux
                                    to="/insights/price-trends"
                                    label="Price Analytics"
                                    icon={icons.trends}
                                    active={isActive('/insights/price-trends')}
                                    onClick={() => setMobileOpen(false)}
                                />
                                <SidebarItemLux
                                    to="/insights/market-reports"
                                    label="Market Reports"
                                    icon={icons.market}
                                    active={isActive('/insights/market-reports')}
                                    badge="NEW"
                                    onClick={() => setMobileOpen(false)}
                                />
                                <SidebarItemLux
                                    to="/insights/blog"
                                    label="Insight Blog"
                                    icon={icons.blog}
                                    active={isActive('/insights/blog')}
                                    onClick={() => setMobileOpen(false)}
                                />
                                <SidebarItemLux
                                    to="/insights/news"
                                    label="Market News"
                                    icon={icons.news}
                                    active={isActive('/insights/news')}
                                    onClick={() => setMobileOpen(false)}
                                />
                                <SidebarItemLux
                                    to="/insights/guides"
                                    label="Expert Guides"
                                    icon={icons.guides}
                                    active={isActive('/insights/guides')}
                                    onClick={() => setMobileOpen(false)}
                                />
                            </div>
                        )}
                    </div>
                </nav>

                {/* Compact Footer with Gradient */}
                <div className="p-3 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <p className="text-[10px] font-bold text-gray-600 tracking-wide">
                            <span className="text-[#e53e3e]">100acress</span> Intelligence
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

function SidebarItemLux({ to, label, icon, active, badge, onClick }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`group relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-300 ${active
                ? "bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200 text-[#e53e3e] shadow-md"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 border border-transparent hover:border-gray-200"
                }`}
        >
            <div className={`transition-all duration-300 flex-shrink-0 ${active ? "text-[#e53e3e] scale-110" : "group-hover:text-[#e53e3e] group-hover:scale-105"}`}>
                {icon}
            </div>
            <div className="flex-1 flex items-center justify-between min-w-0">
                <span className="text-sm font-bold tracking-tight truncate">{label}</span>
                {badge && (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-gradient-to-r from-[#e53e3e] to-[#c62828] text-white shadow-sm flex-shrink-0 ml-1">
                        {badge}
                    </span>
                )}
            </div>
            {active && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-[#e53e3e] to-[#c62828] rounded-r-full shadow-sm"></div>
            )}
        </Link>
    );
}
