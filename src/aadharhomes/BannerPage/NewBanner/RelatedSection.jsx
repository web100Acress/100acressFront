import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/newbanner/related.css';
import { ArrowIcon, ScrollIcon, ShareFrameIcon } from '../../../Assets/icons';

const RelatedSection = ({ builderName, projectsToShow, builderProjectLength, showAllProjects, setShowAllProjects, handleShare, projectName }) => {
  return (
    <div className="nb-related-section">
      <div className="nb-related-outer">
        <div className="nb-related-wrapper">
          <div className="nb-related-inner">

            <div className="nb-related-col">
              <div className="nb-related-container">
                <div className="nb-section-header nb-related-header">
                  <div className="nb-section-lines">
                    <div className="nb-section-line"></div>
                    <span className="nb-section-subtitle">Others</span>
                    <div className="nb-section-line"></div>
                  </div>
                  <h4 className="nb-related-title">Properties by {builderName}</h4>
                </div>

                <section className="nb-related-grid-section">
                  <div className="nb-related-grid-wrap">
                    <div className="nb-related-grid">
                      {projectsToShow.map((project, idx) => (
                        <div key={idx} className="nb-related-card">
                          <span className="nb-related-image-wrap">
                            <Link to={`/${project.project_url}/`} target="blank">
                              <img
                                className="nb-related-image"
                                src={project.frontImage && project.frontImage.url}
                                alt={projectName}
                              />
                            </Link>
                            <div className="nb-related-share" onClick={() => handleShare(project)}>
                              <ShareFrameIcon />
                            </div>
                          </span>

                          <div className="nb-related-body">
                            <div className="nb-related-meta">
                              <div className="nb-related-texts">
                                <h5 className="nb-related-name">{project.projectName}</h5>
                                <h5 className="nb-related-location">{project.city}, {project.state}</h5>
                                {!project?.minPrice && !project?.maxPrice ? (
                                  <span className="nb-related-price nb-related-price-soon">₹ Reveal Soon</span>
                                ) : (
                                  <span className="nb-related-price">
                                    <span className="nb-related-ruppee">₹</span>
                                    {project.minPrice < 1 ? (
                                      <span>{(project.minPrice * 100).toFixed(2)} L</span>
                                    ) : (
                                      <span>{project.minPrice} Cr </span>
                                    )}
                                    - {project.maxPrice} Cr
                                  </span>
                                )}
                              </div>

                              <span className="nb-related-cta">
                                <Link to={`/${project.project_url}/`} target="blank">
                                  <ArrowIcon />
                                </Link>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {builderProjectLength > 4 && (
                      <div className="nb-related-more-wrap">
                        <button
                          onClick={() => setShowAllProjects((prev) => !prev)}
                          className="nb-related-more-btn"
                        >
                          {showAllProjects ? 'View Less' : 'View More'}
                          <span className='nb-related-more-icon'>
                            <ScrollIcon />
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedSection;
