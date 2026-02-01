import React from 'react';

const AmenitiesSectionDesktop = ({ amenities = [] }) => {
  // Default amenities if none provided
  const defaultAmenities = [
    { name: "Cafeteria / Food Court", icon: "M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.95 4.95c.78.78 2.05.78 2.83 0l1.41-1.41L8.1 13.34z" },
    { name: "Power Backup", icon: "M15 11V6l-3-4H9l-3 4v5c0 1.66 1.34 3 3 3h3c1.66 0 3-1.34 3-3zm-4-8h2v3h-2V3zm6 8c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z" },
    { name: "Lift", icon: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-7 14h-2v-2h2v2zm0-4h-2V7h2v6z" },
    { name: "Security", icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" },
    { name: "Service / Goods Lift", icon: "M19 15h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zM9 19h2v-2H9v2zm0-4h2v-2H9v2zm0-4h2V9H9v2zm0-4h2V5H9v2zM5 19h2v-2H5v2zm0-4h2v-2H5v2zm0-4h2V9H5v2zm0-4h2V5H5v2zm8 12h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V9h-2v2zm0-4h2V5h-2v2z" },
    { name: "Visitor Parking", icon: "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" },
    { name: "Gymnasium", icon: "M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" },
    { name: "Rain Water Harvesting", icon: "M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z" },
    { name: "Air Conditioned", icon: "M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z" },
    { name: "Earthquake Resistant", icon: "M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3h-6zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3v6zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6h6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6v-6z" },
    { name: "Tier 3 Security System", icon: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" },
    { name: "Large Open Space", icon: "M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z" },
    { name: "Grand Entrance Lobby", icon: "M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" },
    { name: "Kid Play Area", icon: "M7.5 4c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm9 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm-9 8c-2.33 0-7 1.17-7 3.5V18h14v-2.5c0-2.33-4.67-3.5-7-3.5zm9 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18h6v-2.5c0-2.33-4.67-3.5-7-3.5z" },
    { name: "Event Space & Amphitheatre", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" },
    { name: "Fire Fighting Equipment", icon: "M19.48 12.35c-.18-.18-.46-.27-.71-.27-.25 0-.53.09-.71.27-.18.18-.27.46-.27.71 0 .25.09.53.27.71.18.18.46.27.71.27.25 0 .53-.09.71-.27.18-.18.27-.46.27-.71 0-.25-.09-.53-.27-.71zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" }
  ];

  const amenitiesList = amenities.length > 0 ? amenities : defaultAmenities;

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Desktop Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
          AMENITIES
        </h2>
        <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-2">
          Premium Lifestyle Features
        </h3>
        <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full mx-auto mt-2"></div>
      </div>

      {/* Desktop Luxury Card Container */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-amber-900/30">
        
        {/* Desktop accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700"></div>
        
        <div className="relative p-6 sm:p-8 lg:p-10">
          
          {/* Desktop Amenities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {amenitiesList.map((amenity, idx) => (
              <div 
                key={idx} 
                className="bg-transparent border-2 border-amber-500/60 rounded-lg p-3 flex items-center gap-2.5 hover:border-amber-400 hover:bg-amber-500/5 transition-all duration-300 group"
              >
                <div className="flex-shrink-0">
                  <svg 
                    className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d={amenity.icon} />
                  </svg>
                </div>
                <h3 className="text-white text-sm md:text-base font-medium">
                  {amenity.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Desktop Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Experience luxury living with world-class amenities designed for your comfort and convenience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSectionDesktop;
