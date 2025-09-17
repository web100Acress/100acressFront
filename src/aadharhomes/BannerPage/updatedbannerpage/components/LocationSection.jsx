import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LocationSection = ({ 
  projectName = "",
  projectAddress = "",
  city = "",
  locationImage,
  connectivityPoints = [],
  businessPoints = [],
  educationPoints = [],
  entertainmentPoints = [],
  projectViewDetails = null,
  onShowCallback = () => {}
}) => {
  const [activeTab, setActiveTab] = useState('connectivity');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Extract phone number from projectViewDetails (same logic as ProjectHero)
  const phoneNumber = projectViewDetails?.mobileNumber || "+91 9810982010";
  
  // For verification: log the phone number we are receiving from admin
  useEffect(() => {
    if (phoneNumber) {
      console.log('LocationSection received phone number from admin:', phoneNumber);
    }
  }, [phoneNumber]);

  const hasConnectivity = (connectivityPoints && connectivityPoints.length > 0) ||
                       (businessPoints && businessPoints.length > 0) ||
                       (educationPoints && educationPoints.length > 0) ||
                       (entertainmentPoints && entertainmentPoints.length > 0);

  const IconConnectivity = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );

  const IconBusiness = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );

  const IconEducation = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  );

  const IconEntertainment = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4" />
    </svg>
  );

  const tabs = [
    { id: 'connectivity', icon: <IconConnectivity />, label: 'Connectivity', points: connectivityPoints, color: 'from-blue-500 to-blue-600' },
    { id: 'business', icon: <IconBusiness />, label: 'Business', points: businessPoints, color: 'from-emerald-500 to-emerald-600' },
    { id: 'education', icon: <IconEducation />, label: 'Education', points: educationPoints, color: 'from-purple-500 to-purple-600' },
    { id: 'entertainment', icon: <IconEntertainment />, label: 'Entertainment', points: entertainmentPoints, color: 'from-rose-500 to-rose-600' },
  ];

  const renderPoint = (point, index, color) => (
    <motion.div 
      key={index}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-start space-x-3 group"
    >
      <div className={`w-2 h-2 ${color.split(' ')[2]} rounded-full mt-2 flex-shrink-0 transition-transform duration-300 group-hover:scale-125`}></div>
      <p className="text-gray-300 text-sm md:text-base leading-relaxed transition-colors duration-300 group-hover:text-white clamp-3">
        {point}
      </p>
    </motion.div>
  );

  // Filter out tabs with no points
  const tabsWithPoints = tabs.filter(tab => tab.points && tab.points.length > 0);

  // Quick action handlers
  const handleCall = () => {
    console.log('Calling:', phoneNumber);
    window.location.href = `tel:+91${phoneNumber}`;
  };

  const handleEmail = () => {
    // eslint-disable-next-line no-console
    console.log("Opening contact form (Get in touch)");
    onShowCallback();
  };

  const handleShare = async () => {
    const shareData = {
      title: projectName || "Project",
      text: projectAddress ? `${projectName} — ${projectAddress}` : projectName,
      url: window?.location?.href || "",
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard");
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("Share cancelled or failed:", e);
    }
  };

  return (
    <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-blue-400 to-blue-500 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/3 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isMounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-10"
        >
          <motion.div 
            className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mb-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-7 h-7 md:w-8 md:h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </motion.div>
          <h2 className="text-amber-400 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-1">
            LOCATION & CONNECTIVITY
          </h2>
          <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 max-w-4xl mx-auto">
            Strategic Location with Unmatched Connectivity
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full mx-auto"></div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Location Map Card */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={isMounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative group h-full">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-700"></div>
              
              {/* Map Container */}
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-1 border border-gray-700/50 backdrop-blur-sm h-full overflow-hidden">
                {/* Map Image */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-gray-700/50 bg-gradient-to-br from-gray-800 to-gray-900">
                  {locationImage?.url ? (
                    <img 
                      src={locationImage.url} 
                      alt={`${projectName} Location`} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                        </div>
                        <p className="text-gray-400 font-medium">Interactive Location Map</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Map Overlay Controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-amber-500/30">
                        View on Map
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Location Info */}
                <div className="p-5 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white text-xl md:text-2xl font-bold mb-2">
                        {projectName || "Prime Location"}
                      </h4>
                      <p className="text-gray-300 text-sm md:text-base">
                        {projectAddress && `${projectAddress}`}
                        {city && `, ${city}`}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-800/50 text-amber-400 text-xs font-medium rounded-full border border-amber-500/30">
                          Well Connected
                        </span>
                        <span className="px-3 py-1 bg-gray-800/50 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">
                          Prime Location
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connectivity Points Grid */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={isMounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {hasConnectivity && (
              <div className="h-full">
                <div className="grid grid-cols-2 gap-4">
                  {tabsWithPoints.map((tab, index) => (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className={`bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-4 border border-gray-700/50 hover:border-${tab.color.split(' ')[2]}/30 transition-all duration-300`}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <div className={`w-8 h-8 bg-gradient-to-br ${tab.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          {tab.icon}
                        </div>
                      </div>
                      <div className="space-y-2 pr-1">
                        {tab.points.slice(0, 4).map((point, i) => (
                          <div key={i} className="flex items-center space-x-3 group">
                            <div className={`w-2 h-2 ${tab.color.split(' ')[2]} rounded-full flex-shrink-0`}></div>
                            <p className="text-sm md:text-base text-gray-200 leading-snug font-medium clamp-3">{point}</p>
                          </div>
                        ))}
                        {tab.points.length > 4 && (
                          <p className="text-xs text-gray-400 mt-1">+{tab.points.length - 4} more</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="mt-4 p-4 bg-gradient-to-br from-gray-900 to-gray-800/50 rounded-2xl border border-gray-700/50">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={handleCall} className="flex items-center justify-center space-x-1.5 px-2 py-1.5 bg-gray-800/50 hover:bg-gray-700/70 rounded-lg border border-gray-700/50 transition-colors duration-300 text-xs">
                      <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>Call</span>
                    </button>
                    <button onClick={handleEmail} className="flex items-center justify-center space-x-1.5 px-2 py-1.5 bg-gray-800/50 hover:bg-gray-700/70 rounded-lg border border-gray-700/50 transition-colors duration-300 text-xs">
                      <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Email</span>
                    </button>
                    <button onClick={onShowCallback} className="flex items-center justify-center space-x-1.5 px-2 py-1.5 bg-gray-800/50 hover:bg-gray-700/70 rounded-lg border border-gray-700/50 transition-colors duration-300 text-xs">
                      <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Directions</span>
                    </button>
                    <button onClick={handleShare} className="flex items-center justify-center space-x-1.5 px-2 py-1.5 bg-gray-800/50 hover:bg-gray-700/70 rounded-lg border border-gray-700/50 transition-colors duration-300 text-xs">
                      <svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Additional Info Section */}
        <motion.div 
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isMounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 p-6 rounded-2xl border border-gray-700/50 hover:border-amber-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">24/7 Accessibility</h4>
            <p className="text-gray-400 text-sm">Easy access to major highways and public transportation around the clock.</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Prime Location</h4>
            <p className="text-gray-400 text-sm">Strategically positioned near key business districts and lifestyle destinations.</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 p-6 rounded-2xl border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Secure Neighborhood</h4>
            <p className="text-gray-400 text-sm">Located in a safe and well-maintained community with 24/7 security.</p>
          </div>
        </motion.div>
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
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        /* Clamp to ~3 lines with ellipsis */
        .clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default LocationSection;
