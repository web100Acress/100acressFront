import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Enhanced Insights sidebar with better icons and responsiveness
export default function AdminInsightsSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const drawerRef = React.useRef(null);
  const closeBtnRef = React.useRef(null);

  // Enhanced icons with better design
  const icons = {
    insights: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M9 11H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"/>
        <path d="M17 7h-2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
        <path d="M5 15v-3a2 2 0 0 1 2-2h2"/>
        <path d="M19 9V6a2 2 0 0 0-2-2h-2"/>
      </svg>
    ),
    property: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M3 9.5L12 4l9 5.5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-11z"/>
        <path d="M9 22V12h6v10"/>
      </svg>
    ),
    trends: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    menu: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    ),
    close: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    ),
    collapse: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <polyline points="15,18 9,12 15,6"/>
      </svg>
    )
  };

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Responsive sidebar width
  const W = collapsed ? 64 : 280;

  const item = (to, label, icon, showLabel = true, badge = null, isNew = false) => {
    const active = isActive(to);
    return (
      <Link
        to={to}
        className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
          active
            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm border border-blue-100'
            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
        }`}
        onClick={() => setMobileOpen(false)}
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

  return (
    <>
      {/* Mobile: Enhanced hamburger trigger */}
      <button
        type="button"
        aria-label="Open admin menu"
        aria-controls="admin-mobile-drawer"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed left-4 top-[calc(var(--nav-h,64px)+12px)] z-[9992] inline-flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200 bg-white/90 backdrop-blur-sm shadow-lg text-gray-700 hover:bg-white hover:shadow-xl transition-all duration-200"
      >
        {icons.menu}
        {/* Notification dot for mobile */}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></span>
      </button>

      {/* Mobile: Enhanced overlay */}
      <div
        className={`${mobileOpen ? 'fixed' : 'hidden'} md:hidden inset-0 bg-black/50 backdrop-blur-sm z-[9991] transition-opacity duration-300`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile: Enhanced drawer */}
      <div
        id="admin-mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Admin navigation"
        className={`md:hidden fixed z-[9993] top-0 bottom-0 left-0 w-80 bg-white/95 backdrop-blur-xl border-r border-gray-200 shadow-2xl transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        ref={drawerRef}
      >
        <div className="h-full flex flex-col">
          {/* Enhanced header */}
          <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 text-blue-600 bg-white rounded-lg p-1.5 shadow-sm">
                {icons.insights}
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">Admin Panel</div>
                <div className="text-xs text-gray-500">Management Dashboard</div>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-white/50 transition-colors"
              ref={closeBtnRef}
            >
              {icons.close}
            </button>
          </div>

          {/* Enhanced menu */}
          <nav className="overflow-y-auto py-4 px-3 flex-1">
            <div className="space-y-2">
              {/* Admin Management Section - Only the 3 requested items */}
              <div className="space-y-1 mb-4">
                {item('/Admin/insights', 'Insights Dashboard', icons.insights)}
                {item('/Admin/insights/price-trends', 'Price Trends Banners', icons.trends)}
                
              </div>
            </div>
          </nav>

          {/* Mobile footer */}
          <div className="border-t border-gray-100 p-3 bg-gray-50/50">
            <div className="text-xs text-gray-500 text-center">
              Tap outside to close admin menu
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Enhanced fixed sidebar */}
      <aside
        style={{
          top: 'var(--nav-h, 64px)',
          width: collapsed ? 64 : 280,
          left: 0,
          height: 'calc(100vh - var(--nav-h, 64px))'
        }}
        className="hidden md:block fixed z-[9990] bg-white/95 backdrop-blur-xl border-r border-gray-200 shadow-lg transition-all duration-300"
      >
        <div className="h-full flex flex-col">
          {/* Enhanced header */}
          <div className="px-4 py-4 border-b border-gray-100 flex items-center gap-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
            <div className="w-8 h-8 text-blue-600 bg-white rounded-lg p-1.5 shadow-sm flex-shrink-0">
              {icons.insights}
            </div>
            {!collapsed && (
              <div>
                <div className="text-lg font-bold text-gray-900 truncate">Admin Panel</div>
                <div className="text-xs text-gray-500">Management Dashboard</div>
              </div>
            )}
          </div>

          {/* Enhanced menu */}
          <nav className="p-3 overflow-y-auto flex-1">
            <div className="space-y-1">
              {/* Admin items - Only the 3 requested items */}
              {item('/Admin/insights', 'Insights Dashboard', icons.insights, !collapsed)}
              {item('/Admin/insights/price-trends', 'Price Trends Banners', icons.trends, !collapsed)}
            
            </div>
          </nav>

          {/* Enhanced footer */}
          <div className="border-t border-gray-100 p-3">
            <button
              className="w-full inline-flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 text-sm px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200"
              onClick={() => setCollapsed((c) => !c)}
            >
              <span className={`transform transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}>
                {icons.collapse}
              </span>
              {!collapsed && <span className="font-medium">Collapse</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
