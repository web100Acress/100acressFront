import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api_Service from '../../../../../../Redux/utils/Api_Service';
import { motion } from 'framer-motion';

const RelatedProjectsDesktop = ({ builderName = "", currentProjectUrl = "", onShowCallback = () => {} }) => {
  const [builderProjects, setBuilderProjects] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedNames, setExpandedNames] = useState(new Set());
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

  const projectsToShow = showAllProjects ? builderProjects : builderProjects.slice(0, 4);

  const handleProjectClick = (project) => {
    navigate(`/${project.project_url}/`);
  };

  const toggleProjectName = (projectIndex, e) => {
    e.stopPropagation(); // Prevent navigation when clicking on name
    const newExpandedNames = new Set(expandedNames);
    if (newExpandedNames.has(projectIndex)) {
      newExpandedNames.delete(projectIndex);
    } else {
      newExpandedNames.add(projectIndex);
    }
    setExpandedNames(newExpandedNames);
  };

  const isProjectNameExpanded = (projectIndex) => {
    return expandedNames.has(projectIndex);
  };

  return (
    <section className="py-8 md:py-10 lg:py-12  text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-tl from-amber-400 to-amber-500 rounded-full blur-3xl animate-float animation-delay-2000"></div>
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
          {/* <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-8 h-8 md:w-10 md:h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </motion.div> */}
          {/* <h2 className="text-amber-400 text-sm md:text-base font-semibold uppercase tracking-[0.2em] mb-2">
            RELATED PROJECTS
          </h2> */}
          <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-4 max-w-4xl mx-auto">
           Other Properties by {builderName}
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full mx-auto"></div>
        </motion.div>

        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-12"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          </motion.div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400">Unable to load related projects</p>
          </motion.div>
        ) : (
          <>
            {/* Desktop Projects Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
            >
              {projectsToShow.map((project, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="group cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    
                    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 backdrop-blur-sm overflow-hidden hover:border-amber-500/30 transition-all duration-300">
                      
                      {/* Project Image */}
                      <div className="aspect-[5/4] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                        {project.thumbnailImage?.url ? (
                          <img
                            src={project.thumbnailImage.url}
                            alt={project.projectName}
                            fetchpriority="high"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                          </div>
                        )}
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Project Details */}
                      <div className="p-3">
                        <h4 
                          className={`text-white font-bold text-sm mb-1 group-hover:text-amber-400 transition-colors duration-300 cursor-pointer ${
                            isProjectNameExpanded(index) ? '' : 'truncate'
                          }`}
                          onClick={(e) => toggleProjectName(index, e)}
                          title={project.projectName}
                        >
                          {project.projectName}
                        </h4>
                        
                        <div className="flex items-start space-x-1 mb-0">
                          <svg className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <p className="text-gray-400 text-xs truncate">
                            {project.projectAddress}, {project.city}
                          </p>
                        </div>

                        {/* Price Range */}
                        <div className="flex items-center space-x-1 mb-1">
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
                          className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold py-1.5 px-3 rounded-lg hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-amber-500/30 text-xs"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Empty state when no projects found */}
            {builderProjects.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-400 mt-8"
              >
                No related projects found for {builderName}.
              </motion.div>
            )}

            {/* Desktop View All Button */}
            {builderProjects.length > 4 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mt-8"
              >
                <button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold px-8 py-3 rounded-lg border-2 border-yellow-400 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform"
                >
                  <span>{showAllProjects ? 'Show Less' : 'View All Projects'}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${showAllProjects ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </motion.div>
            )}
          </>
        )}
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

export default RelatedProjectsDesktop;
