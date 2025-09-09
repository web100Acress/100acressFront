import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api_Service from '../../../../Redux/utils/Api_Service';
import FooterForm from './FooterForm';


const RelatedProjects = ({ builderName = "", currentProjectUrl = "", onShowCallback = () => {} }) => {
  const [builderProjects, setBuilderProjects] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { getProjectbyBuilder } = Api_Service();

  useEffect(() => {
    const fetchBuilderProjects = async () => {
      if (!builderName) return;
      
      setLoading(true);
      try {
        const fetchedResult = await getProjectbyBuilder(builderName, 0);
        let list = Array.isArray(fetchedResult) ? fetchedResult : [];
        
        // Filter out current project
        list = list.filter(project => project.pUrl !== currentProjectUrl);
        
        setBuilderProjects(list);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuilderProjects();
  }, [builderName, currentProjectUrl, getProjectbyBuilder]);

  const projectsToShow = showAllProjects ? builderProjects : builderProjects.slice(0, 4);

  const handleProjectClick = (project) => {
    navigate(`/${project.project_url}/`);
  };

  // Don't render if no builder name or no projects
  if (!builderName || builderProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-tl from-amber-400 to-amber-500 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-amber-500/5 to-transparent"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-[0.2em] mb-2">
            RELATED PROJECTS
          </h2>
          <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-4 max-w-3xl mx-auto">
            Properties by {builderName}
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full mx-auto"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Unable to load related projects</p>
          </div>
        ) : (
          <>
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {projectsToShow.map((project, index) => (
                <div 
                  key={index}
                  className="group cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-amber-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 backdrop-blur-sm overflow-hidden">
                      
                      {/* Project Image */}
                      <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                        {project.frontImage?.url ? (
                          <img
                            src={project.frontImage.url}
                            alt={project.projectName}
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
                      <div className="p-6">
                        <h4 className="text-white font-bold text-lg mb-2 group-hover:text-amber-400 transition-colors duration-300">
                          {project.projectName}
                        </h4>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <p className="text-gray-400 text-sm">
                            {project.projectAddress}, {project.city}
                          </p>
                        </div>

                        {/* Price Range */}
                        <div className="flex items-center space-x-2 mb-4">
                          
                          {!project?.minPrice && !project?.maxPrice ? (
                            <p className="text-emerald-400 font-semibold text-sm">₹ Reveal Soon</p>
                          ) : (
                            <p className="text-emerald-400 font-semibold text-sm">
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
                          className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold py-2 px-4 rounded-lg hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform group-hover:scale-105"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button */}
            {builderProjects.length > 4 && (
              <div className="text-center">
                <button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold px-8 py-3 rounded-lg hover:from-amber-500 hover:to-amber-400 transition-all duration-300"
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
              </div>
            )}
          </>
        )}

        {/* Additional Info */}
        {/* <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-gradient-to-r from-amber-600/10 to-amber-500/5 rounded-xl p-6 border border-amber-600/20">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h5 className="text-amber-400 font-semibold mb-2">Explore More Projects</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Discover other premium projects by {builderName}, each designed with the same commitment 
                  to quality, innovation, and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <FooterForm builderName={builderName} />
    </section>
  );
};

export default RelatedProjects;
