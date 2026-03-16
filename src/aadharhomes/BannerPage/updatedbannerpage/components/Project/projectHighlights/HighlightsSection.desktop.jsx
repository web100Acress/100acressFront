import React from 'react';
import './HighlightsSection.desktop.css';

const HighlightsSectionDesktop = ({ projectName, highlights, highlightImage, onShowCallback = () => {} }) => {
  const hasHighlights = highlights && Array.isArray(highlights) && highlights.length > 0;

  return (
    <section className="highlights-section-desktop">
      {/* Section Title - Outside Card */}
      <div className="highlights-section-desktop-title-wrap">
        <h2 className="highlights-section-desktop-title">
          PROJECT HIGHLIGHTS
        </h2>
      </div>

      {/* Luxury Dark Card Container */}
      <div className="highlights-section-desktop-card">
        {/* Dark Golden Accent Line */}
        <div className="highlights-section-desktop-card-accent"></div>
        {/* yaha se niche wale class highlight pointbs ke bich gap and all maintain hota hai */}
        <div className="highlights-section-desktop-grid">
          
          {/* Left Column - Content */}
          <div className="highlights-section-desktop-left">
            {/* Section Header */}
            <div className="highlights-section-desktop-left-header">
             
              <h3 className="highlights-section-desktop-left-subtitle">
                {projectName ? `${projectName} Features` : "Key Features & Amenities"}
              </h3>
              <div className="highlights-section-desktop-left-underline"></div>
            </div>

            {hasHighlights ? (
              /* Dynamic Highlights Grid */
              <div className="highlights-section-desktop-points">
                {highlights.map((item, index) => (
                  <div key={index} className="highlights-section-desktop-point">
                    {/* Premium Check Icon */}
                    <div className="highlights-section-desktop-check">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="highlights-section-desktop-point-text">
                      {item.highlight_Point || item}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              /* Fallback Content */
              <div className="highlights-section-desktop-fallback">
                <p className="highlights-section-desktop-fallback-text">
                  Discover the exceptional features and amenities that make this project stand out. 
                  From premium finishes to world-class facilities, every detail has been carefully crafted.
                </p>
              </div>
            )}

          </div>

          {/* Right Column - Image */}
          <div className="highlights-section-desktop-right">
            <div className="highlights-section-desktop-image-wrap">
              {highlightImage ? (
                <>
                  <img 
                    src={highlightImage} 
                    alt={`${projectName} Highlights`}
                    className="highlights-section-desktop-image"
                    crossOrigin="anonymous"
                  />
                  {/* Subtle Overlay */}
                  <div className="highlights-section-desktop-image-overlay"></div>
                </>
              ) : (
                /* Fallback Placeholder */
                <div className="highlights-section-desktop-placeholder">
                  <div className="highlights-section-desktop-placeholder-inner">
                    <div className="highlights-section-desktop-placeholder-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="highlights-section-desktop-placeholder-text">Project Image</p>
                  </div>
                </div>
              )}
              
              {/* Dark Golden Frame Effect */}
              <div className="highlights-section-desktop-frame"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HighlightsSectionDesktop;
