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
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="related-projects-desktop-card-glow"></div>
                    
                    <div className="related-projects-desktop-card-inner">
                      
                      {/* Project Image */}
                      <div className="related-projects-desktop-card-image">
                        {project.thumbnailImage?.url ? (
                          <img
                            src={project.thumbnailImage.url}
                            alt={project.projectName}
                            fetchpriority="high"
                            crossOrigin="anonymous"
                            className="related-projects-desktop-card-image-img"
                          />
                        ) : (
                          <div className="related-projects-desktop-card-placeholder">
                            <div className="related-projects-desktop-card-placeholder-icon">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Project Info */}
                      <div className="related-projects-desktop-card-content">
                        <h4 className="related-projects-desktop-card-title">
                           {project.projectName}
                         </h4>
                        <p className="related-projects-desktop-card-location">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                           </svg>
                           {project.projectAddress}, {project.city}
                         </p>
                        <div className="related-projects-desktop-card-price">
                          {!project?.minPrice && !project?.maxPrice ? (
                            <span className="related-projects-desktop-card-price-reveal">₹ Reveal Soon</span>
                          ) : (
                            <>
                              <span className="related-projects-desktop-card-price-label">Starting</span>
                              <span className="related-projects-desktop-card-price-value">
                                {project.minPrice < 1 ? (
                                  <span>{(project.minPrice * 100).toFixed(2)} L</span>
                                ) : (
                                  <span>{project.minPrice} Cr </span>
                                )}
                              </span>
                              <span className="related-projects-desktop-card-price-unit">- {project.maxPrice} Cr</span>
                            </>
                          )}
                        </div>

                        {/* View Details Button */}
                        <button 
                          onClick={() => handleProjectClick(project)}
                          className="related-projects-desktop-card-btn"
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
