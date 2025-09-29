import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StickyBrochureButton = ({ onDownloadClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.button
        onClick={onDownloadClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative bg-gradient-to-r from-amber-500 to-amber-600 text-white 
          px-6 py-4 rounded-l-full shadow-2xl font-bold text-sm uppercase 
          tracking-wider transition-all duration-300 ease-in-out
          hover:from-amber-600 hover:to-amber-700 hover:shadow-amber-500/25
          ${isHovered ? 'scale-105' : 'scale-100'}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Download Icon */}
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="inline-block"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </motion.div>
          
          <div className="flex flex-col items-start">
            <span className="text-xs opacity-90">Download</span>
            <span className="text-sm font-bold">Brochure</span>
          </div>
        </div>

        {/* Animated border effect */}
        <motion.div
          className="absolute inset-0 rounded-l-full border-2 border-amber-300"
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
            opacity: isHovered ? [0.5, 0.8, 0.5] : 0
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0
          }}
        />

        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-l-full bg-amber-400"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      {/* Tooltip */}
      <motion.div
        className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 bg-black text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : 10
        }}
        transition={{ duration: 0.2 }}
      >
        Get Project Brochure
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-black"></div>
      </motion.div>
    </motion.div>
  );
};

export default StickyBrochureButton;
