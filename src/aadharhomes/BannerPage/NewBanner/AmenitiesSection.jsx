import React from 'react';
import '../../../styles/newbanner/amenities.css';
import Dynamicsvg from '../Dynamicsvg';

// Map amenity names to their corresponding images
const amenityImageMap = {
  'Basketball Court': 'basketball.webp',
  'Basketball': 'basketball.webp',
  'Billiard Room': 'billiard_room.webp',
  'Billiards': 'billiard_room.webp',
  'Pool Table': 'billiard_room.webp',
  'Deck Seating': 'deck_seating.webp',
  'Seating Area': 'deck_seating.webp',
  'Outdoor Seating': 'deck_seating.webp',
  'Garden': 'greens.webp',
  'Greens': 'greens.webp',
  'Landscaping': 'greens.webp',
  'Green Area': 'greens.webp',
  'Gym': 'gym-new-img.webp',
  'Fitness Center': 'gym-new-img.webp',
  'Gymnasium': 'gym-new-img.webp',
  'Kids Play Area': 'kids-play-area.webp',
  'Children Play Area': 'kidsplayarea-img-amenity.webp',
  'Playground': 'kids-play-area.webp',
  'Play Area': 'kids-play-area.webp',
  'Lawn': 'lawn.webp',
  'Open Lawn': 'lawn.webp',
  'Green Lawn': 'lawn.webp',
  'Multipurpose Court': 'multipurpose-court-new-img.webp',
  'Sports Court': 'multipurpose-court-new-img.webp',
  'Multi-purpose Court': 'multipurpose-court-new-img.webp',
  'Senior Citizen Area': 'senior_citizen.webp',
  'Senior Citizens': 'senior_citizen.webp',
  'Elderly Care': 'senior_citizen.webp',
  'Swimming Pool': 'swimming-pool-new-img.webp',
  'Pool': 'swimming-pool-new-img.webp',
  'Water Feature': 'water_feature-new-img.webp',
  'Fountain': 'water_feature-new-img.webp',
  'Water Body': 'water_feature-new-img.webp'
};

const normalizeAmenities = (Amenities) => {
  if (!Amenities) return [];
  return Amenities.flatMap((item, idx) =>
    idx === 0 && typeof item === 'string'
      ? item.split(',').map((s) => s.trim())
      : item
  ).filter(Boolean);
};

const getAmenityImage = (amenityName) => {
  // Try exact match first
  if (amenityImageMap[amenityName]) {
    return `/amenities_image/${amenityImageMap[amenityName]}`;
  }
  
  // Try partial match
  const lowerName = amenityName.toLowerCase();
  for (const [key, value] of Object.entries(amenityImageMap)) {
    if (key.toLowerCase().includes(lowerName) || lowerName.includes(key.toLowerCase())) {
      return `/amenities_image/${value}`;
    }
  }
  
  // Default fallback - return null to use SVG icon
  return null;
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
        {items.map((project, idx) => {
          const amenityImage = getAmenityImage(project);
          return (
            <div key={idx} className="nb-amenity-card group">
              <div className="nb-amenity-overlay"></div>
              <div className="nb-amenity-iconwrap">
                <div className="nb-amenity-icon">
                  {amenityImage ? (
                    <img 
                      src={amenityImage} 
                      alt={project}
                      className="nb-amenity-image"
                      onError={(e) => {
                        // Fallback to SVG icon if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <Dynamicsvg 
                    text={project} 
                    className="nb-amenity-svg" 
                    style={{ display: amenityImage ? 'none' : 'block' }}
                  />
                </div>
              </div>
              <div className="nb-amenity-text">
                <h3 className="nb-amenity-title">{project}</h3>
              </div>
              <div className="nb-amenity-shine"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AmenitiesSection;
