import React from 'react';
import { format } from 'date-fns';
import { getPossessionInfo } from '../../../Utils/possessionUtils';
import '../../../styles/newbanner/AboutSection.css';
import { AcresIcon, CalenderIcon, PriceIcon, TowerIcon } from '../../../Assets/icons';

const AboutSection = ({
  projectViewDetails,
  nextSectionRef,
  nextY,
  aboutImageRef,
  aboutTextRef,
  description,
  showViewMoreBtn,
  setIsAboutModalOpen,
  formatDate,
}) => {
  return (
    <div ref={nextSectionRef} className="nb-about-section" style={{ transform: `translateY(${nextY}px)`, transition: 'transform 120ms ease-in-out' }}>
      <div className="nb-section-header">
        <div className="nb-section-lines">
          <div className="nb-section-line"></div>
          <span className="nb-section-subtitle">About Project</span>
          <div className="nb-section-line"></div>
        </div>
        <h2 className="nb-section-title">
          {projectViewDetails.projectName}
          <div className="nb-section-underline"></div>
        </h2>
      </div>

      <div className="nb-about-grid">
        <div className="nb-about-left">
          {projectViewDetails?.projectGallery?.[0]?.url && (
            <div ref={aboutImageRef} className="nb-about-image-card">
              <img
                src={projectViewDetails.projectGallery[0].url}
                alt={projectViewDetails.projectName}
                className="nb-about-image"
                style={{ minHeight: '400px', animation: 'kenBurnsSlow 18s ease-in-out infinite alternate', transformOrigin: 'center center', willChange: 'transform' }}
              />
              <div className="nb-about-image-overlay"></div>
              <div className="nb-badge">
                <span>Premium Project</span>
              </div>
              <button
                onClick={() => {
                  const url = projectViewDetails?.projectBrochure?.url;
                  if (url) window.open(url, '_blank');
                }}
                className="nb-brochure-btn"
              >
                <i className="fas fa-download"></i>
                <span>Download Brochure</span>
              </button>
            </div>
          )}
        </div>

        <div className="nb-stats-grid">
          <div className="nb-stats-card">
            <div className="nb-stats-icon-wrap">
              <AcresIcon className="nb-stats-icon" />
            </div>
            <span className="nb-stats-value">{projectViewDetails.totalLandArea || 'N/A'} Acres</span>
            <span className="nb-stats-label">Land Area</span>
          </div>

          <div className="nb-stats-card">
            <div className="nb-stats-icon-wrap">
              <TowerIcon className="nb-stats-icon" />
            </div>
            <span className="nb-stats-value">{getPossessionInfo(projectViewDetails).value || 'N/A'}</span>
            <span className="nb-stats-label">{getPossessionInfo(projectViewDetails).label}</span>
          </div>

          <div className="nb-stats-card">
            <div className="nb-stats-icon-wrap">
              <CalenderIcon className="nb-stats-icon" />
            </div>
            <span className="nb-stats-value">
              {console.log('AboutSection - Project Type:', projectViewDetails?.type, 'Tower Number:', projectViewDetails?.towerNumber)}
              {(projectViewDetails.type === 'Residential Flats' || projectViewDetails.type === 'Senior Living') && projectViewDetails.towerNumber ? `${projectViewDetails.towerNumber} Tower` : ''}
              {projectViewDetails.totalUnit ? ` - ${projectViewDetails.totalUnit} Unit` : 'N/A'}
            </span>
            <span className="nb-stats-label">Units</span>
          </div>

          <div className="nb-stats-card">
            <div className="nb-stats-icon-wrap">
              <PriceIcon className="nb-stats-icon" />
            </div>
            {!projectViewDetails?.minPrice || !projectViewDetails?.maxPrice ? (
              <span className="nb-stats-value">Call For Price</span>
            ) : (
              <span className="nb-stats-value">
                {projectViewDetails.minPrice < 1 ? (
                  <>{projectViewDetails?.minPrice * 100}L - {projectViewDetails.maxPrice} Cr</>
                ) : (
                  <>{projectViewDetails.minPrice} - {projectViewDetails.maxPrice} Cr</>
                )}
              </span>
            )}
            <span className="nb-stats-label">Price</span>
          </div>
        </div>
      </div>

      <div className="nb-about-text">
        <div className="relative">
          <div ref={aboutTextRef} className="premium-content-text nb-about-prose">
            <div dangerouslySetInnerHTML={{ __html: projectViewDetails.project_discripation || description || 'No description available' }} />
          </div>

          {showViewMoreBtn && (
            <div className="nb-viewmore-row nb-only-mobile">
              <button
                type="button"
                onClick={() => setIsAboutModalOpen(true)}
                className="nb-viewmore-btn"
                aria-label="View more about project"
              >
                <span>View More</span>
                <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
