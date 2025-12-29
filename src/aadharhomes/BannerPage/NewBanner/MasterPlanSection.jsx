import React from 'react';
import '../../../styles/newbanner/master.css';

const MasterPlanSection = ({ projectName, imageUrl, isOpen, setIsOpen }) => {
  if (!projectName) projectName = '';
  return (
    <>
      <div className="nb-master-section">
        <div className="nb-master-inner">
          <div className="nb-master-wrap">
            <div className="nb-master-container">
              <div className="nb-section-header nb-master-header">
                <div className="nb-section-lines">
                  <div className="nb-section-line"></div>
                  <span className="nb-section-subtitle">Site Plan</span>
                  <div className="nb-section-line"></div>
                </div>
                <h4 className="nb-master-title">
                  Master Plan of {projectName}
                </h4>
              </div>
              <div className="nb-master-card">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={projectName}
                    className="nb-master-image"
                    fetchpriority="high"
                    onClick={() => setIsOpen && setIsOpen(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="nb-master-modal-overlay">
          <div className="nb-master-modal-box">
            <button
              onClick={() => setIsOpen && setIsOpen(false)}
              className="nb-master-modal-close"
              aria-label="Close"
            >
              <i className="fas fa-times nb-master-modal-closeicon"></i>
            </button>
            <div className="nb-master-modal-content">
              <img
                src={imageUrl}
                alt={`${projectName} Master Plan`}
                className="nb-master-modal-img"
                fetchpriority="high"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MasterPlanSection;
