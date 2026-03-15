import React, { useMemo } from 'react';
import './Gallery.mobile.css';

const GalleryMobile = ({ galleryImages = [], projectName = '' }) => {
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
  });

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
    });;
  }, [handleKeyDown]);

  if (!galleryImages || galleryImages.length === 0) {
    return null;
  }

  const visibleImages = galleryImages.slice(0, 4); // Show 4 images on mobile
  const remainingImagesCount = galleryImages.length - visibleImages.length;

  return (
    <section className="gallery-mobile">
      <div className="gallery-mobile-content">
        {/* Mobile Section Header */}
        <div className="gallery-mobile-header">
          <h2 className="gallery-mobile-subtitle">
            GALLERY
          </h2>
          <h3 className="gallery-mobile-title">
            Project Images{projectName ? ` of ${projectName}` : ''}
          </h3>
          <div className="gallery-mobile-accent-line"></div>
        </div>

        {/* Mobile Gallery Grid */}
        <div className="gallery-mobile-grid">
          <div className="gallery-mobile-grid-featured">
            {visibleImages[0] && (
              <img
                fetchpriority="high"
                src={visibleImages[0].url}
                alt="Gallery image 1"
                className="gallery-mobile-image featured"
                onClick={() => openModal(visibleImages[0].url, galleryImages.findIndex(img => img.url === visibleImages[0].url))}
                crossOrigin="anonymous"
              />
            )}
          </div>
          {visibleImages.slice(1, 4).map((image, index) => (
            <div key={index} className="gallery-mobile-grid-cell">
              {image && (
                <img
                  src={image.url}
                  alt={`Gallery image ${index + 2}`}
                  className="gallery-mobile-image"
                  onClick={() => openModal(image.url, galleryImages.findIndex(img => img.url === image.url))}
                  crossOrigin="anonymous"
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Show All Button */}
        {remainingImagesCount > 0 && (
          <div className="gallery-mobile-show-all">
            <button
              onClick={() => openModal(galleryImages[4]?.url, 4)}
              className="gallery-mobile-show-all-button"
            >
              Show All Photos ({remainingImagesCount}+)
            </button>
          </div>
        )}

        {/* Mobile Modal */}
        {isModalOpen && (
          <div className="gallery-mobile-modal">
            <button
              onClick={closeModal}
              className="gallery-mobile-modal-close"
            >
              &times;
            </button>
            <div className="gallery-mobile-modal-body">
              <button 
                onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                className="gallery-mobile-modal-nav prev"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="gallery-mobile-modal-image-wrap">
                <img
                  src={selectedImage}
                  alt={`Gallery image ${currentImageIndex + 1}`}
                  className="gallery-mobile-modal-image"
                  crossOrigin="anonymous"
                />
                <div className="gallery-mobile-modal-counter">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
              </div>
              
              <button 
                onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                className="gallery-mobile-modal-nav next"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryMobile;
