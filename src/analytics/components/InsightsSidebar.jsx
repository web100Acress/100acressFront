import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Fixed Insights sidebar for all analytics pages
export default function InsightsSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const drawerRef = React.useRef(null);
  const closeBtnRef = React.useRef(null);

  // Initialize collapsed from localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('insightsSidebarCollapsed');
      if (stored === '1' || stored === '0') {
        setCollapsed(stored === '1');
      }
    } catch {}
  }, []);

  // Persist collapsed to localStorage on change
  React.useEffect(() => {
    try {
      localStorage.setItem('insightsSidebarCollapsed', collapsed ? '1' : '0');
    } catch {}
  }, [collapsed]);

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

    // Focus the close button initially
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

  // Sidebar width and state
  const W = collapsed ? 56 : 260;
  const [expandedSections, setExpandedSections] = useState({
    insights: true,
    resources: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const item = (to, label, icon, showLabel = true, badge = null) => {
    const active = isActive(to);
    return (
      <Link
        to={to}
        className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
        onClick={() => setMobileOpen(false)}
        aria-label={!showLabel ? label : undefined}
        title={!showLabel ? label : undefined}
      >
        <span className={`w-6 h-6 flex-shrink-0 ${active ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-500'}`}>
          {icon}
        </span>
        {showLabel && (
          <div className="flex-1 min-w-0 flex items-center justify-between">
            <span className="font-medium text-sm truncate">{label}</span>
            {badge && (
              <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {badge}
              </span>
            )}
          </div>
        )}
      </Link>
    );
  };

  const sectionHeader = (title, isExpanded, onClick) => (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
    >
      <span className="uppercase text-xs font-semibold tracking-wider text-gray-500">
        {title}
      </span>
      <svg
        className={`w-4 h-4 text-gray-500 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );

  return (
    <>
      {/* Mobile: Hamburger trigger */}
      <button
        type="button"
        aria-label="Open insights menu"
        aria-controls="insights-mobile-drawer"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed left-3 top-[calc(var(--nav-h,64px)+8px)] z-[9992] inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-200 bg-white shadow-sm text-gray-700"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      {/* Mobile: Overlay */}
      <div
        className={`${mobileOpen ? 'fixed' : 'hidden'} md:hidden inset-0 bg-black/40 z-[9991]`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile: Drawer */}
      <div
        id="insights-mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Insights navigation"
        className={`md:hidden fixed z-[9993] top-[var(--nav-h,64px)] bottom-0 left-0 w-72 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        ref={drawerRef}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-3 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 text-blue-600">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2a5 5 0 0 0-5 5v1.3a3 3 0 0 1-.7 1.9L5 12h14l-1.3-1.8a3 3 0 0 1-.7-1.9V7a5 5 0 0 0-5-5Z"/><path d="M5 14h14l-1 7H6l-1-7Z"/></svg>
              </div>
              <div className="text-base font-semibold">Insights</div>
            </div>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-md text-gray-600 hover:bg-gray-50"
              ref={closeBtnRef}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M6 6l12 12M18 6L6 18"/></svg>
            </button>
          </div>

          {/* Menu */}
          <nav className="overflow-y-auto py-2">
            <div className="space-y-1 px-2">
              {sectionHeader('Insights', expandedSections.insights, () => toggleSection('insights'))}
              {expandedSections.insights && (
                <div className="space-y-0.5 pl-1 mb-2">
                  {item('/analytics/price-trends', 'Price Trends', (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path d="M3 3v18h18"/>
                      <path d="M7 15l4-4 3 3 5-6"/>
                    </svg>
                  ))}
                  {item('/analytics', 'My Property Insights', (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path d="M3 12l9-9 9 9"/>
                      <path d="M9 21V9h6v12"/>
                    </svg>
                  ))}
                </div>
              )}

              {sectionHeader('Resources', expandedSections.resources, () => toggleSection('resources'))}
              {expandedSections.resources && (
                <div className="space-y-0.5 pl-1">
                  {item('/blog-insights', 'Blog', (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path d="M4 4h16v16H4z"/>
                      <path d="M8 8h8M8 12h6M8 16h4"/>
                    </svg>
                  ), true, 'New')}
                  
                  {item('/insights/news', 'News', (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path d="M4 6h16M4 10h16M4 14h10"/>
                    </svg>
                  ), true, '5+')}
                  
                  {item('/insights/guides', 'Guides', (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                      <path d="M4 4v15.5A2.5 2.5 0 0 0 6.5 22H20V6a2 2 0 0 0-2-2H4z"/>
                    </svg>
                  ), true)}
                </div>
              )}

              <div className="pt-2">
                {sectionHeader('Tools', expandedSections.tools, () => toggleSection('tools'))}
                {expandedSections.tools && (
                  <div className="space-y-0.5 pl-1">
                    {item('/emi-calculator', 'EMI Calculator', (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                        <rect x="3" y="4" width="18" height="18" rx="2"/>
                        <path d="M3 10h18M7 4v6"/>
                      </svg>
                    ))}
                    {item('/emi-calculator', 'Home Loan Eligibility', (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                        <path d="M20 21v-8a2 2 0 0 0-2-2h-4"/>
                        <path d="M4 21v-8a2 2 0 0 1 2-2h4"/>
                        <path d="M12 3l8 8-8 8-8-8 8-8z"/>
                      </svg>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Desktop: Fixed sidebar */}
      <aside
        style={{ top: 'var(--nav-h, 64px)', width: W, left: 0 }}
        className="hidden md:block fixed z-[9990] bottom-0 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 border-r border-gray-200 shadow-[0_6px_24px_rgba(0,0,0,0.06)]"
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-3 py-3 border-b border-gray-100 flex items-center gap-3">
            <div className="w-7 h-7 text-blue-600">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2a5 5 0 0 0-5 5v1.3a3 3 0 0 1-.7 1.9L5 12h14l-1.3-1.8a3 3 0 0 1-.7-1.9V7a5 5 0 0 0-5-5Z"/><path d="M5 14h14l-1 7H6l-1-7Z"/></svg>
            </div>
            {!collapsed && <div className="text-base font-semibold">Insights</div>}
          </div>

          {/* Menu */}
          <nav className="p-3 overflow-y-auto">
            <div className="space-y-1">
              {item('/analytics', 'My property Insights', (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M3 12l9-9 9 9"/><path d="M9 21V9h6v12"/></svg>
              ), !collapsed)}
              {item('/analytics/price-trends', 'Price Trends', (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></svg>
              ), !collapsed)}
              {item('/blog-insights', 'Blog', (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h6M8 16h4"/></svg>
              ), !collapsed)}
              {item('/insights/news', 'News', (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M4 6h16M4 10h16M4 14h10"/></svg>
              ), !collapsed)}
              {item('/insights/guides', 'Guides', (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4v15.5A2.5 2.5 0 0 0 6.5 22H20V6a2 2 0 0 0-2-2H4z"/></svg>
              ), !collapsed)}
              {item('/emi-calculator', 'EMI Calculator', (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M7 4v6"/></svg>
              ), !collapsed)}
              {item('/emi-calculator', 'Home Loan Eligibility', (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M20 21v-8a2 2 0 0 0-2-2h-4"/><path d="M4 21v-8a2 2 0 0 1 2-2h4"/><path d="M12 3l8 8-8 8-8-8 8-8z"/></svg>
              ), !collapsed)}
            </div>
          </nav>

          {/* Footer actions */}
          <div className="mt-auto border-t border-gray-100 p-2 flex items-center justify-between">
            <button
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm px-2 py-1 rounded-md hover:bg-gray-50"
              onClick={() => setCollapsed((c) => !c)}
            >
              <span className="w-5 h-5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.5 5l-7 7 7 7"/></svg>
              </span>
              {!collapsed && <span>Collapse</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
