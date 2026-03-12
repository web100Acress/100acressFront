import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './MasterPlan.mobile.css';

const MasterPlanMobile = ({ projectName = "", masterPlanImage = null }) => {
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
    <section className="master-plan-mobile" style={{ paddingTop: '120px', zIndex: 1, position: 'relative' }}>
      {/* Animated Background Elements */}
      <div className="master-plan-mobile-background">
        <div className="master-plan-mobile-background-overlay">
          <div className="master-plan-mobile-float-1"></div>
          <div className="master-plan-mobile-float-2"></div>
        </div>
        <div className="master-plan-mobile-gradient-overlay"></div>
      </div>

      <div className="master-plan-mobile-content">
        {/* Mobile Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="master-plan-mobile-header"
        >
          <motion.div 
            className="master-plan-mobile-header-icon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.div>
          <h2 className="master-plan-mobile-subtitle">
            MASTER PLAN
          </h2>
          <h3 className="master-plan-mobile-title">
            Master Plan of {projectName}
          </h3>
          <div className="master-plan-mobile-accent-line"></div>
        </motion.div>

        {/* Mobile Master Plan Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="master-plan-mobile-image-clickable"
          onClick={openModal}
        >
          <div className="relative group">
            <div className="master-plan-mobile-image-card">
              <img
                src={masterPlanImage.url}
                alt={`Master Plan of ${projectName}`}
                className="master-plan-mobile-image"
              />
              
              {/* Mobile Zoom Indicator */}
              <div className="master-plan-mobile-zoom-indicator">
                <div className="master-plan-mobile-zoom-badge">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Additional Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="master-plan-mobile-info"
        >
          <div className="master-plan-mobile-info-card">
            <div className="master-plan-mobile-info-row">
              <div className="master-plan-mobile-info-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="master-plan-mobile-info-title">Development Plan</h4>
                <p className="master-plan-mobile-info-text">
                  View the complete layout, amenities, and infrastructure planning for {projectName}. 
                  Tap the image to see the full-size master plan.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Full Screen Modal */}
      {isModalOpen && (
        <div className="master-plan-mobile-modal">
          <button
            onClick={closeModal}
            className="master-plan-mobile-modal-close"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="master-plan-mobile-modal-body">
            <img
              src={masterPlanImage.url}
              alt={`Master Plan of ${projectName}`}
              className="master-plan-mobile-modal-image"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default MasterPlanMobile;
