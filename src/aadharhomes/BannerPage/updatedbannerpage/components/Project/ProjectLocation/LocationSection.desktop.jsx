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
      {/* Animated Background Elements */}
      <div className="location-section-background">
        <div className="location-section-background-overlay">
          <div className="location-section-float-element-1"></div>
          <div className="location-section-float-element-2"></div>
        </div>
        <div className="location-section-gradient-overlay"></div>
      </div>

      <div className="location-section-content">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isMounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="location-section-header"
        >
          <motion.div 
            className="location-section-header-icon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-7 h-7 md:w-8 md:h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </motion.div>
          <h2 className="location-section-subtitle">
            LOCATION & CONNECTIVITY
          </h2>
          <h3 className="location-section-title">
            Strategic Location with Unmatched Connectivity
          </h3>
          <div className="location-section-accent-line"></div>
        </motion.div>

        {/* Main Content */}
        <div className="location-section-main-grid">
          {/* Location Map Card */}
          <motion.div 
            className="location-section-map-card"
            initial={{ opacity: 0, x: -20 }}
            animate={isMounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="location-section-map-glow"></div>
              
              {/* Map Container */}
              <div className="location-section-map-container">
                {/* Map Image */}
                <div className="location-section-map-image-container">
                  {locationImage?.url ? (
                    <img 
                      src={locationImage.url} 
                      alt={`${projectName} Location`} 
                      className="location-section-map-image"
                    />
                  ) : (
                    <div className="location-section-map-placeholder">
                      <div className="location-section-map-placeholder-content">
                        <div className="location-section-map-placeholder-icon">
                          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                        </div>
                        <p className="location-section-map-placeholder-text">Interactive Location Map</p>
                      </div>
                    </div>
                  )}
                
                {/* Map Overlay Controls - Inside the image container */}
                <div className="location-section-map-overlay">
                  <div className="location-section-map-overlay-content">
                    <button 
                      onClick={handleViewOnMap}
                      className="location-section-view-map-button"
                    >
                      View on Map
                    </button>
                  </div>
                </div>
              </div>
              
               <div className="location-section-info-cards-grid">
                  {tabsWithPoints.map((tab, index) => (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="location-section-info-card"
                    >
                      {/* Tab Header with Icon */}
                      <div className="location-section-tab-header">
                        
                        <div>
                          {/* <h4 className="text-white font-semibold text-sm">{tab.label}</h4> */}
                          {/* <p className="text-gray-400 text-xs">{tab.points.length} locations</p> */}
                        </div>
                      </div>
                      
                      {/* Location Points */}
                      <div className="location-section-points-container">
                        {tab.points.slice(0, 2).map((point, i) => (
                          <div key={i} className="location-section-point-item">
                            <div className={`location-section-point-icon ${tab.color.split(' ')[2]}`}>
                              {tab.icon}
                            </div>
                            <p className="location-section-point-text">{point}</p>
                          </div>
                        ))}
                        {tab.points.length > 2 && (
                          <p className="location-section-more-points">
                            +{tab.points.length - 2} more
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
            </div>
          </motion.div>

          {/* Connectivity Points Grid */}
          <motion.div 
            className="location-section-connectivity-grid"
            initial={{ opacity: 0, x: 20 }}
            animate={isMounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
          </motion.div>
        </div>
      </div>

      {/* Scoped styles for this component */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        /* Clamp to ~3 lines with ellipsis */
        .clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-clamp: 3;
        }
      `}</style>
    </section>
  );
};

export default LocationSection;
