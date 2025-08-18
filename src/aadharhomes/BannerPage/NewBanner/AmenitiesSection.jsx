import React from 'react';
import '../../../styles/newbanner/amenities.css';
import Dynamicsvg from '../Dynamicsvg';

const normalizeAmenities = (Amenities) => {
  if (!Amenities) return [];
  return Amenities.flatMap((item, idx) =>
    idx === 0 && typeof item === 'string'
      ? item.split(',').map((s) => s.trim())
      : item
  ).filter(Boolean);
};

const AmenitiesSection = ({ projectName, Amenities = [] }) => {
  const items = normalizeAmenities(Amenities);

  return (
    <div className="nb-amenities-section">
      <div className="nb-section-header nb-amenities-header">
        <div className="nb-section-lines">
          <div className="nb-section-line"></div>
          <span className="nb-section-subtitle">Project Facilities</span>
          <div className="nb-section-line"></div>
        </div>
        <h2 className="nb-section-title nb-amenities-title">
          {projectName}
          <span className="nb-amenities-subtitle">Amenities</span>
        </h2>
        <div className="nb-section-underline"></div>
      </div>
      <div className="nb-amenities-grid">
        {items.map((project, idx) => (
          <div key={idx} className="nb-amenity-card group">
            <div className="nb-amenity-overlay"></div>
            <div className="nb-amenity-iconwrap">
              <div className="nb-amenity-icon">
                <Dynamicsvg text={project} className="nb-amenity-svg" />
              </div>
            </div>
            <div className="nb-amenity-text">
              <h3 className="nb-amenity-title">{project}</h3>
            </div>
            <div className="nb-amenity-shine"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesSection;
