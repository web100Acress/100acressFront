import React, { useState } from 'react';

const Gallery = ({ galleryImages = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  if (!galleryImages || galleryImages.length === 0) {
    return null; // Don't render anything if there are no images
  }

  const visibleImages = galleryImages.slice(0, 5);
  const remainingImagesCount = galleryImages.length - visibleImages.length;

  return (
    <section className="py-12 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
            <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
              GALLERY
            </h2>
            <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-2">
              Project Visuals
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[500px]">
          <div className="col-span-2 row-span-2 h-full">
            {visibleImages[0] && (
              <img
                src={visibleImages[0].url}
                alt="Gallery image 1"
                className="w-full h-full object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => openModal(visibleImages[0].url)}
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
                  onClick={() => openModal(image.url)}
                />
              )}
            </div>
          ))}
        </div>

        {remainingImagesCount > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => openModal(galleryImages[5]?.url)} // Open modal with the 6th image
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
            <img
              src={selectedImage}
              alt="Full screen gallery"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
