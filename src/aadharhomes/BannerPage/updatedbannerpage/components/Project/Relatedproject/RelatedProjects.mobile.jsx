import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Api_Service from '../../../../../../Redux/utils/Api_Service';
import { motion } from 'framer-motion';

const RelatedProjectsMobile = ({ builderName = "", currentProjectUrl = "", onShowCallback = () => {} }) => {
  const [builderProjects, setBuilderProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const autoScrollRef = useRef(null);
  const navigate = useNavigate();
  const { getProjectbyBuilder, getPropertyOrder } = Api_Service();

  useEffect(() => {
    const fetchBuilderProjects = async () => {
      if (!builderName) return;
      
      setLoading(true);
      try {
        const fetchedResult = await getProjectbyBuilder(builderName, 0);
        let list = Array.isArray(fetchedResult) ? fetchedResult : [];
        // Filter out current project
        list = list.filter(project => project.pUrl !== currentProjectUrl);

        // Try to apply saved Property Order
        try {
          const orderDoc = await getPropertyOrder(builderName);
          const ids = Array.isArray(orderDoc?.customOrder) ? orderDoc.customOrder : [];
          if (ids.length > 0) {
            const byId = new Map(list.map(p => [String(p._id || p.id), p]));
            const idsStr = ids.map(String);
            const ordered = [
              ...idsStr.filter(id => byId.has(id)).map(id => byId.get(id)),
              ...list.filter(p => !idsStr.includes(String(p._id || p.id)))
            ];
            list = ordered;
          }
        } catch (_) {}

        setBuilderProjects(list);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuilderProjects();
  }, [builderName, currentProjectUrl, getProjectbyBuilder]);

  // Debug log to help trace why section may not show
  console.debug('RelatedProjects:', { builderName, currentProjectUrl, count: builderProjects.length });

  // Auto-scroll functionality
  useEffect(() => {
    if (builderProjects.length <= 1) return;
    
    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = (prev + 1) % builderProjects.length;
          if (scrollContainerRef.current) {
            const cardWidth = scrollContainerRef.current.offsetWidth * 0.85;
            scrollContainerRef.current.scrollTo({
              left: nextIndex * cardWidth,
              behavior: 'smooth'
            });
          }
          return nextIndex;
        });
      }, 3000); // Auto-scroll every 3 seconds
    };

    startAutoScroll();

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [builderProjects.length]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = scrollContainerRef.current.offsetWidth * 0.85;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(Math.min(newIndex, builderProjects.length - 1));
    }
  };

  const scrollToCard = (index) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth * 0.85;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handleProjectClick = (project) => {
    navigate(`/${project.project_url}/`);
  };

  return (
    <div className="w-full">
        {/* Mobile Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-2 md:mb-4 mt-2"
        >
          <h3 className="text-white text-xl md:text-2xl font-bold leading-tight mb-3">
            Other Projects by {builderName}
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full mx-auto"></div>
        </motion.div>

        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-12"
          >
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
          </motion.div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-sm">Unable to load related projects</p>
          </motion.div>
        ) : (
          <>
            {/* Mobile Projects Horizontal Scroll */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 relative"
            >
              {/* Scrollable Container */}
              <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 gap-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {builderProjects.map((project, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 snap-start w-[85%] sm:w-[70%]"
                  >
                    <div 
                      className="group cursor-pointer"
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl border border-gray-700/50 backdrop-blur-sm overflow-hidden">
                        
                        {/* Project Image */}
                        <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                          {project.thumbnailImage?.url ? (
                            <img
                              src={project.thumbnailImage.url}
                              alt={project.projectName}
                              fetchpriority="high"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                              </div>
                            </div>
                          )}
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Project Details */}
                        <div className="p-4">
                          <h4 className="text-white font-bold text-base mb-2 group-hover:text-amber-400 transition-colors duration-300 truncate">
                            {project.projectName}
                          </h4>
                          
                          <div className="flex items-start space-x-2 mb-2">
                            <svg className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="text-gray-400 text-xs truncate">
                              {project.projectAddress}, {project.city}
                            </p>
                          </div>

                          {/* Price Range */}
                          <div className="flex items-center space-x-2 mb-3">
                            {!project?.minPrice && !project?.maxPrice ? (
                              <p className="text-yellow-400 font-bold text-sm">₹ Reveal Soon</p>
                            ) : (
                              <p className="text-yellow-400 font-bold text-sm">
                                <span className="mr-1">₹</span>
                                {project.minPrice < 1 ? (
                                  <span>{(project.minPrice * 100).toFixed(2)} L</span>
                                ) : (
                                  <span>{project.minPrice} Cr </span>
                                )}
                                - {project.maxPrice} Cr
                              </p>
                            )}
                          </div>

                          {/* View Details Button */}
                          <button 
                            onClick={() => handleProjectClick(project)}
                            className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold py-2 px-3 rounded-lg hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform group-hover:scale-105 text-sm"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Empty state when no projects found */}
            {builderProjects.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-400 mt-6"
              >
                No related projects found for {builderName}.
              </motion.div>
            )}
          </>
        )}
      </div>
  );
};

export default RelatedProjectsMobile;
