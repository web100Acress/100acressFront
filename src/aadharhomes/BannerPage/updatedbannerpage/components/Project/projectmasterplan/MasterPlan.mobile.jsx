import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
    <section className="relative py-6 md:py-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-gradient-to-tl from-amber-400 to-amber-500 rounded-full blur-2xl animate-float animation-delay-2000"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/3 to-transparent"></div>
      </div>

      <div className="relative z-10">
        {/* Mobile Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8 px-4 sm:px-6 lg:px-8"
        >
          <motion.div 
            className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mb-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.div>
          <h2 className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
            MASTER PLAN
          </h2>
          <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-3 max-w-3xl mx-auto">
            Master Plan of {projectName}
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full mx-auto"></div>
        </motion.div>

        {/* Mobile Master Plan Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto cursor-pointer"
          onClick={openModal}
        >
          <div className="relative group">
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-1 border border-gray-700/50">
              <img
                src={masterPlanImage.url}
                alt={`Master Plan of ${projectName}`}
                className="w-full h-auto object-contain transition-all duration-300 group-hover:opacity-90 rounded-lg"
              />
              
              {/* Mobile Zoom Indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 rounded-lg">
                <div className="bg-amber-500 rounded-full p-2">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className="max-w-3xl mx-auto mt-6 px-4 sm:px-6 lg:px-8"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-amber-400 font-semibold text-sm mb-2">Development Plan</h4>
                <p className="text-white font-semibold text-base md:text-lg leading-snug">
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
        <div className="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center z-50 p-4">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default MasterPlanMobile;
