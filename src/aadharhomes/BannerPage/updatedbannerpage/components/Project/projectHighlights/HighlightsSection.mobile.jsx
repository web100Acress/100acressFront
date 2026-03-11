import React from 'react';
import './HighlightsSection.mobile.css';

const HighlightsSectionMobile = ({ projectName, highlights, highlightImage, onShowCallback = () => {} }) => {
  const hasHighlights = highlights && Array.isArray(highlights) && highlights.length > 0;

  return (
    <section className="highlights-section-mobile">
      {/* Mobile Section Title */}
      <div className="highlights-section-mobile-title-wrap">
        <h2 className="highlights-section-mobile-title">
          PROJECT HIGHLIGHTS
        </h2>
      </div>

      {/* Mobile-Optimized Card Container */}
      <div className="highlights-section-mobile-card">
        {/* Mobile accent line */}
        <div className="highlights-section-mobile-card-accent"></div>
        
        <div className="highlights-section-mobile-card-content">
          
          {/* Mobile Image First */}
          <div className="highlights-section-mobile-image-block">
            <div className="highlights-section-mobile-image-wrap">
              {highlightImage ? (
                <>
                  <img 
                    src={highlightImage} 
                    alt={`${projectName} Highlights`}
                    className="highlights-section-mobile-image"
                  />
                  {/* Mobile overlay */}
                  <div className="highlights-section-mobile-image-overlay"></div>
                </>
              ) : (
                /* Mobile fallback placeholder */
                <div className="highlights-section-mobile-placeholder">
                  <div className="text-center">
                    <div className="highlights-section-mobile-placeholder-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="highlights-section-mobile-placeholder-text">Project Image</p>
                  </div>
                </div>
              )}
              
              {/* Mobile frame effect */}
              <div className="highlights-section-mobile-frame"></div>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="highlights-section-mobile-content">
            {/* Mobile section header */}
            <div className="highlights-section-mobile-content-header">
              <h3 className="highlights-section-mobile-content-title">
                {projectName ? `${projectName} Features` : "Key Features & Amenities"}
              </h3>
              <div className="highlights-section-mobile-content-underline"></div>
            </div>

            {hasHighlights ? (
              /* Mobile highlights grid */
              <div className="highlights-section-mobile-points">
                {highlights.map((item, index) => (
                  <div key={index} className="highlights-section-mobile-point">
                    {/* Mobile check icon */}
                    <div className="highlights-section-mobile-check">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="highlights-section-mobile-point-text">
                      {item.highlight_Point || item}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              /* Mobile fallback content */
              <div className="highlights-section-mobile-fallback">
                <p className="highlights-section-mobile-fallback-text">
                  Discover the exceptional features and amenities that make this project stand out. 
                  From premium finishes to world-class facilities, every detail has been carefully crafted.
                </p>
              </div>
            )}

            {/* Mobile CTA Button */}
            <button 
              onClick={onShowCallback}
              className="highlights-section-mobile-cta"
            >
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Explore Features
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSectionMobile;
