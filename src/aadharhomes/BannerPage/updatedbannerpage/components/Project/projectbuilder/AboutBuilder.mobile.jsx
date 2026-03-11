import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RelatedProjects from '../Relatedproject/RelatedProjects.mobile';
import './AboutBuilder.mobile.css';

const AboutBuilderMobile = ({ builderName = "", aboutDeveloper = "", currentProjectUrl = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to strip HTML tags for word counting
  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Get plain text and truncate to 40 words
  const getTruncatedContent = (html, wordLimit = 40) => {
    const plainText = stripHtml(html);
    const words = plainText.trim().split(/\s+/);
    if (words.length <= wordLimit) return html;
    const truncatedText = words.slice(0, wordLimit).join(' ') + '...';
    return truncatedText;
  };

  const plainText = stripHtml(aboutDeveloper);
  const wordCount = plainText.trim().split(/\s+/).filter(w => w.length > 0).length;
  const shouldTruncate = wordCount > 40;
  const displayContent = isExpanded || !shouldTruncate 
    ? aboutDeveloper 
    : getTruncatedContent(aboutDeveloper, 40);
  // Don't render if no builder information is available
  if (!builderName && !aboutDeveloper) {
    return null;
  }

  return (
    <section className="about-builder-mobile">
      {/* Animated Background Elements */}
      <div className="about-builder-mobile-background">
        <div className="about-builder-mobile-background-overlay">
          <div className="about-builder-mobile-float-element-1"></div>
          <div className="about-builder-mobile-float-element-2"></div>
        </div>
        <div className="about-builder-mobile-gradient-overlay"></div>
      </div>

      <div className="about-builder-mobile-content">  
        {/* Mobile Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="about-builder-mobile-header"
        >
          <motion.div 
            className="about-builder-mobile-header-icon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="about-builder-mobile-header-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </motion.div>
          <h2 className="about-builder-mobile-subtitle">
            DEVELOPER
          </h2>
          <h3 className="about-builder-mobile-title">
            About {builderName || "the Developer"}
          </h3>
          <div className="about-builder-mobile-accent-line"></div>
        </motion.div>

        {/* Mobile Developer Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="about-builder-mobile-developer-content"
        >
          <div className="about-builder-mobile-developer-card">
            <div className="about-builder-mobile-developer-card-content">
              
              {/* Developer Description */}
              {aboutDeveloper && (
                <div className="about-builder-mobile-developer-description">
                  <div 
                    className="about-builder-mobile-developer-text"
                    dangerouslySetInnerHTML={{ __html: displayContent }}
                  />
                  {shouldTruncate && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="about-builder-mobile-expand-button"
                    >
                      {isExpanded ? 'View Less' : 'View More'}
                      <svg 
                        className={`about-builder-mobile-expand-icon ${isExpanded ? 'rotated' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
              )}

              {/* Mobile Other Projects Section - Inside About Box */}
              <div className="about-builder-mobile-other-projects-section">
                <RelatedProjects 
                  builderName={builderName} 
                  currentProjectUrl={currentProjectUrl}
                />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutBuilderMobile;
