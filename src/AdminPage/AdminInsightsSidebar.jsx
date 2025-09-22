import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminInsightsSidebar() {
  const location = useLocation();
  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + "/");

  const Item = ({ to, label }) => (
    <Link
      to={to}
      aria-current={isActive(to) ? 'page' : undefined}
      className={`group flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 outline-none focus:ring-2 focus:ring-indigo-500/30 ${
        isActive(to)
          ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm border border-blue-100"
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <span className="flex items-center gap-3 min-w-0">
        <span className={`shrink-0 rounded-full ${isActive(to) ? "w-2.5 h-2.5 bg-blue-600 ring-2 ring-blue-200" : "w-2 h-2 bg-gray-300 group-hover:bg-gray-400"}`} />
        <span className="font-medium text-sm truncate">{label}</span>
      </span>
      <svg viewBox="0 0 24 24" className={`w-3.5 h-3.5 transition-opacity ${isActive(to) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} fill="currentColor">
        <path d="M9 6l6 6-6 6" />
      </svg>
    </Link>
  );

  return (
    <aside
      style={{ top: 'var(--nav-h, 64px)', width: 280, left: 0, height: 'calc(100vh - var(--nav-h, 64px))' }}
      className="hidden md:block fixed z-[9990] bg-white/95 backdrop-blur-xl border-r border-gray-200 shadow-lg"
    >
      <div className="h-full flex flex-col">
        <div className="px-4 py-4 border-b border-gray-100 flex items-center gap-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
          <div className="w-8 h-8 text-blue-600 bg-white rounded-lg p-1.5 shadow-sm flex-shrink-0 grid place-items-center font-bold">IN</div>
          <div className="text-lg font-bold text-gray-900 truncate">Insights</div>
        </div>

        <nav className="p-3 overflow-y-auto flex-1 space-y-1">
          <Item to="/Admin/insights" label="Dashboard" />
          <div className="h-px bg-gray-200 my-2" />
          <Item to="/Admin/insights/price-trends" label="Price Trends Banners" />
          <Item to="/Admin/insights/property-insights" label="Property Insights Banners" />
        </nav>

        <div className="border-t border-gray-100 p-3 text-xs text-gray-500">
          Manage Insights assets from here
        </div>
      </div>
    </aside>
  );
}
