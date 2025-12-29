import React from 'react';
import '../../../styles/newbanner/gallery.css';
import { BackwardIcon, ForwardIcon } from'../../../Assets/icons';

const GallerySection = ({
  projectName,
  projectGallery = [],
  galleryCurrentIndex = 0,
  setGalleryCurrentIndex,
  openModalGallery,
  closeModalGallery,
  isModalOpenGallery,
  modalImageGallery
}) => {
  const hasImages = Array.isArray(projectGallery) && projectGallery.length > 0;

  return (
    <div className="nb-gallery-section">
      <div className="nb-gallery-header">
        <div className="nb-gallery-eyebrow">
          <div className="nb-gallery-line" />
          <span className="nb-gallery-eyebrow-text">Gallery</span>
          <div className="nb-gallery-line" />
        </div>
        <h2 className="nb-gallery-title">
          {projectName}
          <span className="nb-gallery-title-accent">Images</span>
        </h2>
        <div className="nb-gallery-underline" />
      </div>

      {/* Mobile Carousel View */}
      <div className="nb-show-mobile">
        {hasImages ? (
          <div className="nb-gallery-cardwrap">
            <button
              onClick={() => {
                const container = document.querySelector('.nb-gallery-scroll');
                if (container) {
                  const prevIndex = galleryCurrentIndex === 0
                    ? projectGallery.length - 1
                    : galleryCurrentIndex - 1;
                  container.scrollTo({ left: prevIndex * container.offsetWidth, behavior: 'smooth' });
                  setGalleryCurrentIndex && setGalleryCurrentIndex(prevIndex);
                }
              }}
              className="nb-gallery-prev"
            >
              <BackwardIcon />
            </button>
            <button
              onClick={() => {
                const container = document.querySelector('.nb-gallery-scroll');
                if (container) {
                  const nextIndex = (galleryCurrentIndex + 1) % projectGallery.length;
                  container.scrollTo({ left: nextIndex * container.offsetWidth, behavior: 'smooth' });
                  setGalleryCurrentIndex && setGalleryCurrentIndex(nextIndex);
                }
              }}
              className="nb-gallery-next"
            >
              <ForwardIcon />
            </button>

            <div className="nb-gallery-wrapper">
              <div className="nb-gallery-scroll">
                {projectGallery.map((image, index) => (
                  <div key={index} className="nb-gallery-slide">
                    <div className="nb-gallery-card">
                      <img
                        src={image?.url}
                        alt={`${projectName || 'Project'} gallery ${index + 1}`}
                        className="nb-gallery-img"
                        fetchpriority="high"
                        onClick={() => openModalGallery && openModalGallery(image?.url)}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div className="nb-gallery-overlay" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="nb-gallery-dots">
                {projectGallery.map((_, index) => (
                  <button
                    key={index}
                    className={`nb-dot ${index === galleryCurrentIndex ? 'nb-dot-active' : ''}`}
                    onClick={() => {
                      const container = document.querySelector('.nb-gallery-scroll');
                      if (container) {
                        container.scrollTo({ left: index * container.offsetWidth, behavior: 'smooth' });
                      }
                      setGalleryCurrentIndex && setGalleryCurrentIndex(index);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="nb-gallery-empty">
            <div className="nb-gallery-empty-icon">
              <i className="fas fa-images"></i>
            </div>
            <p className="nb-gallery-empty-text">No gallery images available</p>
          </div>
        )}
      </div>

      {/* Desktop Grid View */}
      <div className="nb-hide-mobile">
        <div className="nb-gallery-grid">
          {projectGallery.map((image, index) => (
            <div key={index}>
              <div className="nb-gallery-grid-card">
                <div className="nb-gallery-grid-inner">
                  <img
                    src={image?.url || image}
                    alt={`${projectName || 'Project'} gallery ${index + 1}`}
                    className="nb-gallery-grid-img"

                    onClick={() => openModalGallery && openModalGallery(image?.url || image)}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="nb-gallery-grid-overlay"></div>
                  <div className="nb-gallery-grid-expand">
                    <div className="nb-gallery-grid-expandbtn">
                      <i className="fas fa-expand-alt"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Modal */}
      {isModalOpenGallery && (
        <div className="nb-gallery-modal-overlay">
          <div className="nb-gallery-modal-box">
            <button onClick={closeModalGallery} className="nb-gallery-modal-close">
              <i className="fas fa-times text-lg"></i>
            </button>
            <button
              onClick={() => {
                const images = (projectGallery || []).map(img => img?.url || img);
                if (!images.length) return;
                const idx = images.indexOf(modalImageGallery);
                const prev = images[(idx - 1 + images.length) % images.length];
                openModalGallery && openModalGallery(prev);
              }}
              className="nb-gallery-modal-prev"
              aria-label="Previous image"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              onClick={() => {
                const images = (projectGallery || []).map(img => img?.url || img);
                if (!images.length) return;
                const idx = images.indexOf(modalImageGallery);
                const next = images[(idx + 1) % images.length];
                openModalGallery && openModalGallery(next);
              }}
              className="nb-gallery-modal-next"
              aria-label="Next image"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            <div className="nb-gallery-modal-content">
              <img src={modalImageGallery} alt={projectName} className="nb-gallery-modal-img" fetchpriority="high" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GallerySection;
