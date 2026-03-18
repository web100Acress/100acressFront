import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './AboutSection.desktop.css';

const AboutSectionDesktop = ({ projectName, description, imageUrl, onShowCallback = () => {}, handleBrochureDownload }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" role="region" aria-labelledby="about-heading" className="about-section-desktop">
      {/* Luxury Rounded Card Container with Circular Accents */}
      <div className="about-section-card">
        {/* Circular golden ambient accents */}
        <div className="about-section-accent-top" />
        <div className="about-section-accent-bottom" />

        <div ref={sectionRef} className="about-section-content">
        {/* Left Column - Text Content */}
        <div className="about-section-text-column">
          {/* Geometric Diamond Pattern Background */}
          <div className="about-section-diamond-pattern"><div className="diamond-pattern"></div></div>
          {/* Soft Spotlight Effect */}
          <div className="about-section-spotlight" />
          {/* Thin golden diagonal borders */}
          <div className="about-section-diagonal-border-top" />
          <div className="about-section-diagonal-border-bottom" />
          
          {/* Content */}
          <div className="about-section-text-content">
            <h2 id="about-heading" className="about-section-title">
              About {projectName || 'Project'}
            </h2>
            
            <h3 
              ref={titleRef}
              className="about-section-heading"
            >
              {projectName || "Modern Living"}
            </h3>
            {/* Animated gold underline */}
            <div className="about-section-underline" />
            
            <div className={`about-section-description ${expanded ? '' : 'collapsed'}`}>
              {description ? (
                <div dangerouslySetInnerHTML={{ __html: description }} />
              ) : (
                <div>
                  <p className="mb-4">
                    This is a placeholder description for the project overview. Replace this text later with a concise summary covering the project's concept, lifestyle, and key value propositions.
                  </p>
                </div>
              )}
            </div>

            {/* Read More/Read Less Button */}
            {(description || true) && (
              <button 
                onClick={() => setExpanded(!expanded)}
                className="about-section-read-more-btn"
              >
                {expanded ? 'Read Less' : 'Read More'}
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className={`about-section-read-more-icon ${expanded ? 'expanded' : ''}`}
                >
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>
            )}

            {/* Buttons Row - Download Brochure and Get Details */}
            <div className="about-section-buttons-row">
              <button
                onClick={handleBrochureDownload}
                className="about-section-download-btn"
              >
                {/* Subtle glow effect */}
                <div className="about-section-download-btn-glow"></div>

                {/* Button content */}
                <div className="about-section-download-btn-content">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="about-section-download-btn-icon"
                  >
                    <polyline points="6,9 12,15 18,9"/>
                  </svg>
                  <span className="about-section-download-btn-text">Download Brochure</span>
                </div>
              </button>
              
              {/* <button 
                onClick={onShowCallback}
                className="about-section-get-details"
                aria-label={`Get details for ${projectName || 'this project'}`}
              >
                Get Details
              </button> */}
            </div>
          </div>
        </div>
        
        {/* Right Column - Image with Luxury Framing */}
        <div className="about-section-image-column">
          <div className="about-section-image-container">
            {/* Rounded container with golden ring and soft glow */}
            <div className="about-section-image-frame">
              <img 
                fetchpriority="high"
                src={imageUrl} 
                alt={`${projectName || 'Project'} overview`} 
                loading="lazy"
                decoding="async"
                crossOrigin="anonymous"
                performance="high"
                className="about-section-image"
              />
              {/* Subtle golden gradient overlay for luxury tint */}
              <div className="about-section-image-overlay"></div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionDesktop;
