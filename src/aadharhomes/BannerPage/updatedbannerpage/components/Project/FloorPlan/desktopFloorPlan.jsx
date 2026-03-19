import React, { useState, useRef, useEffect } from 'react';
import './desktopFloorPlan.css';

const DesktopFloorPlan = ({ floorPlans = [], bhkDetails = [], onShowCallback = () => {}, projectName = '' }) => {
  const [isImageUnlocked, setIsImageUnlocked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCurrentIndex((prev) => (prev === 0 ? floorPlans.length - 1 : prev - 1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCurrentIndex((prev) => (prev === floorPlans.length - 1 ? 0 : prev + 1));
    }
  };

  const scrollToSelectedCard = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const selectedCard = container.children[currentIndex + 1];
      if (selectedCard) {
        const containerHeight = container.clientHeight;
        const cardHeight = selectedCard.offsetHeight;
        const cardTop = selectedCard.offsetTop;
        const scrollTo = cardTop - (containerHeight / 2) + (cardHeight / 2);
        container.scrollTo({ top: scrollTo, behavior: 'smooth' });
      }
    }
  };

  React.useEffect(() => {
    scrollToSelectedCard();
  }, [currentIndex]);

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
    setTimeout(() => setIsTransitioning(false), 400);
    setCurrentIndex((prev) => (prev === 0 ? floorPlans.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 400);
    setCurrentIndex((prev) => (prev === floorPlans.length - 1 ? 0 : prev + 1));
  };

  if (!floorPlans || floorPlans.length === 0 || !floorPlans.some(plan => plan && plan.url)) {
    return null;
  }

  return (
    <section className="desktop-floorplan-section" style={{ paddingTop: '120px', zIndex: 1, position: 'relative' }}>
      {/* Background decorative lines */}
      <div className="desktop-floorplan-bg-decoration">
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

      <div className="desktop-floorplan-container">
        <div className="desktop-floorplan-header">
          <h3 className="desktop-floorplan-title">
            Floor Plan{projectName ? ` of ${projectName}` : ''}
          </h3>
          <div className="desktop-floorplan-accent-line"></div>
          <p className="desktop-floorplan-subtitle">
            Choose your ideal home configuration & explore detailed layouts
          </p>
        </div>

        <div className="desktop-floorplan-content-wrapper">
          <div className="desktop-floorplan-grid">
            {/* Left Side: Immersive Floor Plan Preview (70% width) */}
            <div className="desktop-floorplan-preview">
              <div className="desktop-floorplan-preview-container">
                {/* Floor Plan Image */}
                <div className="desktop-floorplan-image-container">
                  <img 
                    src={floorPlans[currentIndex]?.url} 
                    alt={`Floor plan ${currentIndex + 1} for ${bhkDetails[currentIndex]?.bhk_type || 'Project'}`}
                    loading="lazy"
                    decoding="async"
                    className={`desktop-floorplan-image ${
                      isImageUnlocked ? '' : 'blurred'
                    }`}
                    crossOrigin="anonymous"
                    performance="high"
                  />
                  
                  {/* Premium Glassmorphism Overlay with Vignette */}
                  {!isImageUnlocked && (
                    <div className="desktop-floorplan-overlay">
                      <div className="desktop-floorplan-overlay-vignette-1"></div>
                      <div className="desktop-floorplan-overlay-vignette-2"></div>
                      <div className="desktop-floorplan-overlay-vignette-3"></div>
                      
                      <div className="desktop-floorplan-overlay-content">
                        <div>
                          <h4 className="desktop-floorplan-overlay-title">
                            Unlock Detailed Floor Plans
                          </h4>
                          <p className="desktop-floorplan-overlay-description">
                            Get exclusive access to detailed layouts, dimensions & specifications
                          </p>
                        </div>
                        
                        <button
                          onClick={handleGetDetails}
                          className="desktop-floorplan-unlock-button"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Get Instant Access
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Controls */}
                <div className="desktop-floorplan-navigation">
                  <button
                    onClick={goToPrevious}
                    className="desktop-floorplan-nav-button"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="desktop-floorplan-nav-counter">
                    {currentIndex + 1} / {floorPlans.length}
                  </span>
                  <button
                    onClick={goToNext}
                    className="desktop-floorplan-nav-button"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: BHK Configuration Cards (30% width) */}
            <div className="desktop-floorplan-configurations">
              <div>
                <h4 className="desktop-floorplan-configurations-title">Available Configurations</h4>
                
                <div 
                  ref={scrollContainerRef}
                  className="desktop-floorplan-cards-container"
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                >
                  {bhkDetails.map((bhk, index) => (
                    <div
                      key={index}
                      onClick={() => { setCurrentIndex(index); setIsTransitioning(true); setTimeout(() => setIsTransitioning(false), 400); }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={`desktop-floorplan-bhk-card ${
                        index === currentIndex ? 'selected' : ''
                      }`}
                    >
                      <div className="desktop-floorplan-bhk-card-content">
                        <div className="desktop-floorplan-bhk-type">
                          {bhk.bhk_type}
                        </div>
                        <div className="desktop-floorplan-bhk-area">
                          {bhk.bhk_Area && (
                            <span>
                              {bhk.bhk_Area}
                            </span>
                          )}
                        </div>
                        <div className={`desktop-floorplan-bhk-status ${
                          index === currentIndex ? 'selected' : ''
                        }`}>
                          {index === currentIndex ? 'SELECTED' : 'SELECT'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesktopFloorPlan;