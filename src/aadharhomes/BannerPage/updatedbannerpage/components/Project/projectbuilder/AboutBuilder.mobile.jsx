import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RelatedProjects from '../Relatedproject/RelatedProjects.mobile';

const AboutBuilderMobile = ({ builderName = "", aboutDeveloper = "", currentProjectUrl = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to strip HTML tags for word counting
  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Get plain text and truncate to 40 words
  const getTruncatedContent = (html, wordLimit = 40) => {
    const plainText = stripHtml(html);
    const words = plainText.trim().split(/\s+/);
    if (words.length <= wordLimit) return html;
    const truncatedText = words.slice(0, wordLimit).join(' ') + '...';
    return truncatedText;
  };

  const plainText = stripHtml(aboutDeveloper);
  const wordCount = plainText.trim().split(/\s+/).filter(w => w.length > 0).length;
  const shouldTruncate = wordCount > 40;
  const displayContent = isExpanded || !shouldTruncate 
    ? aboutDeveloper 
    : getTruncatedContent(aboutDeveloper, 40);
  // Don't render if no builder information is available
  if (!builderName && !aboutDeveloper) {
    return null;
  }

  return (
    <section className="relative py-4 md:py-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-gradient-to-tl from-amber-400 to-amber-500 rounded-full blur-2xl animate-float animation-delay-2000"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/3 to-transparent"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">  
        {/* Mobile Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8"
        >
          <motion.div 
            className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mb-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </motion.div>
          <h2 className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
            DEVELOPER
          </h2>
          <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-3 max-w-3xl mx-auto">
            About {builderName || "the Developer"}
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full mx-auto"></div>
        </motion.div>

        {/* Mobile Developer Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto mt-6"
        >
          <div className="relative group">
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-2 md:p-6 border border-gray-700/50">
              
              {/* Developer Description */}
              {aboutDeveloper && (
                <div className="prose prose-sm prose-invert max-w-none mb-2">
                  <div 
                    className="text-white font-semibold text-base md:text-lg leading-snug"
                    dangerouslySetInnerHTML={{ __html: displayContent }}
                  />
                  {shouldTruncate && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="mt-2 text-amber-400 font-semibold text-sm hover:text-amber-300 transition-colors duration-300 flex items-center gap-1"
                    >
                      {isExpanded ? 'View Less' : 'View More'}
                      <svg 
                        className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
              )}

              {/* Mobile Developer Highlights */}
           
              {/* Mobile Other Projects Section - Inside About Box */}
              <div className="mt-2 pt-2 border-gray-700/50">
                <RelatedProjects 
                  builderName={builderName} 
                  currentProjectUrl={currentProjectUrl}
                />
              </div>
            </div>
          </div>
        </motion.div>

      </div>

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

export default AboutBuilderMobile;
