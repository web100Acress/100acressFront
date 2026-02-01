import React from "react";
import { motion } from "framer-motion";
import RelatedProjects from "../Relatedproject/RelatedProjects.desktop";

const AboutBuilderDesktop = ({
  builderName = "",
  aboutDeveloper = "",
  projectViewDetails,
  pUrl,
  handleShowCallback,
}) => {
  // Don't render if no builder information is available
  if (!builderName && !aboutDeveloper) {
    return null;
  }

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-tl from-amber-400 to-amber-500 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/3 to-transparent"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 md:mb-12"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-8 h-8 md:w-10 md:h-10 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </motion.div>
          <h2 className="text-amber-400 text-sm md:text-base font-semibold uppercase tracking-[0.2em] mb-2">
            DEVELOPER
          </h2>
          <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-4xl mx-auto">
            About {builderName || "the Developer"}
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full mx-auto"></div>
        </motion.div>

        {/* Desktop Developer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-7xl mx-auto mt-6"
        >
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>

            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 md:p-10 lg:p-10 pt-8 pb-6 border border-gray-400/30">
              {/* Developer Description */}
              {aboutDeveloper && (
                <div className="prose prose-lg prose-invert max-w-none mb-2">
                  <div
                    className="text-gray-300 leading-relaxed text-lg md:text-xl"
                    dangerouslySetInnerHTML={{ __html: aboutDeveloper }}
                  />
                </div>
              )}
              <RelatedProjects
                builderName={builderName}
                currentProjectUrl={pUrl}
                onShowCallback={handleShowCallback}
              />
            </div>
          </div>
        </motion.div>

        {/* Related Projects Section */}

        {/* put here code for fetch related prpojects */}
      </div>

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

export default AboutBuilderDesktop;
