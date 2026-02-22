import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const ProjectHeroMobile = ({
  projectExists = true,
  backgroundImage = null,
  thumbnailImage = null,
  projectTitle = "",
  location = "",
  phoneNumber = "",
  companyLogo = null,
  bottomInfo = {
    landArea: "",
    possession: "",
    possessionLabel: "POSSESSION",
    aboutProject: "",
    price: ""
  },
  onShowCallback = () => {}
}) => {
  // If project doesn't exist, return null to render nothing
  if (!projectExists || !backgroundImage) {
    return null;
  }

  // Optimized image loading strategy
  const imageProps = useMemo(() => ({
    src: backgroundImage || thumbnailImage,
    alt: `${projectTitle} in ${location}`,
    loading: 'eager',
    fetchPriority: 'high',
    width: 1973,
    height: 450,
    style: {
      objectFit: 'cover',
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
    }
  }), [backgroundImage, thumbnailImage, projectTitle, location]);

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
    <header role="banner" className="relative w-full overflow-hidden">
      {/* Structured data for search engines */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Background Image - Reduced Height with gap from header */}
      <div 
        className="relative h-[25vh] w-full hero-background mt-14"
      >
        <img {...imageProps} />
        {backgroundImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        )}
      </div>
      
      {/* Top Bar - Compact Mobile Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 px-3 py-2 bg-black/30 backdrop-blur-lg border-b border-white/20 transition-colors duration-300" aria-label="Project top navigation">
        <div className="flex items-center justify-between max-w-full mx-auto">
          {/* Company Logo - Compact */}
          <div className="flex items-center">
            {companyLogo ? (
              <img src={companyLogo} alt={`${projectTitle} developer logo`} className="h-8 w-auto" />
            ) : (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-md px-3 py-1">
                <span className="text-white font-bold text-sm">LOGO</span>
              </div>
            )}
          </div>
          
          {/* Right side - Mobile Action Buttons */}
          <div className="flex items-center gap-2">
            {/* WhatsApp Button - Compact */}
            <a
              href={`https://wa.me/918500900100?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(projectTitle)}%20property.%20Can%20you%20provide%20more%20details%3F`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full hover:bg-green-500/30 transition-all duration-300"
              aria-label={`Chat on WhatsApp for ${projectTitle}`}
            >
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>

            {/* Phone Button - Compact */}
            <a href={`tel:+91${phoneNumber}`} aria-label={`Call +91${phoneNumber}`} rel="nofollow" className="flex items-center justify-center w-10 h-10 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full hover:bg-yellow-500/30 transition-all duration-300">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.55.57 1 1 0 011 1v3.61a1 1 0 01-.91 1A16 16 0 014 5.92 1 1 0 015 5h3.61a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.24 1.01l-2.32 2.23z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom Section - Below Image */}
      <div className="relative w-full bg-gray-900 px-4 py-6" style={{ contentVisibility: 'auto' }}>
        {/* Breadcrumbs kept for accessibility but hidden visually */}
        <nav className="sr-only" aria-label="Breadcrumb">
          <ol>
            <li>Home</li>
            <li>{location}</li>
            <li>{projectTitle}</li>
          </ol>
        </nav>

        {/* Title and Location */}
        <div className="text-center text-white mb-4">
          <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-2 max-w-3xl mx-auto">
            {projectTitle}
          </h1>
          <p className="text-sm font-medium text-gray-300">
            {location}
          </p>
        </div>

        {/* Info Bar */}
        <div className="border border-yellow-400/60 bg-black/80 backdrop-blur-lg rounded-xl shadow-2xl p-4 max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-3">
            {/* Land Area */}
            <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-yellow-400/10 transition-all duration-300">
              <div className="text-xs font-medium text-white/70 uppercase tracking-wider mb-1">
                LAND AREA
              </div>
              <div className="text-lg font-bold text-white">
                {bottomInfo.landArea}
              </div>
            </div>
            
            {/* Possession */}
            <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-yellow-400/10 transition-all duration-300">
              <div className="text-xs font-medium text-white/70 uppercase tracking-wider mb-1">
                {bottomInfo.possessionLabel}
              </div>
              <div className="text-lg font-bold text-white">
                {bottomInfo.possession}
              </div>
            </div>
            
            {/* About Project - Full Width */}
            <div className="col-span-2 text-center p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-yellow-400/10 transition-all duration-300">
              <div className="text-xs font-medium text-white/70 uppercase tracking-wider mb-1">
                ABOUT PROJECT
              </div>
              <div className="text-sm font-semibold text-white leading-tight">
                {bottomInfo.aboutProject}
              </div>
            </div>
            
            {/* Price - Full Width */}
            <div className="col-span-2 text-center p-3 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg border border-yellow-400/30 hover:from-yellow-500/30 hover:to-yellow-600/30 transition-all duration-300">
              <div className="text-xs font-medium text-white/70 uppercase tracking-wider mb-1">
                STARTING FROM
              </div>
              <div className="text-xl font-bold text-yellow-400">
                {bottomInfo.price}
              </div>
            </div>
          </div>

          {/* CTA Button - Mobile */}
          <div className="mt-4">
            <button
              onClick={onShowCallback}
              className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Request Callback
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

ProjectHeroMobile.propTypes = {
  projectExists: PropTypes.bool,
  backgroundImage: PropTypes.string,
  projectTitle: PropTypes.string,
  location: PropTypes.string,
  phoneNumber: PropTypes.string,
  companyLogo: PropTypes.string,
  bottomInfo: PropTypes.shape({
    landArea: PropTypes.string,
    possession: PropTypes.string,
    possessionLabel: PropTypes.string,
    aboutProject: PropTypes.string,
    price: PropTypes.string
  }),
  onShowCallback: PropTypes.func
};

export default ProjectHeroMobile;
