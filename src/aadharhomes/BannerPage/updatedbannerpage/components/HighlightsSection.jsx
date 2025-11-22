import React from 'react';

const HighlightsSection = ({ projectName, highlights, highlightImage, onShowCallback = () => {} }) => {
  const hasHighlights = highlights && Array.isArray(highlights) && highlights.length > 0;

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Luxury Dark Card Container */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-amber-900/30">
        
        {/* Dark Golden Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700"></div>
        
        <div className="grid grid-cols-1 gap-4 p-8 lg:p-12">
          
          {/* Top - Image */}
          <div className="relative">
            <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
              {highlightImage ? (
                <>
                  <img 
                    src={highlightImage} 
                    alt={`${projectName} Highlights`}
                    className="w-full h-auto max-h-full object-contain transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </>
              ) : (
                /* Fallback Placeholder */
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm">Project Image</p>
                  </div>
                </div>
              )}
              
              {/* Dark Golden Frame Effect */}
              <div className="absolute inset-0 rounded-xl ring-1 ring-amber-600/30 pointer-events-none"></div>
            </div>
          </div>

          {/* Bottom - Content */}
          <div className="relative">
            {/* Section Header */}
            <div className="mb-8">
              <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
                PROJECT HIGHLIGHTS
              </h2>
              <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-2">
                {projectName ? `${projectName} Features` : "Key Features & Amenities"}
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full"></div>
            </div>

            {hasHighlights ? (
              /* Dynamic Highlights Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    {/* Premium Check Icon */}
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-sm leading-snug group-hover:text-white transition-colors duration-200">
                      {item.highlight_Point || item}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              /* Fallback Content */
              <div className="mb-8">
                <p className="text-gray-400 text-base leading-relaxed mb-6">
                  Discover the exceptional features and amenities that make this project stand out. 
                  From premium finishes to world-class facilities, every detail has been carefully crafted.
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;