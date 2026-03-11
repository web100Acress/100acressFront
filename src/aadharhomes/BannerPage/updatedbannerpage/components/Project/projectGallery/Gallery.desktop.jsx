import React, { useState, useEffect, useCallback } from 'react';
import './Gallery.desktop.css';

const GalleryDesktop = ({ galleryImages = [], projectName = '' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (imageUrl, index = 0) => {
    setSelectedImage(imageUrl);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  }, []);

  const navigateImage = useCallback((direction) => {
    setCurrentImageIndex(prevIndex => {
      let newIndex;
      if (direction === 'prev') {
        newIndex = prevIndex > 0 ? prevIndex - 1 : galleryImages.length - 1;
      } else {
        newIndex = prevIndex < galleryImages.length - 1 ? prevIndex + 1 : 0;
      }
      setSelectedImage(galleryImages[newIndex]?.url);
      return newIndex;
    });
  }, [galleryImages]);

  const handleKeyDown = useCallback((e) => {
    if (!isModalOpen) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        navigateImage('prev');
        break;
      case 'ArrowRight':
        navigateImage('next');
        break;
      case 'Escape':
        closeModal();
        break;
      default:
        break;
    }
  }, [isModalOpen, navigateImage, closeModal]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!galleryImages || galleryImages.length === 0) {
    return null; // Don't render anything if there are no images
  }

  const visibleImages = galleryImages.slice(0, 5);
  const remainingImagesCount = galleryImages.length - visibleImages.length;

  return (
    <section className="gallery-desktop">
      <div className="gallery-desktop-content">
        <div className="gallery-desktop-header">
            <h2 className="gallery-desktop-subtitle">
              GALLERY
            </h2>
            <h3 className="gallery-desktop-title">
              Project Images{projectName ? ` of ${projectName}` : ''}
            </h3>
            <div className="gallery-desktop-accent-line"></div>
        </div>

        <div className="gallery-desktop-grid">
          <div className="gallery-desktop-grid-featured">
            {visibleImages[0] && (
              <img
                fetchPriority='high'
                src={visibleImages[0].url}
                alt="Gallery image 1"
                className="gallery-desktop-image"
                onClick={() => openModal(visibleImages[0].url, galleryImages.findIndex(img => img.url === visibleImages[0].url))}
              />
            )}
          </div>
          {visibleImages.slice(1, 5).map((image, index) => (
            <div key={index} className="gallery-desktop-grid-cell">
              {image && (
                <img
                  src={image.url}
                  alt={`Gallery image ${index + 2}`}
                  className="gallery-desktop-image"
                  onClick={() => openModal(image.url, galleryImages.findIndex(img => img.url === image.url))}
                />
              )}
            </div>
          ))}
        </div>

        {remainingImagesCount > 0 && (
          <div className="gallery-desktop-show-all">
            <button
              onClick={() => openModal(galleryImages[5]?.url, 5)} // Open modal with the 6th image
              className="gallery-desktop-show-all-button"
            >
              Show All Photos ({remainingImagesCount}+)
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="gallery-desktop-modal">
          <button
            onClick={closeModal}
            className="gallery-desktop-modal-close"
          >
            &times;
          </button>
          <div className="gallery-desktop-modal-body">
            <button 
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              className="gallery-desktop-modal-nav prev"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="gallery-desktop-modal-image-wrap">
              <img
                src={selectedImage}
                alt={`Gallery image ${currentImageIndex + 1}`}
                className="gallery-desktop-modal-image"
              />
              <div className="gallery-desktop-modal-counter">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              className="gallery-desktop-modal-nav next"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryDesktop;
