import React, { useState, createContext, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { icons, SidebarItem } from "./sidebarIcons";

// Create context for sidebar state
export const SidebarContext = createContext();

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebarContext must be used within a SidebarProvider');
    }
    return context;
};

export function SidebarProvider({ children }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
            {children}
        </SidebarContext.Provider>
    );
}

// Separate component for the actual sidebar
function DesktopInsightsSidebarComponent() {
    const { collapsed, setCollapsed } = useSidebarContext();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    // Responsive sidebar width
    const W = collapsed ? 72 : 240;

    return (
        <aside
            style={{
                top: 0,
                width: W,
                left: 0,
                height: '100vh'
            }}
            className="hidden md:block fixed z-[1000] bg-white border-r border-gray-100 shadow-sm transition-all duration-300 overflow-hidden"
        >
            <div className="h-full flex flex-col">
                {/* Branding in sidebar */}
                {!collapsed && (
                    <div className="px-6 py-6 border-b border-gray-50 bg-gray-50/30">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-[#e53e3e]">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] font-black text-gray-900 tracking-wider uppercase leading-none">Intelligence</span>
                                <span className="text-[9px] text-gray-400 font-bold mt-1 tracking-tighter leading-none uppercase">100ACRESS INSIGHT</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Items */}
                <nav className="p-3 overflow-y-auto flex-1 space-y-6">
                    <div>
                        {!collapsed && <p className="px-3 mb-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Market Analysis</p>}
                        <div className="space-y-1">
                            <SidebarItemLux
                                to="/insights/property-insights"
                                label="Property Insights"
                                icon={icons.property}
                                active={isActive('/insights/property-insights')}
                                showLabel={!collapsed}
                            />
                            <SidebarItemLux
                                to="/insights/price-trends"
                                label="Price Trends"
                                icon={icons.trends}
                                active={isActive('/insights/price-trends')}
                                showLabel={!collapsed}
                            />
                        </div>
                    </div>

                    <div>
                        {!collapsed && <p className="px-3 mb-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Reports & Strategic</p>}
                        <div className="space-y-1">
                            <SidebarItemLux
                                to="/insights/market-reports"
                                label="Market Reports"
                                icon={icons.market}
                                active={isActive('/insights/market-reports')}
                                showLabel={!collapsed}
                                badge="NEW"
                            />
                            <SidebarItemLux
                                to="/insights/blog"
                                label="Insight Blog"
                                icon={icons.blog}
                                active={isActive('/insights/blog')}
                                showLabel={!collapsed}
                            />
                            <SidebarItemLux
                                to="/insights/news"
                                label="Market News"
                                icon={icons.news}
                                active={isActive('/insights/news')}
                                showLabel={!collapsed}
                            />
                            <SidebarItemLux
                                to="/insights/guides"
                                label="Expert Guides"
                                icon={icons.guides}
                                active={isActive('/insights/guides')}
                                showLabel={!collapsed}
                            />
                        </div>
                    </div>
                </nav>

                {/* Footer: Collapse Action */}
                <div className="p-3 border-t border-gray-100 bg-gray-50/50">
                    <button
                        className="w-full flex items-center justify-center gap-3 text-gray-400 hover:text-[#e53e3e] py-3 rounded-xl hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-300 group shadow-sm"
                        onClick={() => setCollapsed((c) => !c)}
                    >
                        <span className={`transform transition-transform duration-500 ${collapsed ? 'rotate-180' : ''}`}>
                            <svg className="w-5 h-5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M11 19l-7-7 7-7" />
                                <path d="M16 19l-7-7 7-7" />
                            </svg>
                        </span>
                        {!collapsed && <span className="text-[10px] font-black tracking-widest uppercase">Minimize</span>}
                    </button>
                </div>
            </div>
        </aside>
    );
}

// Export the sidebar component as default
export default DesktopInsightsSidebarComponent;
function SidebarItemLux({ to, label, icon, active, showLabel, badge }) {
    return (
        <Link
            to={to}
            className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 ${active
                ? "bg-red-50 border border-red-100 text-[#e53e3e] shadow-sm"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
        >
            <div className={`flex-shrink-0 transition-all duration-300 ${active ? "text-[#e53e3e]" : "group-hover:text-[#e53e3e]"}`}>
                {icon}
            </div>
            {showLabel && (
                <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm font-bold tracking-tight">{label}</span>
                    {badge && (
                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-[#e53e3e] text-white">
                            {badge}
                        </span>
                    )}
                </div>
            )}
            {active && (
                <div className="absolute right-0 top-3 bottom-3 w-[4px] bg-[#e53e3e] rounded-l-full"></div>
            )}
        </Link>
    );
}
