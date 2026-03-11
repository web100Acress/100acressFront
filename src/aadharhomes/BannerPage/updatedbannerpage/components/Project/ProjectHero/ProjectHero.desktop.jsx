import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './ProjectHero.desktop.css';

const ProjectHeroDesktop = ({
  projectExists = true,
  backgroundImage = null,
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
  // Only set background image if it exists
  const hasBackgroundImage = !!backgroundImage;

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
    <header role="banner" className="project-hero-desktop">
      {/* Structured data for search engines */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Background Image */}
      {hasBackgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt={`${projectTitle} in ${location}`}
            fetchpriority="high"
            loading="eager"
            width="1973"
            height="1100"
            className="project-hero-background-image"
          />
          <div className="project-hero-background-overlay" />
        </>
      )}
      
      {/* Top Bar - Glassy Navbar */}
      <div className="project-hero-navbar" aria-label="Project top navigation">
        <div className="project-hero-navbar-content">
          {/* Company Logo - Leftmost */}
          <div className="project-hero-logo-container">
            {companyLogo ? (
              <img src={companyLogo} alt={`${projectTitle} developer logo`} className="project-hero-logo-image" />
            ) : (
              <div className="project-hero-logo-placeholder">
                <span className="project-hero-logo-text">LOGO</span>
              </div>
            )}
          </div>
          
          {/* Right side container */}
          <div className="project-hero-navbar-actions">
            {/* WhatsApp Button - Visible on all screen sizes */}
            <a
              href={`https://wa.me/918500900100?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(projectTitle)}%20property.%20Can%20you%20provide%20more%20details%3F`}
              target="_blank"
              rel="noopener noreferrer"
              className="project-hero-whatsapp-button"
              aria-label={`Chat on WhatsApp for ${projectTitle}`}
            >
              <img
                src="/icons/social.webp"
                alt="WhatsApp"
                className="project-hero-whatsapp-icon"
              />
            </a>

            {/* Phone Number Button - Hidden on mobile, visible on tablet and desktop */}
            <a href={`tel:+91${phoneNumber}`} aria-label={`Call +91${phoneNumber}`} rel="nofollow" className="project-hero-phone-button-desktop">
              <div className="project-hero-phone-button-content">
                {/* Circular phone icon */}
                <div className="project-hero-phone-icon-container">
                  <svg className="project-hero-phone-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.55.57 1 1 0 011 1v3.61a1 1 0 01-.91 1A16 16 0 014 5.92 1 1 0 015 5h3.61a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.24 1.01l-2.32 2.23z"/>
                  </svg>
                </div>

                {/* Phone number text */}
                <span className="project-hero-phone-number">{phoneNumber}</span>
              </div>
            </a>

            {/* Mobile Phone Button - Golden circle with telephone icon only - Visible only on mobile */}
            <a href={`tel:+91${phoneNumber}`} aria-label={`Call +91${phoneNumber}`} rel="nofollow" className="project-hero-phone-button-mobile">
              <div className="project-hero-phone-button-mobile-content">
                {/* Telephone icon */}
                <img
                  src="/icons/telephone-call.webp"
                  alt="Call"
                  className="project-hero-phone-button-mobile-icon"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom Section with Title, Location and Info Bar */}
      <div className="project-hero-bottom-section">
        {/* Breadcrumbs kept for accessibility but hidden visually */}
        <nav className="project-hero-breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li>Home</li>
            <li>{location}</li>
            <li>{projectTitle}</li>
          </ol>
        </nav>
        {/* Title and Location positioned above info bar */}
        <div className="project-hero-title-location">
          <h1 className="project-hero-title">
            {projectTitle}
          </h1>
          <p className="project-hero-location">
            {location}
          </p>
        </div>
        <div className="project-hero-info-bar">
          <div className="project-hero-info-grid">
            {/* Land Area */}
            <div className="project-hero-info-item">
              <div className="project-hero-info-label">
                LAND AREA
              </div>
              <div className="project-hero-info-value">
                {bottomInfo.landArea}
              </div>
              {/* Gradient divider */}
              <div className="project-hero-info-divider"></div>
            </div>
            
            {/* Possession */}
            <div className="project-hero-info-item">
              <div className="project-hero-info-label">
                {bottomInfo.possessionLabel}
              </div>
              <div className="project-hero-info-value">
                {bottomInfo.possession}
              </div>
              {/* Gradient divider */}
              <div className="project-hero-info-divider"></div>
            </div>
            
            {/* About Project */}
            <div className="project-hero-info-item">
              <div className="project-hero-info-label">
                ABOUT PROJECT
              </div>
              <div className="project-hero-info-value about-project">
                {bottomInfo.aboutProject}
              </div>
              {/* Gradient divider */}
              <div className="project-hero-info-divider"></div>
            </div>
            
            {/* Price */}
            <div className="project-hero-info-item">
              <div className="project-hero-info-label">
                STARTING FROM
              </div>
              <div className="project-hero-info-value price">
                {bottomInfo.price}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

ProjectHeroDesktop.propTypes = {
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

export default ProjectHeroDesktop;
