import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
    <section className="py-8 md:py-10 lg:py-12 bg-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-tl from-amber-400 to-amber-500 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/3 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 md:mb-12"
        >
          <motion.div 
            className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-7 h-7 md:w-8 md:h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.div>
          <h2 className="text-amber-400 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-2">
            MASTER PLAN
          </h2>
          <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
            Master Plan of {projectName}
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full mx-auto"></div>
        </motion.div>

        {/* Desktop Master Plan Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group cursor-pointer"
          onClick={openModal}
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-700"></div>
          
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-1 border border-gray-700/50 backdrop-blur-sm">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
              <img
                src={masterPlanImage.url}
                alt={`Master Plan of ${projectName}`}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              
              {/* Desktop Zoom Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                <div className="text-center transform scale-95 group-hover:scale-100 transition-transform duration-700">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-full p-5 mb-4 shadow-2xl shadow-amber-500/50 transform group-hover:rotate-12 transition-transform duration-700">
                    <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                  <p className="text-white font-bold text-xl mb-2">View Full Size</p>
                  <p className="text-amber-400 text-sm font-medium">Click to explore details</p>
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
        <div className="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center z-50 p-4">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-white hover:text-amber-400 transition-colors z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full h-full max-w-7xl max-h-full flex items-center justify-center">
            <img
              src={masterPlanImage.url}
              alt={`Master Plan of ${projectName}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Scoped styles for this component */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default MasterPlanDesktop;
