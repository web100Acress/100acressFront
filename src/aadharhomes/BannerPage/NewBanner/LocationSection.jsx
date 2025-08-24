import React from 'react';
import '../../../styles/newbanner/location.css';

const LocationSection = ({
  projectName,
  locationImageUrl,
  connectivity = [],
  entertainment = [],
  business = [],
  education = [],
}) => {
  return (
    <section id="location" className="nb-location-section">
      <div className="nb-section-header nb-location-header">
        <div className="nb-section-lines">
          <div className="nb-section-line"></div>
          <span className="nb-section-subtitle">Location Map</span>
          <div className="nb-section-line"></div>
        </div>
        <h2 className="nb-section-title">
          {projectName}
          <div className="nb-section-underline nb-location-underline"></div>
        </h2>
      </div>
      <div className="nb-location-grid">
        <div className="nb-location-left">
          <div className="nb-location-image-card">
            {locationImageUrl && (
              <>
                <img src={locationImageUrl} alt={`${projectName} Location`} className="nb-location-image" />
                <div className="nb-location-overlay"></div>
              </>
            )}
          </div>
        </div>
        <div className="nb-location-right">
          <div className="nb-location-card">
            <div className="nb-location-lists">
              {connectivity.length > 0 && (
                <div className="nb-location-list">
                  <div className="nb-location-list-inner">
                    {connectivity.map((item, index) => (
                      <div key={index} className="nb-location-item">
                        <div className="nb-location-dot"></div>
                        <p className="nb-location-text">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {entertainment.length > 0 && (
                <div className="nb-location-list">
                  <div className="nb-location-list-inner">
                    {entertainment.map((item, index) => (
                      <div key={index} className="nb-location-item">
                        <div className="nb-location-dot"></div>
                        <p className="nb-location-text">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {business.length > 0 && (
                <div className="nb-location-list">
                  <div className="nb-location-list-inner">
                    {business.map((item, index) => (
                      <div key={index} className="nb-location-item">
                        <div className="nb-location-dot"></div>
                        <p className="nb-location-text">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {education.length > 0 && (
                <div className="nb-location-list">
                  <div className="nb-location-list-inner">
                    {education.map((item, index) => (
                      <div key={index} className="nb-location-item">
                        <div className="nb-location-dot"></div>
                        <p className="nb-location-text">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
