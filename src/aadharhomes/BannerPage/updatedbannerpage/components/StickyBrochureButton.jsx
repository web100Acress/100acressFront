import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StickyBrochureButton = ({ onDownloadClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
        <motion.div
          className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
      <motion.button
        onClick={onDownloadClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 text-white 
          px-6 py-3 rounded-full shadow-lg font-medium text-sm
          transition-all duration-300 ease-in-out
          hover:shadow-xl hover:shadow-amber-500/30
          ${isHovered ? 'scale-105' : 'scale-100'}
        `}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(245, 158, 11, 0.4)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Clean Download Icon and Text */}
        <div className="flex items-center space-x-2">
          <motion.div
            animate={{ y: isHovered ? -1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </motion.div>
          
          <span className="text-white font-semibold text-sm">Brochure</span>
        </div>

        {/* Subtle glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0"
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
