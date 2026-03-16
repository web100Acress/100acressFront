import React, { useState, useRef } from 'react';
import './mobileFloorPlan.css';

const MobileFloorPlan = ({ floorPlans = [], bhkDetails = [], onShowCallback = () => {}, projectName = '' }) => {
  const [isImageUnlocked, setIsImageUnlocked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(null);

  const handleFormSuccess = () => {
    const unlockKey = `floorplan_unlocked_${bhkDetails[0]?.bhk_type || 'default'}`;
    localStorage.setItem(unlockKey, 'true');
    setIsImageUnlocked(true);
  };

  const handleGetDetails = () => {
    onShowCallback(handleFormSuccess);
  };

  const goToPrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 350);
    setCurrentIndex((prev) => (prev === 0 ? floorPlans.length - 1 : prev - 1));
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 350);
    setCurrentIndex((prev) => (prev === floorPlans.length - 1 ? 0 : prev + 1));
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? goToNext() : goToPrevious();
    }
    touchStartX.current = null;
  };

  if (!floorPlans || floorPlans.length === 0 || !floorPlans.some(plan => plan && plan.url)) {
    return null;
  }

  const currentBhk = bhkDetails[currentIndex];

  return (
    <section className="mobile-floorplan-section">
      {/* Background decorative lines */}
      <div className="mobile-floorplan-bg-decoration">
        <svg width="800" height="600" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M800 0C700 150 600 200 400 200S100 250 0 400V600h800V0z" fill="url(#grad)"/>
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#373737', stopOpacity: 0.5}} />
              <stop offset="100%" style={{stopColor: '#000000', stopOpacity: 0}} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="mobile-floorplan-container">
        <div className="mobile-floorplan-header">
          <h3 className="mobile-floorplan-title">
            Floor Plan{projectName ? ` of ${projectName}` : ''}
          </h3>
          <div className="mobile-floorplan-accent-line"></div>
          <p className="mobile-floorplan-subtitle">
            Choose your ideal home configuration & explore detailed layouts
          </p>
        </div>

        {/* Mobile Floor Plan Image */}
        <div className="mobile-floorplan-image-wrapper">
          <div
            className="mobile-floorplan-container-main"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Corner decorations */}
            <div className="mobile-floorplan-corner top-left"></div>
            <div className="mobile-floorplan-corner top-right"></div>
            <div className="mobile-floorplan-corner bottom-left"></div>
            <div className="mobile-floorplan-corner bottom-right"></div>

            {/* Loading skeleton */}
            {isTransitioning && (
              <div className="mobile-floorplan-loading">
                <div className="mobile-floorplan-loading-dots">
                  <div className="mobile-floorplan-loading-dot"></div>
                  <div className="mobile-floorplan-loading-dot"></div>
                  <div className="mobile-floorplan-loading-dot"></div>
                </div>
              </div>
            )}

            {/* Image — extra bottom padding to not sit under nav bar */}
            <div className="mobile-floorplan-image-container">
              <img
                src={floorPlans[currentIndex]?.url}
                alt={`Floor plan ${currentIndex + 1} for ${bhkDetails[currentIndex]?.bhk_type || 'Project'}`}
                className={`mobile-floorplan-image ${
                  isImageUnlocked ? '' : 'blurred'
                } ${isTransitioning ? 'transitioning' : ''}`}
                crossOrigin="anonymous"
              />

              {/* Overlay for locked images */}
              {!isImageUnlocked && (
                <div className="mobile-floorplan-overlay">
                  <div className="mobile-floorplan-overlay-content">
                    <div>
                      <h4 className="mobile-floorplan-overlay-title">
                        Unlock Detailed Floor Plans
                      </h4>
                      <p className="mobile-floorplan-overlay-description">
                        Get exclusive access to detailed layouts, dimensions & specifications
                      </p>
                    </div>

                    <button
                      onClick={handleGetDetails}
                      className="mobile-floorplan-unlock-button"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>Get Instant Access</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Progress dots */}
            <div className="mobile-floorplan-progress-dots">
              {floorPlans.map((_, i) => (
                <div
                  key={i}
                  className={`mobile-floorplan-progress-dot ${
                    i === currentIndex ? 'active' : ''
                  }`}
                  onClick={() => { setCurrentIndex(i); setIsTransitioning(true); setTimeout(() => setIsTransitioning(false), 350); }}
                />
              ))}
            </div>

            {/* Navigation Bar */}
            <div className="mobile-floorplan-navigation">
              {/* ← Prev */}
              <button
                onClick={goToPrevious}
                aria-label="Previous floor plan"
                className="mobile-floorplan-nav-button prev"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Center: count + BHK type */}
              <div className="mobile-floorplan-nav-center">
                <span className="mobile-floorplan-nav-counter">
                  {currentIndex + 1} / {floorPlans.length}
                </span>
                <span className="mobile-floorplan-nav-bhk-type">
                  {bhkDetails[currentIndex]?.bhk_type || 'Floor Plan'}
                </span>
              </div>

              {/* → Next */}
              <button
                onClick={goToNext}
                aria-label="Next floor plan"
                className="mobile-floorplan-nav-button next"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Detail Card */}
        {currentBhk && (
          <div className="mobile-floorplan-detail-card">
            <div className="mobile-floorplan-detail-header">
              <div className="mobile-floorplan-detail-title-wrapper">
                <div className="mobile-floorplan-detail-icon">
                  <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h4 className="mobile-floorplan-detail-title">Current Selection</h4>
              </div>
              <div className="mobile-floorplan-detail-badge">
                ACTIVE
              </div>
            </div>

            <div className="mobile-floorplan-detail-grid">
              <div className="mobile-floorplan-detail-item">
                <div className="mobile-floorplan-detail-item-icon">
                  {currentBhk.bhk_type?.charAt(0) || 'B'}
                </div>
                <p className="mobile-floorplan-detail-item-value">{currentBhk.bhk_type || 'N/A'}</p>
                <p className="mobile-floorplan-detail-item-label">Configuration</p>
              </div>
              <div className="mobile-floorplan-detail-item">
                <div className="mobile-floorplan-detail-item-icon">
                  <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
                <p className="mobile-floorplan-detail-item-value">{currentBhk.bhk_Area || 'N/A'}</p>
                <p className="mobile-floorplan-detail-item-label">Carpet Area</p>
              </div>
            </div>

            <div className="mobile-floorplan-detail-footer">
              <div className="mobile-floorplan-detail-footer-content">
                <span className="mobile-floorplan-detail-footer-text">Floor Plan {currentIndex + 1} of {floorPlans.length}</span>
                <span className="mobile-floorplan-detail-footer-hint">Swipe to explore more →</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MobileFloorPlan;