import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LocationSection.desktop.css';

const LocationSection = ({ 
  projectName = "",
  projectAddress = "",
  city = "",
  locationImage,
  connectivityPoints = [],
  businessPoints = [],
  educationPoints = [],
  entertainmentPoints = [],
  projectViewDetails = null,
  onShowCallback = () => {}
}) => {
  const [activeTab, setActiveTab] = useState('connectivity');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Extract phone number from projectViewDetails (same logic as ProjectHero)
  const phoneNumber = projectViewDetails?.mobileNumber || "9811750130";
  
  // For verification: log the phone number we are receiving from admin
  useEffect(() => {
    if (phoneNumber) {
      console.log('LocationSection received phone number from admin:', phoneNumber);
    }
  }, [phoneNumber]);

  const hasConnectivity = (connectivityPoints && connectivityPoints.length > 0) ||
                       (businessPoints && businessPoints.length > 0) ||
                       (educationPoints && educationPoints.length > 0) ||
                       (entertainmentPoints && entertainmentPoints.length > 0);

  const IconConnectivity = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );

  const IconBusiness = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );

  const IconEducation = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  );

  const IconEntertainment = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4" />
    </svg>
  );

  const tabs = [
    { id: 'connectivity', icon: <IconConnectivity />, label: 'Connectivity', points: connectivityPoints, color: 'from-blue-500 to-blue-600' },
    { id: 'business', icon: <IconBusiness />, label: 'Business', points: businessPoints, color: 'from-emerald-500 to-emerald-600' },
    { id: 'education', icon: <IconEducation />, label: 'Education', points: educationPoints, color: 'from-purple-500 to-purple-600' },
    { id: 'entertainment', icon: <IconEntertainment />, label: 'Entertainment', points: entertainmentPoints, color: 'from-rose-500 to-rose-600' },
  ];

  const renderPoint = (point, index, color) => (
    <motion.div 
      key={index}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-start space-x-3 group"
    >
      <div className={`w-2 h-2 ${color.split(' ')[2]} rounded-full mt-2 flex-shrink-0 transition-transform duration-300 group-hover:scale-125`}></div>
      <p className="text-gray-300 text-sm md:text-base leading-relaxed transition-colors duration-300 group-hover:text-white clamp-3">
        {point}
      </p>
    </motion.div>
  );

  // Filter out tabs with no points
  const tabsWithPoints = tabs.filter(tab => tab.points && tab.points.length > 0);

  // Quick action handlers
  const handleCall = () => {
    console.log('Calling:', phoneNumber);
    window.location.href = `tel:+91${phoneNumber}`;
  };

  const handleEmail = () => {
    // eslint-disable-next-line no-console
    console.log("Opening contact form (Get in touch)");
    onShowCallback();
  };

  const handleShare = async () => {
    const shareData = {
      title: projectName || "Project",
      text: projectAddress ? `${projectName} — ${projectAddress}` : projectName,
      url: window?.location?.href || "",
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard");
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("Share cancelled or failed:", e);
    }
  };

  const handleViewOnMap = () => {
    // Get user's current location and show directions to project
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Create destination query from project address
          const destination = projectAddress && city 
            ? `${projectAddress}, ${city}` 
            : projectName || "Project Location";
          
          // Open Google Maps with directions from current location to destination
          const mapsUrl = `https://www.google.com/maps/dir/${latitude},${longitude}/${encodeURIComponent(destination)}`;
          window.open(mapsUrl, '_blank');
        },
        (error) => {
          // If geolocation fails, just open maps with the destination
          console.error('Error getting location:', error);
          const destination = projectAddress && city 
            ? `${projectAddress}, ${city}` 
            : projectName || "Project Location";
          const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(destination)}`;
          window.open(mapsUrl, '_blank');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000 // Accept cached location up to 1 minute old
        }
      );
    } else {
      // If geolocation is not supported, just open maps with the destination
      const destination = projectAddress && city 
        ? `${projectAddress}, ${city}` 
        : projectName || "Project Location";
      const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(destination)}`;
      window.open(mapsUrl, '_blank');
    }
  };

  return (
    <section className="location-section-desktop">
      {/* Section Title - Outside Card */}
      <div className="location-section-desktop-title-wrap">
        <h2 className="location-section-desktop-title">
          LOCATION & CONNECTIVITY
        </h2>
      </div>

      {/* Luxury Dark Card Container */}
      <div className="location-section-desktop-card">
        {/* Dark Golden Accent Line */}
        <div className="location-section-desktop-card-accent"></div>

        <div className="location-section-desktop-grid">
          
          {/* Left Column - Content */}
          <div className="location-section-desktop-left">
            {/* Section Header */}
            <div className="location-section-desktop-left-header">
              <h3 className="location-section-desktop-subtitle">
                {projectName ? `${projectName} Location` : "Location Highlights"}
              </h3>
              <div className="location-section-desktop-underline"></div>
            </div>

            {/* All Location Points Vertical List */}
            <div className="location-points-vertical-list custom-scrollbar">
              <div className="location-points-grid">
                {[
                  ...(connectivityPoints || []),
                  ...(businessPoints || []),
                  ...(educationPoints || []),
                  ...(entertainmentPoints || [])
                ].map((point, index) => (
                  <div key={index} className="location-point-item">
                    <div className="location-point-check">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="location-point-text">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Map/Image */}
          <div className="location-section-desktop-right">
            <div className="location-section-desktop-image-wrap" onClick={handleViewOnMap} style={{ cursor: 'pointer' }}>
              {(locationImage?.url || locationImage) ? (
                <>
                  <img 
                    src={locationImage?.url || locationImage} 
                    alt={`${projectName} Location Map`}
                    className="location-section-desktop-image"
                    crossOrigin="anonymous"
                  />
                  <div className="location-section-desktop-image-overlay"></div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full bg-slate-800 text-slate-500">
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p>View Map</p>
                  </div>
                </div>
              )}
              <div className="location-section-desktop-frame"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LocationSection;
