import React, { useMemo } from 'react';
import { motion } from "framer-motion";
import RelatedProjects from "../Relatedproject/RelatedProjects.desktop";
import "./AboutBuilder.desktop.css";

const AboutBuilderDesktop = ({
  builderName = "",
  aboutDeveloper = "",
  projectViewDetails,
  pUrl,
  handleShowCallback,
}) => {
  // Don't render if no builder information is available
  if (!builderName && !aboutDeveloper) {
    return null;
  }

  return (
    <section className="about-builder-desktop">
      {/* Animated Background Elements */}
      <div className="about-builder-desktop-background">
        <div className="about-builder-desktop-background-overlay">
          <div className="about-builder-desktop-float-element-1"></div>
          <div className="about-builder-desktop-float-element-2"></div>
        </div>
        <div className="about-builder-desktop-gradient-overlay"></div>
      </div>

      <div className="about-builder-desktop-content">
        {/* Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="about-builder-desktop-header"
        >
          <motion.div
            className="about-builder-desktop-header-icon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="about-builder-desktop-header-icon-svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </motion.div>
          <h2 className="about-builder-desktop-subtitle">
            DEVELOPER
          </h2>
          <h3 className="about-builder-desktop-title">
            About {builderName || "the Developer"}
          </h3>
          <div className="about-builder-desktop-accent-line"></div>
        </motion.div>

        {/* Desktop Developer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="about-builder-desktop-developer-content"
        >
          <div className="about-builder-desktop-developer-card">
            {/* Glow Effect */}
            <div className="about-builder-desktop-developer-glow"></div>

            <div className="about-builder-desktop-developer-card-content">
              {/* Developer Description */}
              {aboutDeveloper && (
                <div className="about-builder-desktop-developer-description">
                  <div
                    className="about-builder-desktop-developer-text"
                    dangerouslySetInnerHTML={{ __html: aboutDeveloper }}
                  />
                </div>
              )}
              <RelatedProjects
                builderName={builderName}
                currentProjectUrl={pUrl}
                onShowCallback={handleShowCallback}
              />
            </div>
          </div>
        </motion.div>

        {/* Related Projects Section */}

        {/* put here code for fetch related prpojects */}
      </div>
    </section>
  );
};

export default AboutBuilderDesktop;
