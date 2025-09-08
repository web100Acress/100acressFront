import React, { useMemo } from 'react';

const ProjectHero = ({
  backgroundImage = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
  projectTitle = "MAX ESTATE SECTOR 36A",
  location = "Sector 36A, Gurugram",
  phoneNumber = "+91 9810982010",
  companyLogo = null,
  bottomInfo = {
    landArea: "14 Acre",
    possession: "Dec 2025",
    aboutProject: "Premium residential project with modern amenities...",
    price: "₹ 5.2 Cr"
  },
  onShowCallback = () => {}
}) => {
  // Memoize background image style to prevent re-renders
  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url(${backgroundImage})`,
    contentVisibility: 'auto',
    containIntrinsicSize: '100vw 100vh'
  }), [backgroundImage]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={backgroundStyle}
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Company Logo - Moved to leftmost */}
          <div className="flex items-center">
            {companyLogo ? (
              <img src={companyLogo} alt="Company Logo" className="h-10 w-auto" />
            ) : (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-2">
                <span className="text-white font-bold text-lg">LOGO</span>
              </div>
            )}
          </div>
          
          {/* Right side container */}
          <div className="flex items-center gap-4">
            {/* Get in Touch Button - Hidden on mobile */}
            <button 
              onClick={onShowCallback}
              className="hidden sm:block bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </button>
            
            {/* Phone Number Button - Enhanced design */}
            <a href={`tel:${phoneNumber}`}>
              <div className="relative flex items-center bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.2)] transition-all duration-300 transform hover:scale-105 border border-gray-100">
                {/* Circular phone icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-inner">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                
                {/* Phone number section */}
                <div className="bg-gray-800 text-white px-5 py-3 h-12 flex items-center rounded-r-full ml-[-2px] shadow-inner">
                  <span className="text-sm font-semibold tracking-wide whitespace-nowrap">{phoneNumber}</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom Section with Title, Location and Info Bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-5xl px-4" style={{ contentVisibility: 'auto' }}>
        {/* Title and Location positioned above info bar */}
        <div className="text-center text-white mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 tracking-wide text-white will-change-transform">
            {projectTitle || "Loading..."}
          </h1>
          <p className="text-base sm:text-lg font-light opacity-90 text-gray-200">
            {location}
          </p>
        </div>
        <div className="border-2 border-yellow-400/60 bg-black/20 backdrop-blur-md rounded-lg shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 relative">
            {/* Land Area */}
            <div className="px-4 py-6 text-center relative group cursor-pointer transition-all duration-300 hover:bg-yellow-400/10 hover:scale-105 hover:shadow-lg rounded-l-lg">
              <div className="text-xs font-medium text-white/80 uppercase tracking-widest mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                LAND AREA
              </div>
              <div className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">
                {bottomInfo.landArea}
              </div>
              {/* Gradient divider */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-yellow-400/80 to-transparent lg:block hidden"></div>
            </div>
            
            {/* Possession */}
            <div className="px-4 py-6 text-center relative group cursor-pointer transition-all duration-300 hover:bg-yellow-400/10 hover:scale-105 hover:shadow-lg">
              <div className="text-xs font-medium text-white/80 uppercase tracking-widest mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                POSSESSION
              </div>
              <div className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">
                {bottomInfo.possession}
              </div>
              {/* Gradient divider */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-yellow-400/80 to-transparent lg:block hidden"></div>
            </div>
            
            {/* About Project */}
            <div className="px-4 py-6 text-center relative group cursor-pointer transition-all duration-300 hover:bg-yellow-400/10 hover:scale-105 hover:shadow-lg flex-1 min-w-[200px]">
              <div className="text-xs font-medium text-white/80 uppercase tracking-widest mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                ABOUT PROJECT
              </div>
              <div className="text-sm font-medium text-white leading-tight line-clamp-2 group-hover:text-yellow-300 transition-colors duration-300">
                {bottomInfo.aboutProject}
              </div>
              {/* Gradient divider */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-yellow-400/80 to-transparent lg:block hidden"></div>
            </div>
            
            {/* Price */}
            <div className="px-4 py-6 text-center group cursor-pointer transition-all duration-300 hover:bg-yellow-400/10 hover:scale-105 hover:shadow-lg rounded-r-lg">
              <div className="text-xs font-medium text-white/80 uppercase tracking-widest mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                PRICE
              </div>
              <div className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">
                {bottomInfo.price}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectHero;
