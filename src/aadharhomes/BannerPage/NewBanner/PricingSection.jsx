import React from 'react';

export default function PricingSection({ projectViewDetails, BhK_Details, handleShowInstantcallBack }) {
  return (
    <div className="nb-pricing-section">
      <div className="nb-pricing-inner">
        <div className="nb-section-header">
          <div className="nb-section-lines">
            <div className="nb-section-line"></div>
            <span className="nb-section-subtitle">Pricing & Dimensions</span>
            <div className="nb-section-line"></div>
          </div>
          <h2 className="nb-section-title">
            {projectViewDetails.projectName}
            <span className="block font-serif">Size & Price</span>
            <div className="nb-section-underline"></div>
          </h2>
        </div>
        <div className="nb-pricing-content">
          {/* Desktop Table View */}
          <div className="nb-pricing-table nb-hide-mobile">
            {/* Premium Golden Header */}
            <div className="nb-pricing-header">
              <div className="nb-pricing-cell nb-cell-head nb-cell-divider"><span>Unit Type</span></div>
              <div className="nb-pricing-cell nb-cell-head nb-cell-divider"><span>Unit Size</span></div>
              <div className="nb-pricing-cell nb-cell-head"><span>Unit Price</span></div>
            </div>

            {/* Premium Table Body */}
            <div className="nb-pricing-body">
              {BhK_Details &&
                Array.isArray(BhK_Details) &&
                BhK_Details.length > 0 &&
                BhK_Details.map((item, index) => (
                  <div
                    className={`nb-pricing-row ${index % 2 === 0 ? 'nb-row-alt' : ''}`}
                    key={index}
                    style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
                  >
                    <div className="nb-pricing-cell nb-cell-divider"><span className="nb-pricing-text-strong">{item.bhk_type}</span></div>
                    <div className="nb-pricing-cell nb-cell-divider"><span className="nb-pricing-text">{item.bhk_Area}</span></div>
                    <div className="nb-pricing-cell">
                      <button className="nb-get-details-btn" onClick={handleShowInstantcallBack}>Get Details</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="nb-pricing-mobile nb-hide-desktop">
            {BhK_Details &&
              Array.isArray(BhK_Details) &&
              BhK_Details.length > 0 &&
              BhK_Details.map((item, index) => (
                <div
                  key={index}
                  className="nb-pricing-mobile-card"
                  style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both` }}
                >
                  {/* Unit Type Header */}
                  <div className="nb-pricing-mobile-head">
                    <h3 className="nb-pricing-mobile-title">{item.bhk_type}</h3>
                  </div>

                  {/* Unit Size */}
                  <div className="nb-pricing-mobile-size">
                    <div className="nb-pricing-mobile-sizechip">
                      <span className="nb-pricing-size-label">Size:</span>
                      <span className="nb-pricing-size-value">{item.bhk_Area}</span>
                    </div>
                  </div>

                  {/* Get Details Button */}
                  <div className="nb-pricing-mobile-cta">
                    <button className="nb-pricing-mobile-btn" onClick={handleShowInstantcallBack}>
                      <span className="nb-pricing-mobile-btntext">
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
