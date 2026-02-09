import React from "react";
import { Link } from "react-router-dom";

export const icons = {
    insights: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M9 11H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z" />
            <path d="M17 7h-2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            <path d="M5 15v-3a2 2 0 0 1 2-2h2" />
            <path d="M19 9V6a2 2 0 0 0-2-2h-2" />
        </svg>
    ),
    property: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M3 9.5L12 4l9 5.5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-11z" />
            <path d="M9 22V12h6v10" />
        </svg>
    ),
    trends: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    ),
    blog: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10,9 9,9 8,9" />
        </svg>
    ),
    news: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
            <path d="M18 14h-8" />
            <path d="M15 18h-5" />
            <path d="M10 6h8v4h-8V6z" />
        </svg>
    ),
    guides: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
    ),
    calculator: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="8" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="12" y2="14" />
            <line x1="8" y1="18" x2="12" y2="18" />
            <circle cx="16" cy="16" r="2" />
        </svg>
    ),
    loan: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
            <path d="M16 8a6 6 0 0 0-8 0" />
        </svg>
    ),
    menu: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    ),
    close: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    ),
    chevronDown: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <polyline points="6,9 12,15 18,9" />
        </svg>
    ),
    market: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M21 21V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" />
            <path d="M3 21h18" />
            <path d="M7 21V7" />
            <path d="M11 21V7" />
            <path d="M15 21V7" />
            <path d="M19 21V7" />
            <path d="M3 15h18" />
            <path d="M3 11h18" />
        </svg>
    ),
    investment: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
        </svg>
    ),
    area: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    ),
    collapse: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M15 18l-6-6 6-6" />
        </svg>
    )
};

export const SidebarItem = ({ to, label, icon, active, showLabel = true, badge = null, isNew = false, onClick }) => {
    return (
        <Link
            to={to}
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${active
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm border border-blue-100'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
            onClick={onClick}
            aria-label={!showLabel ? label : undefined}
            title={!showLabel ? label : undefined}
        >
            <span className={`flex-shrink-0 ${active ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-500'} transition-colors`}>
                {icon}
            </span>
            {showLabel && (
                <div className="flex-1 min-w-0 flex items-center justify-between">
                    <span className="font-medium text-sm truncate">{label}</span>
                    <div className="flex items-center gap-1">
                        {isNew && (
                            <span className="px-1.5 py-0.5 text-xs font-medium rounded-md bg-green-100 text-green-700">
                                New
                            </span>
                        )}
                        {badge && (
                            <span className="px-1.5 py-0.5 text-xs font-medium rounded-md bg-blue-100 text-blue-700">
                                {badge}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </Link>
    );
};
