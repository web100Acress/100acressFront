import React, { useState } from 'react';

const MasterPlan = ({ projectName = "", masterPlanImage = null }) => {
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
    <section className="py-12 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-tl from-amber-400 to-amber-500 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-amber-500/5 to-transparent"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
            MASTER PLAN
          </h2>
          <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-3 max-w-3xl mx-auto">
            Master Plan of {projectName}
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full mx-auto"></div>
        </div>

        {/* Master Plan Image Card */}
        <div className="max-w-5xl mx-auto">
          <div className="relative group cursor-pointer" onClick={openModal}>
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
              
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600/30">
                <img
                  src={masterPlanImage.url}
                  alt={`Master Plan of ${projectName}`}
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay with zoom icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-amber-500 rounded-full p-3">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Click to Expand Text */}
              <div className="mt-4 text-center">
                <p className="text-gray-400 text-sm font-medium">
                  Click to view full-size master plan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="max-w-3xl mx-auto mt-4">
            <div className="bg-gradient-to-r from-amber-600/10 to-amber-500/5 rounded-xl p-4 border border-amber-600/20">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h5 className="text-amber-400 font-semibold mb-2">Comprehensive Development Plan</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Explore the detailed master plan showcasing the complete layout, amenities distribution, 
                  green spaces, and infrastructure planning for {projectName}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
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
    </section>
  );
};

export default MasterPlan;
