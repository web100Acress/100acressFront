import React from 'react';
import '../../../styles/PricingSection.css';

export default function PricingSection({ projectViewDetails, BhK_Details, handleShowInstantcallBack }) {
  return (
    <div className="prc-section">
      <div className="prc-inner">
        <div className="prc-header">
          <div className="prc-lines">
            <div className="prc-line"></div>
            <span className="prc-subtitle">Pricing & Dimensions</span>
            <div className="prc-line"></div>
          </div>
          <h2 className="prc-title">
            {projectViewDetails.projectName}
            <div className="prc-underline"></div>
          </h2>
        </div>

        <div className="prc-content">
        
          <div className="prc-table-wrap prc-hide-mobile">
            <div className="prc-table">
              <div className="prc-thead">
                <div className="prc-cell prc-cell-head prc-divider"><span>Unit Type</span></div>
                <div className="prc-cell prc-cell-head prc-divider"><span>Unit Size</span></div>
                <div className="prc-cell prc-cell-head"><span>Unit Price</span></div>
              </div>

              <div className="prc-tbody">
                {BhK_Details?.map((item, index) => (
                  <div
                    className={`prc-row ${index % 2 === 0 ? 'prc-row-alt' : ''}`}
                    key={index}
                    style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
                  >
                    <div className="prc-cell prc-divider"><span className="prc-strong">{item.bhk_type}</span></div>
                    <div className="prc-cell prc-divider"><span className="prc-text">{item.bhk_Area}</span></div>
                    <div className="prc-cell">
                      <button className="prc-btn" onClick={handleShowInstantcallBack}>Get Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="prc-mobile prc-hide-desktop">
            {BhK_Details?.map((item, index) => (
              <div
                key={index}
                className="prc-card"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both` }}
              >
                <div className="prc-card-head">
                  <h3 className="prc-card-title">{item.bhk_type}</h3>
                </div>

                <div className="prc-card-size">
                  <div className="prc-size-chip">
                    <span className="prc-size-label">Size:</span>
                    <span className="prc-size-value">{item.bhk_Area}</span>
                  </div>
                </div>

                <div className="prc-card-cta">
                  <button className="prc-mobile-btn" onClick={handleShowInstantcallBack}>
                    <span className="prc-btn-text">
                      <i className="fas fa-info-circle" aria-hidden="true"></i>
                      Get Details
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
