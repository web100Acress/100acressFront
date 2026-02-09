import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton, Button } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  CITY_OPTIONS, 
  BUDGET_OPTIONS, 
  PROJECT_STATUS_OPTIONS, 
  PROJECT_TYPE_OPTIONS, 
  QUICK_LINKS 
} from "./shared/navigationData";

// Custom rounded hamburger icon
const RoundedHamburgerIcon = ({ boxSize = 5, color = "currentColor" }) => (
  <Box as="svg" viewBox="0 0 24 24" boxSize={boxSize} color={color} display="block">
    <path d="M4 6h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M4 12h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M4 18h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </Box>
);

export default function NavbarMobile({
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation handler
  const handleNavigation = (path, priceClickHandler = null, shouldCloseDrawer = false) => {
    // Close drawer if needed
    if (shouldCloseDrawer) {
      closeDrawer();
    }
    
    // Call price handler if provided
    if (priceClickHandler) {
      priceClickHandler();
    }
    
    // Navigate to the path
    navigate(path);
    
    // Scroll to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    // Prevent page (body) from scrolling when drawer is open
    try {
      if (isDrawerOpen) {
        document.body.classList.add('mobile-menu-open');
      } else {
        document.body.classList.remove('mobile-menu-open');
      }
    } catch {}
    return () => {
      try { document.body.classList.remove('mobile-menu-open'); } catch {}
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    // Close drawer on route change
    if (isDrawerOpen) closeDrawer();
  }, [location.pathname]);

  return (
    <Box display={{ base: 'flex', md: 'none' }}>
      {/* Hamburger Button */}
      <IconButton
        size="sm"
        icon={<RoundedHamburgerIcon boxSize={7} />}
        aria-label="Menu"
        variant="ghost"
        color={isHome ? "white" : (!colorChange ? "red" : "white")}
        mr={0}
        onClick={() => (isDrawerOpen ? closeDrawer() : openDrawer())}
        display={{ base: 'inline-flex', md: (forceHamburger || showHamburgerOnDesktop) ? 'inline-flex' : 'none' }}
      />

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <>
          <div
            onClick={closeDrawer}
            className="mobile-menu-overlay"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Explore"
            onClick={(e) => e.stopPropagation()}
            className="mobile-menu-drawer"
          >
            <div className="mobile-menu-header">
              <div className="mobile-menu-brand">
                <img
                  src="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/red-logo.webp"
                  alt="100acress"
                  className="mobile-menu-logo"
                  loading="lazy"
                />
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close"
                className="mobile-menu-close"
              >
                ×
              </button>
            </div>

            <div className="mobile-menu-content">
              <div className="mobile-menu-section">
                {/* City */}
                {(forceHamburger || hideCity) && (
                  <>
                    <div className="mobile-menu-heading">City</div>
                    <div className="mobile-menu-grid">
                      {CITY_OPTIONS.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          className="mobile-menu-tile"
                          onClick={() => {
                            handleCitySelect(c);
                            closeDrawer();
                          }}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                    <div className="mobile-menu-sep" />
                  </>
                )}

                {/* Budget */}
                {(forceHamburger || hideBudget) && (
                  <>
                    <div className="mobile-menu-heading">Budget</div>
                    <div className="mobile-menu-grid">
                      {BUDGET_OPTIONS.map((option) => (
                        <button 
                          key={option.path}
                          type="button" 
                          className="mobile-menu-tile" 
                          onClick={() => handleNavigation(option.path, () => handlePriceClick(option.min, option.max), true)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <div className="mobile-menu-sep" />
                  </>
                )}

                {/* Project Status */}
                {(forceHamburger || hideProjectStatus) && (
                  <>
                    <div className="mobile-menu-heading">Project Status</div>
                    <div className="mobile-menu-grid">
                      {PROJECT_STATUS_OPTIONS.map((option) => (
                        <button 
                          key={option.path}
                          type="button" 
                          className="mobile-menu-tile" 
                          onClick={() => handleNavigation(option.path, null, true)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <div className="mobile-menu-sep" />
                  </>
                )}

                {/* Project Type */}
                {(forceHamburger || hideProjectType) && (
                  <>
                    <div className="mobile-menu-heading">Project Type</div>
                    <div className="mobile-menu-grid">
                      {PROJECT_TYPE_OPTIONS.map((option) => (
                        <button 
                          key={option.path}
                          type="button" 
                          className="mobile-menu-tile" 
                          onClick={() => handleNavigation(option.path, null, true)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <div className="mobile-menu-sep" />
                  </>
                )}

                {/* Rental */}
                {(forceHamburger || hideRental) && (
                  <>
                    <div className="mobile-menu-heading">Rental</div>
                    <button 
                      type="button" 
                      className="mobile-menu-tile" 
                      onClick={() => { 
                        handleNavigation(QUICK_LINKS.rental.path, null, true); 
                      }}
                    >
                      View Rental Properties
                    </button>
                    <div className="mobile-menu-sep" />
                  </>
                )}

                {/* Resale */}
                {(forceHamburger || hideResale) && (
                  <>
                    <div className="mobile-menu-heading">Resale</div>
                    <button 
                      type="button" 
                      className="mobile-menu-tile" 
                      onClick={() => { 
                        handleNavigation(QUICK_LINKS.resale.path, null, true); 
                      }}
                    >
                      View Resale Properties
                    </button>
                    <button 
                      type="button" 
                      className="mobile-menu-primary" 
                      onClick={() => { 
                        handleNavigation(QUICK_LINKS.dubai.path, null, true); 
                      }}
                    >
                      Dubai
                    </button>
                    <button 
                      type="button" 
                      className="mobile-menu-primary" 
                      onClick={() => { 
                        handleNavigation(QUICK_LINKS.insights.path, null, true); 
                      }} 
                      style={{ background: '#3B82F6', borderColor: 'rgba(59, 130, 246, 0.25)', boxShadow: '0 12px 26px rgba(59, 130, 246, 0.25)', marginTop: '10px' }}
                    >
                      Insights
                    </button>
                  </>
                )}
               
                <Box h={{ base: 16, md: 0 }} />
              </div>
            </div>
          </aside>
        </>
      )}
    </Box>
  );
}
