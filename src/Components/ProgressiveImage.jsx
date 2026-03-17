import React, { useState } from 'react';

const ProgressiveImage = ({ src, alt, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState('/Images/dummy.webp');
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate tiny placeholder (blur hash)
  const generatePlaceholder = (originalSrc) => {
    if (!originalSrc) return '/Images/dummy.webp';
    
    // For WebP images, create a tiny version
    if (originalSrc.includes('.webp')) {
      return originalSrc.replace('.webp', '_tiny.webp');
    }
    
    return originalSrc;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setImgSrc(src); // Load full image
  };

  return (
    <div className={`progressive-image-container ${className || ''}`}>
      {/* Tiny blurred placeholder */}
      <img
        src={generatePlaceholder(src)}
        alt={alt}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'blur(20px)',
          transform: 'scale(1.05)',
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
      
      {/* Full quality image */}
      <img
        src={imgSrc}
        alt={alt}
        onLoad={handleLoad}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
        {...props}
      />
    </div>
  );
};

export default ProgressiveImage;
