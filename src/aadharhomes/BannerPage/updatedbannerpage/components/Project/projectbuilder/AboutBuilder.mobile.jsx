import React from 'react';
import { motion } from 'framer-motion';

const AboutBuilderMobile = ({ builderName = "", aboutDeveloper = "" }) => {
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
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-4 md:p-6 border border-gray-700/50">
              
              {/* Developer Description */}
              {aboutDeveloper && (
                <div className="prose prose-sm prose-invert max-w-none mb-6">
                  <div 
                    className="text-white font-semibold text-base md:text-lg leading-snug"
                    dangerouslySetInnerHTML={{ __html: aboutDeveloper }}
                  />
                </div>
              )}

              {/* Mobile Developer Highlights */}
           
            </div>
          </div>
        </motion.div>

        {/* Mobile Trust Indicators */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-3xl mx-auto mt-6"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-amber-400 font-semibold text-sm mb-2">Trusted Developer</h4>
                <p className="text-gray-300 text-xs leading-relaxed">
                  {builderName} is a renowned real estate developer known for delivering premium 
                  residential and commercial projects with exceptional quality and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </motion.div> */}
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
