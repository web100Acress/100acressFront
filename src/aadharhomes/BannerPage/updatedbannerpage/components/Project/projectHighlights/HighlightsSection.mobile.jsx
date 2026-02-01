import React from 'react';

const HighlightsSectionMobile = ({ projectName, highlights, highlightImage, onShowCallback = () => {} }) => {
  const hasHighlights = highlights && Array.isArray(highlights) && highlights.length > 0;

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-1 pb-4">
      {/* Mobile Section Title */}
      <div className="text-center mb-4">
        <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-3 max-w-3xl mx-auto">
          PROJECT HIGHLIGHTS
        </h2>
      </div>

      {/* Mobile-Optimized Card Container */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-[0_15px_40px_rgba(0,0,0,0.4)] border border-amber-900/30">
        {/* Mobile accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700"></div>
        
        <div className="p-4 sm:p-6">
          
          {/* Mobile Image First */}
          <div className="relative mb-6">
            <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
              {highlightImage ? (
                <>
                  <img 
                    src={highlightImage} 
                    alt={`${projectName} Highlights`}
                    className="w-full h-[200px] sm:h-[240px] object-cover transition-transform duration-700 ease-out"
                  />
                  {/* Mobile overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </>
              ) : (
                /* Mobile fallback placeholder */
                <div className="flex items-center justify-center h-[200px] sm:h-[240px]">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm">Project Image</p>
                  </div>
                </div>
              )}
              
              {/* Mobile frame effect */}
              <div className="absolute inset-0 rounded-lg ring-1 ring-amber-600/30 pointer-events-none"></div>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="relative">
            {/* Mobile section header */}
            <div className="mb-4">
              <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-3 max-w-3xl mx-auto">
                {projectName ? `${projectName} Features` : "Key Features & Amenities"}
              </h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full"></div>
            </div>

            {hasHighlights ? (
              /* Mobile highlights grid */
              <div className="grid grid-cols-1 gap-2 mb-4">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    {/* Mobile check icon */}
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-white font-semibold text-base md:text-lg pr-3 leading-snug">
                      {item.highlight_Point || item}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              /* Mobile fallback content */
              <div className="mb-6">
                <p className="text-gray-400 text-sm leading-relaxed">
                  Discover the exceptional features and amenities that make this project stand out. 
                  From premium finishes to world-class facilities, every detail has been carefully crafted.
                </p>
              </div>
            )}

            {/* Mobile CTA Button */}
            <button 
              onClick={onShowCallback}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Explore Features
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSectionMobile;
