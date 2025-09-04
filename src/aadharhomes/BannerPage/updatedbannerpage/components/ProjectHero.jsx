import React from 'react';

const ProjectHero = ({
  backgroundImage = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
  projectTitle = "MAX ESTATE SECTOR 36A",
  location = "Sector 36A, Gurugram",
  phoneNumber = "+91 9810982010",
  companyLogo = null,
  bottomInfo = {
    landArea: "14 Acre",
    typology: "Luxury 3 & 4 BHK Residences",
    startingPrice: "₹ 5.2 Cr",
    highlight: "9 Acres of Land with Greenery"
  }
}) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Phone Number Button */}
          <button className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white hover:bg-white/20 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.16 10.928c-.652.35-.974 1.089-.734 1.767C6.364 15.177 8.823 17.636 11.305 18.574c.678.24 1.417-.082 1.767-.734l1.541-4.064a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-sm font-medium">{phoneNumber}</span>
          </button>
          
          {/* Company Logo */}
          <div className="flex items-center justify-center">
            {companyLogo ? (
              <img src={companyLogo} alt="Company Logo" className="h-10 w-auto" />
            ) : (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-2">
                <span className="text-white font-bold text-lg">LOGO</span>
              </div>
            )}
          </div>
          
          {/* Get in Touch Button */}
          <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Get in Touch
          </button>
        </div>
      </div>
      
      {/* Main Banner Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
        <div className="text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-wide">
            {projectTitle}
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light opacity-90">
            {location}
          </p>
        </div>
      </div>
      
      {/* Bottom Info Bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-5xl px-4">
        <div className="border-2 border-white/30 bg-black/40 backdrop-blur-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {/* Land Area */}
            <div className="px-6 py-8 text-center border-r border-white/30 last:border-r-0">
              <div className="text-xs font-medium text-white/80 uppercase tracking-widest mb-3">
                LAND AREA
              </div>
              <div className="text-2xl font-bold text-white">
                {bottomInfo.landArea}
              </div>
            </div>
            
            {/* Typology */}
            <div className="px-6 py-8 text-center border-r border-white/30 last:border-r-0">
              <div className="text-xs font-medium text-white/80 uppercase tracking-widest mb-3">
                TYPOLOGY
              </div>
              <div className="text-base font-bold text-white leading-tight">
                {bottomInfo.typology}
              </div>
            </div>
            
            {/* Starting Price */}
            <div className="px-6 py-8 text-center border-r border-white/30 last:border-r-0">
              <div className="text-xs font-medium text-white/80 uppercase tracking-widest mb-3">
                STARTING PRICE
              </div>
              <div className="text-2xl font-bold text-white">
                {bottomInfo.startingPrice}
              </div>
            </div>
            
            {/* Highlight */}
            <div className="px-6 py-8 text-center">
              <div className="text-xs font-medium text-white/80 uppercase tracking-widest mb-3">
                HIGHLIGHT
              </div>
              <div className="text-base font-bold text-white leading-tight">
                {bottomInfo.highlight}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHero;
