import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Api_Service from '../../../../../../Redux/utils/Api_Service';
import { motion } from 'framer-motion';
import './RelatedProjects.mobile.css';

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
          });
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
            }););
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
    <div className="related-projects-mobile">
        {/* Mobile Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="related-projects-mobile-header"
        >
          <h3 className="related-projects-mobile-title">
            Other Projects by {builderName}
          </h3>
          <div className="related-projects-mobile-accent-line"></div>
        </motion.div>

        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="related-projects-mobile-loading"
          >
            <div className="related-projects-mobile-spinner"></div>
          </motion.div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="related-projects-mobile-error"
          >
            <p className="related-projects-mobile-error-text">Unable to load related projects</p>
          </motion.div>
        ) : (
          <>
            {/* Mobile Projects Horizontal Scroll */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="related-projects-mobile-scroll-wrapper"
            >
              {/* Scrollable Container */}
              <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="related-projects-mobile-scroll"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="related-projects-mobile-scroll-inner">
                {builderProjects.map((project, index) => (
                  <div 
                    key={index}
                    className="related-projects-mobile-card"
                  >
                    <div 
                      className="related-projects-mobile-card-inner"
                      onClick={() => handleProjectClick(project)}
                    >
                      
                      {/* Project Image */}
                      <div className="related-projects-mobile-card-image">
                        {project.thumbnailImage?.url ? (
                          <img
                            src={project.thumbnailImage.url}
                            alt={project.projectName}
                            fetchpriority="high"
                            crossOrigin="anonymous"
                            className="related-projects-mobile-card-image-img"
                          />
                        ) : (
                          <div className="related-projects-mobile-card-placeholder">
                            <div className="related-projects-mobile-card-placeholder-icon">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                          </div>
                        )}
                        
                        {/* Overlay */}
                        <div className="related-projects-mobile-card-overlay"></div>
                      </div>

                      {/* Project Details */}
                      <div className="related-projects-mobile-card-content">
                        <h4 className="related-projects-mobile-card-title">
                          {project.projectName}
                        </h4>
                        
                        <div className="related-projects-mobile-card-location">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <p>{project.projectAddress}, {project.city}</p>
                        </div>

                        {/* Price Range */}
                        <div className="related-projects-mobile-card-price">
                          {!project?.minPrice && !project?.maxPrice ? (
                            <p className="related-projects-mobile-card-price-reveal">₹ Reveal Soon</p>
                          ) : (
                            <p className="related-projects-mobile-card-price-value">
                              <span className="related-projects-mobile-card-price-symbol">₹</span>
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
                          className="related-projects-mobile-card-btn"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              </div>

              {/* Empty state when no projects found */}
              {builderProjects.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="related-projects-mobile-empty"
                >
                  No related projects found for {builderName}.
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </div>
  );
};

export default RelatedProjectsMobile;
