import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './StickyBrochureButton.css';

const StickyBrochureButton = ({ onDownloadClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
        <motion.div
          className="sticky-brochure-btn"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
      <motion.button
        onClick={onDownloadClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`sticky-brochure-btn-inner ${isHovered ? 'scale-105' : 'scale-100'}`}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(245, 158, 11, 0.4)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Clean Download Icon and Text */}
        <div className="sticky-brochure-btn-content">
          <motion.div
            animate={{ y: isHovered ? -1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="sticky-brochure-btn-icon">
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </div>
          </motion.div>
          
          <span className="sticky-brochure-btn-text">Brochure</span>
        </div>

        {/* Subtle glow effect on hover */}
        <motion.div
          className="sticky-brochure-btn-glow"
          animate={{
            opacity: isHovered ? 0.2 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </motion.div>
  );
};

export default StickyBrochureButton;
