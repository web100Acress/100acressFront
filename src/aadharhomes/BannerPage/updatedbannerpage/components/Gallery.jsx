import React, { useState, useEffect, useCallback } from 'react';

const Gallery = ({ galleryImages = [], projectName = '' }) => {
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
    <section className="py-8 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
            <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
              GALLERY
            </h2>
            <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-2">
              Project Images{projectName ? ` of ${projectName}` : ''}
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[500px]">
          <div className="col-span-2 row-span-2 h-full">
            {visibleImages[0] && (
              <img
                fetchPriority='high'
                src={visibleImages[0].url}
                alt="Gallery image 1"
                className="w-full h-full object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => openModal(visibleImages[0].url, galleryImages.findIndex(img => img.url === visibleImages[0].url))}
              />
            )}
          </div>
          {visibleImages.slice(1, 5).map((image, index) => (
            <div key={index} className="h-full">
              {image && (
                <img
                  src={image.url}
                  alt={`Gallery image ${index + 2}`}
                  className="w-full h-full object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => openModal(image.url, galleryImages.findIndex(img => img.url === image.url))}
                />
              )}
            </div>
          ))}
        </div>

        {remainingImagesCount > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => openModal(galleryImages[5]?.url, 5)} // Open modal with the 6th image
              className="bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Show All Photos ({remainingImagesCount}+)
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-4xl z-10"
          >
            &times;
          </button>
          <div className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center">
            <button 
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              className="absolute left-4 md:left-8 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 z-10 transition-all"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={selectedImage}
                alt={`Gallery image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              className="absolute right-4 md:right-8 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 z-10 transition-all"
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

export default Gallery;
