import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Enhanced Insights sidebar with better icons and responsiveness
export default function InsightsSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const drawerRef = React.useRef(null);
  const closeBtnRef = React.useRef(null);

  // Initialize collapsed from React state only (no localStorage)
  const [expandedSections, setExpandedSections] = useState({
    insights: true,
    resources: true,
    tools: true
  });

  // Close mobile menu on route change or ESC
  React.useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    if (mobileOpen) {
      window.addEventListener('keydown', onKey);
    }
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  // Prevent background scroll when mobile drawer is open
  React.useEffect(() => {
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

  // Focus trap inside mobile drawer
  React.useEffect(() => {
    if (!mobileOpen) return;

    const t = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    const getFocusable = () => {
      const root = drawerRef.current;
      if (!root) return [];
      return Array.from(
        root.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
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

  // Responsive sidebar width
  const W = collapsed ? 64 : 280;

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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
    blog: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
      </svg>
    ),
    news: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
        <path d="M18 14h-8"/>
        <path d="M15 18h-5"/>
        <path d="M10 6h8v4h-8V6z"/>
      </svg>
    ),
    guides: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    calculator: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <line x1="8" y1="6" x2="16" y2="6"/>
        <line x1="8" y1="10" x2="16" y2="10"/>
        <line x1="8" y1="14" x2="12" y2="14"/>
        <line x1="8" y1="18" x2="12" y2="18"/>
        <circle cx="16" cy="16" r="2"/>
      </svg>
    ),
    loan: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
        <path d="M16 8a6 6 0 0 0-8 0"/>
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
    chevronDown: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <polyline points="6,9 12,15 18,9"/>
      </svg>
    ),
    market: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M21 21V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/>
        <path d="M3 21h18"/>
        <path d="M7 21V7"/>
        <path d="M11 21V7"/>
        <path d="M15 21V7"/>
        <path d="M19 21V7"/>
        <path d="M3 15h18"/>
        <path d="M3 11h18"/>
      </svg>
    ),
    investment: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
        <path d="M12 8v8"/>
        <path d="M8 12h8"/>
      </svg>
    ),
    area: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  };

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

  const sectionHeader = (title, isExpanded, onClick, showInCollapsed = false) => {
    if (collapsed && !showInCollapsed) return null;
    
    return (
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
      >
        <span className="uppercase tracking-wider">
          {collapsed ? title.charAt(0) : title}
        </span>
        {!collapsed && (
          <span className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
            {icons.chevronDown}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Mobile: Enhanced hamburger trigger */}
      <button
        type="button"
        aria-label="Open insights menu"
        aria-controls="insights-mobile-drawer"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed left-4 top-[calc(var(--nav-h,64px)+12px)] z-[9992] inline-flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200 bg-white/90 backdrop-blur-sm shadow-lg text-gray-700 hover:bg-white hover:shadow-xl transition-all duration-200"
      >
        {icons.menu}
        {/* Notification dot for mobile */}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
      </button>

      {/* Mobile: Enhanced overlay */}
      <div
        className={`${mobileOpen ? 'fixed' : 'hidden'} md:hidden inset-0 bg-black/50 backdrop-blur-sm z-[9991] transition-opacity duration-300`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile: Enhanced drawer */}
      <div
        id="insights-mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Insights navigation"
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
              <div className="text-lg font-bold text-gray-900">Insights</div>
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
              {/* Insights Section */}
              {sectionHeader('Insights', expandedSections.insights, () => toggleSection('insights'))}
              {expandedSections.insights && (
                <div className="space-y-1 mb-4">
                  {item('/', 'Property Insights', icons.property)}
                  {item('/analytics/price-trends', 'Price Trends', icons.trends)}
                  {item('/admin/insights/market-reports', 'Market Reports', icons.market, true, null, true)}
                  {item('/admin/insights/investment', 'Investment Insights', icons.investment)}
                  {item('/admin/insights/area-analytics', 'Area Analytics', icons.area)}
                </div>
              )}

              {/* Resources Section */}
              {sectionHeader('Resources', expandedSections.resources, () => toggleSection('resources'))}
              {expandedSections.resources && (
                <div className="space-y-1 mb-4">
                  {item('/blog-insights', 'Blog', icons.blog, true, null, true)}
                  {item('/insights/news', 'News', icons.news, true, '5+')}
                  {item('/insights/guides', 'Guides', icons.guides)}
                </div>
              )}

              {/* Tools Section */}
              {sectionHeader('Tools', expandedSections.tools, () => toggleSection('tools'))}
              {expandedSections.tools && (
                <div className="space-y-1">
                  {item('/emi-calculator', 'EMI Calculator', icons.calculator)}
                  {item('/loan-eligibility', 'Loan Eligibility', icons.loan)}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile footer */}
          <div className="border-t border-gray-100 p-3 bg-gray-50/50">
            <div className="text-xs text-gray-500 text-center">
              Tap outside to close
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Enhanced fixed sidebar */}
      <aside
        style={{ 
          top: 'var(--nav-h, 64px)', 
          width: W, 
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
            {!collapsed && <div className="text-lg font-bold text-gray-900 truncate">Insights</div>}
          </div>

          {/* Enhanced menu */}
          <nav className="p-3 overflow-y-auto flex-1">
            <div className="space-y-1">
              {/* Quick access items */}
              {item('/property-market-trends/', 'Property Insights', icons.property, !collapsed)}
              {item('/analytics/price-trends', 'Price Trends', icons.trends, !collapsed)}

              <div className="h-px bg-gray-200 my-3"></div>
              {item('/admin/insights/market-reports', 'Market Reports', icons.trends, !collapsed)}
             
              {/* {item('/admin/insights/investment', 'Investment Insights', icons.investment, !collapsed)} */}
              {/* {item('/admin/insights/area-analytics', 'Area Analytics', icons.area, !collapsed)} */}
              
               <div className="h-px bg-gray-200 my-3"></div>
              
              {/* {item('/blog-insights', 'Blog', icons.blog, !collapsed, null, true)}
              {item('/insights/news', 'News', icons.news, !collapsed, collapsed ? '5' : '5+')}
              {item('/insights/guides', 'Guides', icons.guides, !collapsed)} */}
              
              {/* <div className="h-px bg-gray-200 my-3"></div> */}
              
              {/* {item('/emi-calculator', 'EMI Calculator', icons.calculator, !collapsed)}
              {item('/loan-eligibility', 'Loan Eligibility', icons.loan, !collapsed)} */}
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