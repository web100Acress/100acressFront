import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CITY_OPTIONS,
  CityIcons,
  BUDGET_OPTIONS,
  PROJECT_STATUS_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  QUICK_LINKS
} from "./shared/navigationData";
import { useScreenSize } from "./shared/screenSizeDetector";
import LimitedTimeOfferOverlay from "../../Components/CampaignOverlay/LimitedTimeOfferOverlay";
// import { useCampaignManager } from "../../Components/CampaignOverlay/useCampaignManager";

export default function NavbarDesktop({
  colorChange,
  isSearchOpen,
  isHome,
  CITY_OPTIONS,
  CityIcons,
  handleCitySelect,
  handlePriceClick,
  hideResale = false,
  hideRental = false,
  hideProjectType = false,
  hideProjectStatus = false,
  hideBudget = false,
  hideCity = false,
  showHamburgerOnDesktop = false,
  forceHamburger = false,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  // Screen size detection
  const { screenSize, config, cities, isMobile, isTablet, isDesktop, isClient } = useScreenSize();

  // Campaign manager for limited-time offer overlay
  // const {
  //   isOverlayVisible,
  //   overlayPosition,
  //   handleMouseEnter,
  //   handleMouseLeave,
  //   handleOverlayMouseEnter,
  //   handleOverlayMouseLeave,
  //   closeOverlay,
  //   cleanup
  // } = useCampaignManager();

  // Debug logging
  console.log('🔍 NavbarDesktop Debug:', {
    screenSize,
    windowWidth: window.innerWidth,
    config,
    citiesCount: cities.length,
    showCityDropdown: config.showCityDropdown,
    showBudgetDropdown: config.showBudgetDropdown,
    showDubaiButton: config.showDubaiButton,
    isClient
  });

  // Navigation handler with loading animation
  const handleNavigation = (path, priceClickHandler = null) => {
    // Close any open menus
    setIsBudgetOpen(false);
    setIsTypeOpen(false);
    setIsStatusOpen(false);
    setIsCityOpen(false);

    // Call price handler if provided
    if (priceClickHandler) {
      priceClickHandler();
    }

    // Show loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'navigation-loading-overlay';
    loadingOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    `;

    // Create enhanced loading spinner
    const spinner = document.createElement('div');
    spinner.style.cssText = `
      width: 60px;
      height: 60px;
      border: 4px solid rgba(229, 62, 62, 0.2);
      border-top: 4px solid #e53e3e;
      border-right: 4px solid #e53e3e;
      border-radius: 50%;
      animation: smoothSpin 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
      box-shadow: 0 0 20px rgba(229, 62, 62, 0.3);
    `;

    // Add keyframes for smooth spin animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes smoothSpin {
        0% {
          transform: rotate(0deg);
          border-top-color: #e53e3e;
          border-right-color: #e53e3e;
        }
        25% {
          border-top-color: #ff6b6b;
          border-right-color: #ff6b6b;
        }
        50% {
          transform: rotate(180deg);
          border-top-color: #e53e3e;
          border-right-color: #e53e3e;
        }
        75% {
          border-top-color: #ff6b6b;
          border-right-color: #ff6b6b;
        }
        100% {
          transform: rotate(360deg);
          border-top-color: #e53e3e;
          border-right-color: #e53e3e;
        }
      }
    `;
    document.head.appendChild(style);

    loadingOverlay.appendChild(spinner);
    document.body.appendChild(loadingOverlay);

    // Fade in loading overlay
    setTimeout(() => {
      loadingOverlay.style.opacity = '1';
    }, 10);

    // Navigate to the path
    navigate(path);

    // Scroll to top and force page refresh
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.location.reload();
    }, 100);
  };

  // Menu states
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isCompactMenuOpen, setIsCompactMenuOpen] = useState(false);

  // Track screen width for responsive behavior
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Timers for hover delays
  const cityTimer = useRef(null);
  const budgetTimer = useRef(null);
  const statusTimer = useRef(null);
  const typeTimer = useRef(null);
  const compactTimer = useRef(null);

  const clearTimer = (ref) => { if (ref.current) { clearTimeout(ref.current); ref.current = null; } };
  const closeWithDelay = (ref, closer, delay = null) => {
    clearTimer(ref);
    // Smooth close with delay, instant open
    const actualDelay = delay !== null ? delay : (isSmallScreen ? 150 : 250);
    ref.current = setTimeout(() => { closer(false); ref.current = null; }, actualDelay);
  };

  const menuMotion = {
    initial: { opacity: 0, y: 8, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.12, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1600);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cleanup campaign manager on unmount
  // useEffect(() => {
  //   return cleanup;
  // }, [cleanup]);

  // Don't render until client-side hydration is complete - AFTER all hooks
  if (!isClient) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        opacity: 0.3 // Show placeholder but faded
      }}>
        <div style={{ width: '60px', height: '40px', background: '#f0f0f0', borderRadius: '4px' }} />
        <div style={{ width: '80px', height: '40px', background: '#f0f0f0', borderRadius: '4px' }} />
        <div style={{ width: '100px', height: '40px', background: '#f0f0f0', borderRadius: '4px' }} />
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
      }}
    >
      {/* Compact Hamburger Menu - Show before City when items are hidden */}
      {(() => {
        const shouldShow = !config.showResale || !config.showRental || !config.showProjectType || !config.showProjectStatus || !config.showBudgetDropdown;
        console.log('🔍 Compact Hamburger Debug:', {
          screenSize,
          showResale: config.showResale,
          showRental: config.showRental,
          showProjectType: config.showProjectType,
          showProjectStatus: config.showProjectStatus,
          showBudgetDropdown: config.showBudgetDropdown,
          shouldShowCompact: shouldShow
        });
        return shouldShow;
      })() && (
          <div
            className="dropdown"
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={() => { clearTimer(compactTimer); setIsCompactMenuOpen(true); }}
            onMouseLeave={() => closeWithDelay(compactTimer, setIsCompactMenuOpen)}
          >
            <button
              style={{
                background: 'none',
                border: 'none',
                padding: '0.5rem',
                fontSize: '15px',
                fontWeight: '600',
                color: isHome ? "white" : (colorChange ? "white" : "#e53e3e"),
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 9L2 5h8z" />
              </svg>
            </button>

            {isCompactMenuOpen && (
              <motion.div
                {...menuMotion}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  padding: '0.75rem',
                  minWidth: '450px',
                  zIndex: 1000,
                  borderRadius: '0.5rem',
                  backdropFilter: 'blur(8px)'
                }}
                onMouseEnter={() => { clearTimer(compactTimer); setIsCompactMenuOpen(true); }}
                onMouseLeave={() => closeWithDelay(compactTimer, setIsCompactMenuOpen)}
              >
                {/* Horizontal Layout */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {/* Top Row - Rental & Resale */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    {/* Rental */}
                    {!config.showRental && (
                      <div
                        onClick={() => { handleNavigation(QUICK_LINKS.rental.path); setIsCompactMenuOpen(false); }}
                        style={{
                          backgroundColor: 'transparent',
                          padding: '0.625rem 0.875rem',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          border: '1px solid #e5e7eb',
                          transition: 'all 0.2s ease',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f8fafc';
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.transform = 'translateY(0px)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        Rental
                      </div>
                    )}

                    {/* Resale */}
                    {!config.showResale && (
                      <div
                        onClick={() => { handleNavigation(QUICK_LINKS.resale.path); setIsCompactMenuOpen(false); }}
                        style={{
                          backgroundColor: 'transparent',
                          padding: '0.625rem 0.875rem',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          border: '1px solid #e5e7eb',
                          transition: 'all 0.2s ease',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f8fafc';
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.transform = 'translateY(0px)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        Resale
                      </div>
                    )}
                  </div>

                  {/* Bottom Row - Property Type, Project Status & Budget */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    {/* Project Type */}
                    {!config.showProjectType && (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        padding: '0.625rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb',
                        backgroundColor: '#fafbfc',
                        flex: 1
                      }}>
                        <div style={{
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6b7280',
                          marginBottom: '0.25rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          Property Type
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.375rem' }}>
                          {PROJECT_TYPE_OPTIONS.map((option) => (
                            <div
                              key={option.path}
                              onClick={() => { handleNavigation(option.path); setIsCompactMenuOpen(false); }}
                              style={{
                                backgroundColor: 'white',
                                padding: '0.5rem 0.625rem',
                                borderRadius: '0.375rem',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: '500',
                                whiteSpace: 'nowrap',
                                border: '1px solid #e5e7eb',
                                transition: 'all 0.15s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#f1f5f9';
                                e.target.style.borderColor = '#cbd5e1';
                                e.target.style.transform = 'scale(1.05)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.borderColor = '#e5e7eb';
                                e.target.style.transform = 'scale(1)';
                              }}
                            >
                              {option.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Project Status */}
                    {!config.showProjectStatus && (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        padding: '0.625rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb',
                        backgroundColor: '#fafbfc',
                        flex: 1
                      }}>
                        <div style={{
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6b7280',
                          marginBottom: '0.25rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          Project Status
                        </div>
                        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                          {PROJECT_STATUS_OPTIONS.map((option) => (
                            <div
                              key={option.path}
                              onClick={() => { handleNavigation(option.path); setIsCompactMenuOpen(false); }}
                              style={{
                                backgroundColor: 'white',
                                padding: '0.5rem 0.625rem',
                                borderRadius: '0.375rem',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: '500',
                                whiteSpace: 'nowrap',
                                border: '1px solid #e5e7eb',
                                transition: 'all 0.15s ease',
                                flex: '0 0 calc(50% - 0.1875rem)' // 2 items per row with gap
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#f1f5f9';
                                e.target.style.borderColor = '#cbd5e1';
                                e.target.style.transform = 'scale(1.05)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.borderColor = '#e5e7eb';
                                e.target.style.transform = 'scale(1)';
                              }}
                            >
                              {option.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Budget */}
                    {!config.showBudgetDropdown && (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        padding: '0.625rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb',
                        backgroundColor: '#fafbfc',
                        flex: 1
                      }}>
                        <div style={{
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6b7280',
                          marginBottom: '0.25rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          Budget
                        </div>
                        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                          {BUDGET_OPTIONS.map((option) => (
                            <div
                              key={option.path}
                              onClick={() => { handleNavigation(option.path); setIsCompactMenuOpen(false); }}
                              style={{
                                backgroundColor: 'white',
                                padding: '0.5rem 0.625rem',
                                borderRadius: '0.375rem',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: '500',
                                whiteSpace: 'nowrap',
                                border: '1px solid #e5e7eb',
                                transition: 'all 0.15s ease',
                                flex: '0 0 calc(50% - 0.1875rem)' // 2 items per row with gap
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#f1f5f9';
                                e.target.style.borderColor = '#cbd5e1';
                                e.target.style.transform = 'scale(1.05)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.borderColor = '#e5e7eb';
                                e.target.style.transform = 'scale(1)';
                              }}
                            >
                              {option.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

      {/* City Dropdown */}
      {!hideCity && (
        <div
          className="dropdown"
          style={{ position: 'relative', display: 'inline-block' }}
          onMouseEnter={() => { clearTimer(cityTimer); setIsCityOpen(true); }}
          onMouseLeave={() => closeWithDelay(cityTimer, setIsCityOpen)}
        >
          <button
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              fontSize: '15px',
              fontWeight: '600',
              color: isHome ? "white" : (colorChange ? "white" : "#e53e3e"),
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            City
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 9L2 5h8z" />
            </svg>
          </button>

          {isCityOpen && (
            <motion.div
              {...menuMotion}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '0.5rem',
                minWidth: '200px',
                zIndex: 1000,
                borderRadius: '0.375rem'
              }}
              onMouseEnter={() => { clearTimer(cityTimer); setIsCityOpen(true); }}
              onMouseLeave={() => closeWithDelay(cityTimer, setIsCityOpen)}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {(cities.length > 0 ? cities : CITY_OPTIONS).map((c) => (
                  <div
                    key={c.name}
                    onClick={() => {
                      handleCitySelect(c);
                      setIsCityOpen(false);
                    }}
                    style={{
                      backgroundColor: 'transparent',
                      padding: '0.5rem',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f7fafc'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    {CityIcons[c.name]}
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{c.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Budget Dropdown - Show based on screen size config */}
      {!hideBudget && config.showBudgetDropdown && (
        <div
          className="dropdown"
          style={{ position: 'relative', display: 'inline-block' }}
          onMouseEnter={() => { clearTimer(budgetTimer); setIsBudgetOpen(true); }}
          onMouseLeave={() => closeWithDelay(budgetTimer, setIsBudgetOpen)}
        >
          <button
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              fontSize: '15px',
              fontWeight: '600',
              color: isHome ? "white" : (colorChange ? "white" : "#e53e3e"),
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            Budget
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 9L2 5h8z" />
            </svg>
          </button>

          {isBudgetOpen && (
            <motion.div
              {...menuMotion}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '0.5rem',
                minWidth: '180px',
                zIndex: 1000,
                borderRadius: '0.375rem'
              }}
              onMouseEnter={() => { clearTimer(budgetTimer); setIsBudgetOpen(true); }}
              onMouseLeave={() => closeWithDelay(budgetTimer, setIsBudgetOpen)}
            >
              {BUDGET_OPTIONS.map((option) => (
                <div
                  key={option.path}
                  onClick={() => { handleNavigation(option.path, () => handlePriceClick(option.min, option.max)); setIsBudgetOpen(false); }}
                  style={{
                    backgroundColor: 'transparent',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f7fafc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{option.label}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      )}

      {/* Project Status Dropdown - Show based on screen size config */}
      {!hideProjectStatus && config.showProjectStatus && (
        <div
          className="dropdown"
          style={{ position: 'relative', display: 'inline-block' }}
          onMouseEnter={() => { clearTimer(statusTimer); setIsStatusOpen(true); }}
          onMouseLeave={() => closeWithDelay(statusTimer, setIsStatusOpen)}
        >
          <button
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              fontSize: '15px',
              fontWeight: '600',
              color: isHome ? "white" : (colorChange ? "white" : "#e53e3e"),
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            Projects Status
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 9L2 5h8z" />
            </svg>
          </button>

          {isStatusOpen && (
            <motion.div
              {...menuMotion}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '0.5rem',
                minWidth: '180px',
                zIndex: 1000,
                borderRadius: '0.375rem'
              }}
              onMouseEnter={() => { clearTimer(statusTimer); setIsStatusOpen(true); }}
              onMouseLeave={() => closeWithDelay(statusTimer, setIsStatusOpen)}
            >
              {PROJECT_STATUS_OPTIONS.map((option) => (
                <div
                  key={option.path}
                  onClick={() => { handleNavigation(option.path); setIsStatusOpen(false); }}
                  style={{
                    backgroundColor: 'transparent',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f7fafc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{option.label}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      )}

      {/* Property Type Dropdown - Show based on screen size config */}
      {!hideProjectType && config.showProjectType && (
        <div
          className="dropdown"
          style={{ position: 'relative', display: 'inline-block' }}
          onMouseEnter={() => { clearTimer(typeTimer); setIsTypeOpen(true); }}
          onMouseLeave={() => closeWithDelay(typeTimer, setIsTypeOpen)}
        >
          <button
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              fontSize: '15px',
              fontWeight: '600',
              color: isHome ? "white" : (colorChange ? "white" : "#e53e3e"),
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            Property Type
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 9L2 5h8z" />
            </svg>
          </button>

          {isTypeOpen && (
            <motion.div
              {...menuMotion}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '0.625rem',
                minWidth: '400px',
                zIndex: 1000,
                borderRadius: '0.5rem'
              }}
              onMouseEnter={() => { clearTimer(typeTimer); setIsTypeOpen(true); }}
              onMouseLeave={() => closeWithDelay(typeTimer, setIsTypeOpen)}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.375rem' }}>
                {PROJECT_TYPE_OPTIONS.map((option) => (
                  <div
                    key={option.path}
                    onClick={() => { handleNavigation(option.path); setIsTypeOpen(false); }}
                    style={{
                      backgroundColor: 'transparent',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f7fafc';
                      e.currentTarget.style.transform = 'translateX(2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0px)';
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{option.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Rental Button - Show based on screen size config */}
      {!hideRental && config.showRental && (
        <button
          onClick={() => handleNavigation(QUICK_LINKS.rental.path)}
          style={{
            background: 'none',
            border: 'none',
            padding: '0.625rem 0.25rem 0.375rem 0.25rem',
            fontSize: '15px',
            fontWeight: '600',
            color: isHome ? "white" : (colorChange ? "white" : "#e53e3e"),
            cursor: 'pointer',
            display: 'inline-flex'
          }}
          onMouseEnter={(e) => e.target.style.color = isHome ? "white" : (colorChange ? "white" : "#e53e3e")}
          onMouseLeave={(e) => e.target.style.color = isHome ? "white" : (colorChange ? "white" : "#e53e3e")}
        >
          Rental
        </button>
      )}

      {/* Resale Button - Show based on screen size config */}
      {!hideResale && config.showResale && (
        <button
          onClick={() => handleNavigation(QUICK_LINKS.resale.path)}
          style={{
            background: 'none',
            border: 'none',
            padding: '0.625rem 0.25rem 0.375rem 0.25rem',
            fontSize: '15px',
            fontWeight: '600',
            color: isHome ? "white" : (colorChange ? "white" : "#e53e3e"),
            cursor: 'pointer',
            display: 'inline-flex'
          }}
          onMouseEnter={(e) => e.target.style.color = isHome ? "white" : (colorChange ? "white" : "#e53e3e")}
          onMouseLeave={(e) => e.target.style.color = isHome ? "white" : (colorChange ? "white" : "#e53e3e")}
        >
          Resale
        </button>
      )}

      {/* Insights Button */}
      <button
        className="insights-button"
        onClick={() => handleNavigation(QUICK_LINKS.insights.path)}
        onMouseEnter={() => {}}
        style={{
          background: 'linear-gradient(to right, #3B82F6, #2563EB)',
          color: 'white',
          padding: '0 1rem',
          height: '18px',
          lineHeight: '18px',
          fontSize: '11px',
          fontWeight: '800',
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow: '0 8px 22px rgba(59, 130, 246, 0.3)',
          display: (typeof window !== 'undefined' && window.innerWidth >= 768 && !forceHamburger) ? 'inline-flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '0.375rem',
          marginTop: '0',
          marginBottom: '0',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxSizing: 'border-box'
        }}
      >
        INSIGHTS
      </button>

      {/* Dubai Button - Show based on screen size config */}
      {config.showDubaiButton && (
        <div
          style={{
            position: 'relative',
            display: (window.innerWidth >= 768 && !forceHamburger) ? 'inline-block' : 'none',
            marginLeft: '0.375rem',
            marginTop: '0',
            marginBottom: '0',
            zIndex: 2
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-6px',
              padding: '0.125rem 0.625rem',
              backgroundColor: '#E53935',
              color:
               "white",
              fontSize: '8px',
              fontWeight: '600',
              letterSpacing: '0.7px',
              borderRadius: '999px',
              textTransform: 'uppercase',
              boxShadow: '0 6px 16px rgba(229,57,53,0.5)',
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            initial={{ opacity: 0, y: -4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: [0.9, 1.06, 1] }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            NEW
          </motion.div>
          <button
            onClick={() => handleNavigation("/united-arab-emirates/")}
            style={{
              background: "linear-gradient(to right, rgb(212, 162, 53), rgb(184, 134, 11))",
              color: "white",
              padding: '0 1rem',
              height: '18px',
              lineHeight: '18px',
              fontSize: '11px',
              fontWeight: '800',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.9)',
              boxShadow: '0 8px 22px rgba(0,0,0,0.2)',
              display: (window.innerWidth >= 768 && !forceHamburger) ? 'inline-flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              boxSizing: 'border-box'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "linear-gradient(to-r, #FFD700, #FFA500)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "linear-gradient(to-r, #FFC107, #FFD700)";
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '999px',
                // background: 'linear(to right, rgba(229,57,53,0) 0%, rgba(229,57,53,0.6) 50%, rgba(229,57,53,0) 100%)',
                transform: 'translateX(50%)'
              }}
              initial={{ x: "110%" }}
              animate={{ x: "-110%" }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
            />
            <span style={{ position: 'relative', zIndex: 4 }}>DUBAI</span>
          </button>
        </div>
      )}

      {/* Campaign Overlay */}
      {/* <LimitedTimeOfferOverlay
        isVisible={isOverlayVisible}
        onClose={closeOverlay}
        position={overlayPosition}
        onMouseEnter={handleOverlayMouseEnter}
        onMouseLeave={handleOverlayMouseLeave}
      /> */}
    </div>
  );
}
