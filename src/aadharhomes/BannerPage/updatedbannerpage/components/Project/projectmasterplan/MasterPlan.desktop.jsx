import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './MasterPlan.desktop.css';

const MasterPlanDesktop = ({ projectName = "", masterPlanImage = null }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (masterPlanImage?.url) {
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Don't render if no master plan image is available
  if (!masterPlanImage?.url) {
    return null;
  }

  return (
    <section className="master-plan-desktop" style={{ paddingTop: '120px', zIndex: 1, position: 'relative' }}>
      {/* Animated Background Elements */}
      <div className="master-plan-desktop-background">
        <div className="master-plan-desktop-background-overlay">
          <div className="master-plan-desktop-float-1"></div>
          <div className="master-plan-desktop-float-2"></div>
        </div>
        <div className="master-plan-desktop-gradient-overlay"></div>
      </div>

      <div className="master-plan-desktop-content">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="master-plan-desktop-header"
        >
          <motion.div 
            className="master-plan-desktop-header-icon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.div>
          <h2 className="master-plan-desktop-subtitle">
            MASTER PLAN
          </h2>
          <h3 className="master-plan-desktop-title">
            Master Plan of {projectName}
          </h3>
          <div className="master-plan-desktop-accent-line"></div>
        </motion.div>

        {/* Desktop Master Plan Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="master-plan-desktop-image-clickable"
          onClick={openModal}
        >
          {/* Glow Effect */}
          <div className="master-plan-desktop-image-glow"></div>
          
          <div className="master-plan-desktop-image-card">
            <div className="master-plan-desktop-image-frame">
              <img
                src={masterPlanImage.url}
                alt={`Master Plan of ${projectName}`}
                className="master-plan-desktop-image"
                crossOrigin="anonymous"
              />
              
              {/* Desktop Zoom Overlay */}
              <div className="master-plan-desktop-zoom-overlay">
                <div className="master-plan-desktop-zoom-inner">
                  <div className="master-plan-desktop-zoom-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                  <p className="master-plan-desktop-zoom-title">View Full Size</p>
                  <p className="master-plan-desktop-zoom-subtitle">Click to explore details</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Desktop Additional Info */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-8"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 rounded-2xl p-6 border border-gray-700/50 hover:border-amber-500/30 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-amber-400 font-semibold text-lg mb-2">Comprehensive Development Plan</h4>
                <p className="text-gray-300 text-base leading-relaxed">
                  Explore the detailed master plan showcasing the complete layout, amenities distribution, 
                  green spaces, and infrastructure planning for {projectName}. Click on the image to view 
                  the full-size master plan with enhanced clarity.
                </p>
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>

      {/* Desktop Full Screen Modal */}
      {isModalOpen && (
        <div className="master-plan-desktop-modal">
          <button
            onClick={closeModal}
            className="master-plan-desktop-modal-close"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="master-plan-desktop-modal-body">
            <img
              src={masterPlanImage.url}
              alt={`Master Plan of ${projectName}`}
              className="master-plan-desktop-modal-image"
              crossOrigin="anonymous"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default MasterPlanDesktop;
