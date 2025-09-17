import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const ProjectHero = ({
  projectExists = true,
  backgroundImage = null,
  projectTitle = "",
  location = "",
  phoneNumber = "",
  companyLogo = null,
  bottomInfo = {
    landArea: "",
    possession: "",
    aboutProject: "",
    price: ""
  },
  onShowCallback = () => {}
}) => {
  // If project doesn't exist, return null to render nothing
  if (!projectExists || !backgroundImage) {
    return null;
  }
  // Only set background image if it exists
  const backgroundStyle = useMemo(() => ({
    ...(backgroundImage && { backgroundImage: `url(${backgroundImage})` }),
    contentVisibility: 'auto',
    containIntrinsicSize: '100vw 100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: backgroundImage ? 'transparent' : '#1a202c' // Dark background if no image
  }), [backgroundImage]);

  // Basic JSON-LD structured data describing the project hero entity
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: projectTitle,
    image: backgroundImage,
    telephone: phoneNumber,
    address: {
      "@type": "PostalAddress",
      addressLocality: location
    },
    url: typeof window !== 'undefined' && window.location ? window.location.href : undefined
  };

  return (
    <header role="banner" className="relative h-screen w-full overflow-hidden">
      {/* Structured data for search engines */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={backgroundStyle}
      >
        {backgroundImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        )}
      </div>
      {/* Accessible image for SEO without changing visual BG */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt={`${projectTitle} in ${location}`}
          fetchpriority="high"
          loading="eager"
          width="1973"
          height="1100"
          className="sr-only"
        />
      )}
      
      
      {/* Top Bar - Glassy Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-3 bg-black/20 backdrop-blur-md border-b border-white/10 transition-colors duration-300" aria-label="Project top navigation">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Company Logo - Leftmost */}
          <div className="flex items-center">
            {companyLogo ? (
              <img src={companyLogo} alt={`${projectTitle} developer logo`} className="h-10 w-auto" />
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
              aria-label={`Open contact form for ${projectTitle}`}
            >
              Get in Touch
            </button>
            
            {/* Phone Number Button - Luxury Golden Design */}
            <a href={`tel:+91${phoneNumber}`} aria-label={`Call +91${phoneNumber}`} rel="nofollow">
              <div className="flex items-center bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full shadow-[0_4px_15px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.5)] transition-all duration-300 transform hover:scale-105 border-2 border-yellow-400 pr-4 gap-3">
                {/* Circular phone icon */}
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 border-2 border-white rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_3px_8px_rgba(212,175,55,0.5)]">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.55.57 1 1 0 011 1v3.61a1 1 0 01-.91 1A16 16 0 014 5.92 1 1 0 015 5h3.61a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.24 1.01l-2.32 2.23z"/>
                  </svg>
                </div>
                
                {/* Phone number text */}
                <span className="text-white text-lg font-semibold tracking-wide whitespace-nowrap" style={{ textShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)' }}>{phoneNumber}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom Section with Title, Location and Info Bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-5xl px-4" style={{ contentVisibility: 'auto' }}>
        {/* Breadcrumbs kept for accessibility but hidden visually */}
        <nav className="sr-only" aria-label="Breadcrumb">
          <ol>
            <li>Home</li>
            <li>{location}</li>
            <li>{projectTitle}</li>
          </ol>
        </nav>
        {/* Title and Location positioned above info bar */}
        <div className="text-center text-white mb-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 tracking-wide text-white">
            {projectTitle}
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
              <div className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">
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
    </header>
  );
};

// Add prop types for better development experience
ProjectHero.propTypes = {
  projectExists: PropTypes.bool,
  backgroundImage: PropTypes.string,
  projectTitle: PropTypes.string,
  location: PropTypes.string,
  phoneNumber: PropTypes.string,
  companyLogo: PropTypes.string,
  bottomInfo: PropTypes.shape({
    landArea: PropTypes.string,
    possession: PropTypes.string,
    aboutProject: PropTypes.string,
    price: PropTypes.string
  }),
  onShowCallback: PropTypes.func
};

ProjectHero.defaultProps = {
  projectExists: true,
  backgroundImage: null,
  projectTitle: '',
  location: '',
  phoneNumber: '',
  companyLogo: null,
  bottomInfo: {
    landArea: '',
    possession: '',
    aboutProject: '',
    price: ''
  },
  onShowCallback: () => {}
};
 

export default ProjectHero;
