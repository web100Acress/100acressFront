import React from 'react';
import '../../../styles/newbanner/HighlightsSection.css';

const HighlightsSection = ({ projectViewDetails, highlight = [], handleShowInstantcallBack }) => {
  return (
    <div className="nb-highlights-section">
      <div className="nb-highlights-inner">
        <div className="nb-section-header">
          <div className="nb-section-lines" style={{ marginBottom: '16px' }}>
            <div className="nb-section-line"></div>
            <span className="nb-section-subtitle">Highlights</span>
            <div className="nb-section-line"></div>
          </div>
          <h2 className="nb-section-title">
            {projectViewDetails.projectName}
            <div className="nb-section-underline" style={{ marginTop: '12px' }}></div>
          </h2>
        </div>

        <div className="nb-highlights-grid">
          <div className="nb-highlights-left">
            <div className="nb-highlights-image-card">
              {projectViewDetails?.highlightImage?.url && (
                <>
                  <img
                    src={projectViewDetails?.highlightImage?.url}
                    alt={`${projectViewDetails.projectName}`}
                    className="nb-highlights-image"
                  />
                  <div className="nb-highlights-overlay-r"></div>
                  <div className="nb-highlights-overlay-t"></div>
                  <div className="nb-highlight-cta-desktop">
                    <button
                      onClick={() => {
                        const url = projectViewDetails?.projectBrochure?.url;
                        if (url) window.open(url, '_blank'); else handleShowInstantcallBack?.();
                      }}
                      className="nb-brochure-btn-alt"
                    >
                      <i className="fas fa-download"></i>
                      <span>Download Brochure</span>
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="nb-highlight-cta-mobile">
              {/* <button
                onClick={() => {
                  const url = projectViewDetails?.projectBrochure?.url;
                  if (url) window.open(url, '_blank'); else handleShowInstantcallBack?.();
                }}
                className="nb-brochure-btn-mobile"
              >
                <i className="fas fa-download"></i>
                <span>Download Brochure</span>
              </button> */}
            </div>
          </div>

          <div className="nb-highlights-right">
            <div className="nb-highlights-text-card">
              <div className="nb-highlight-points">
                {Array.isArray(highlight) && highlight.length > 0 &&
                  highlight.map((item, index) => (
                    <div key={index} className="nb-highlight-item">
                      <div className="nb-highlight-dot"></div>
                      <p className="nb-highlight-text">{item.highlight_Point}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightsSection;
