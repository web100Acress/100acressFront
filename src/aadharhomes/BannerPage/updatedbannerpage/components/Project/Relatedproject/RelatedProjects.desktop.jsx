import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api_Service from '../../../../../../Redux/utils/Api_Service';
import { motion } from 'framer-motion';
import './RelatedProjects.desktop.css';

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
    <section className="related-projects-desktop">
      {/* Animated Background Elements */}
      <div className="related-projects-desktop-background">
        <div className="related-projects-desktop-background-overlay">
          <div className="related-projects-desktop-float-1"></div>
          <div className="related-projects-desktop-float-2"></div>
        </div>
        <div className="related-projects-desktop-gradient-overlay"></div>
      </div>

      <div className="related-projects-desktop-content">
        {/* Premium Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="related-projects-desktop-header"
        >
          <h3 className="related-projects-desktop-title">
           Other Projects by {builderName}
          </h3>
          <div className="related-projects-desktop-accent-line"></div>
        </motion.div>

        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="related-projects-desktop-loading"
          >
            <div className="related-projects-desktop-spinner"></div>
          </motion.div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="related-projects-desktop-error"
          >
            <p className="related-projects-desktop-error-text">Unable to load related projects</p>
          </motion.div>
        ) : (
          <>
            {/* Desktop Projects Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="related-projects-desktop-grid"
            >
              {projectsToShow.map((project, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="related-projects-desktop-card"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                    <div className="relative">
                      <div className="w-full h-28 lg:h-32">
                        <img
                          src={project.thumbnailImage?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400&auto=format&fit=crop'}
                          alt={project.projectName}
                          fetchpriority="high"
                          crossOrigin="anonymous"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    <div className="p-2">
                      <h4 className="font-bold text-sm text-white mb-0 line-clamp-1">
                        {project.projectName}
                      </h4>

                      <p className="text-xs text-gray-600 mb-1">
                        {project.type || 'Residential'}
                      </p>

                      <div className="flex items-start mb-1">
                        <svg className="w-4 h-4 text-gray-400 mt-0.5 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {project.projectAddress || `${project.city}, ${project.state}`}
                        </p>
                      </div>

                      <div className="bg-[#f5f5f5] rounded-lg py-0 px-0 mt-0 min-h-[24px] flex items-center">
                        <div className="flex justify-between items-center w-full">
                          <div className="text-center flex mt-0 items-center justify-center flex-1 flex-col">
                            <p className="text-xs text-[#222] mb-0 pt-2 font-bold">Launch Price</p>
                            <p className="font-bold text-[#006169] text-sm">
                              {!project?.minPrice && !project?.maxPrice ? (
                                <span>₹ Reveal Soon</span>
                              ) : (
                                <>
                                  <span className="text-xs">₹</span>
                                  {project.minPrice < 1 ? (
                                    <span>{(project.minPrice * 10000000).toLocaleString('en-IN')}</span>
                                  ) : (
                                    <span>{parseFloat(project.minPrice).toFixed(2)} Cr</span>
                                  )}
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-2 pb-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // WhatsApp functionality can be added here
                          console.log('WhatsApp clicked for:', project.projectName);
                        }}
                        className="w-full bg-[#e9f7f0] text-[#249f62] py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5 fill-[#249f62]" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.690" />
                        </svg>
                        WhatsApp
                      </button>
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
                className="related-projects-desktop-empty"
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
                className="related-projects-desktop-view-all"
              >
                <button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="related-projects-desktop-view-all-btn"
                >
                  <span>{showAllProjects ? 'Show Less' : 'View All Projects'}</span>
                  <svg 
                    className={`related-projects-desktop-view-all-icon ${showAllProjects ? 'rotate-180' : ''}`} 
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
    </section>
  );
};

export default RelatedProjectsDesktop;
