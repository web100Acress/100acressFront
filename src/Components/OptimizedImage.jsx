import React, { useState, useRef, useEffect } from 'react';
import { getOptimizedImageUrl, getImageProps, isCdnAvailable } from '../utils/cdnHelper';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  priority = false, 
  quality = 'medium',
  format = 'webp',
  onLoad,
  onError,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Image props with CDN optimization
  const imageProps = getImageProps(src, {
    alt,
    quality,
    format,
    loading: priority ? 'eager' : 'lazy',
    decoding: 'async',
    className: `${className} ${isLoaded ? 'loaded' : 'loading'}`.trim(),
    ...props
  });

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            observer.unobserve(img);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };

  // Fallback for error state
  if (hasError) {
    return (
      <div className={`image-error-placeholder ${className}`}>
        <span>Image not available</span>
      </div>
    );
  }

  return (
    <div className="optimized-image-container">
      {!isLoaded && !hasError && (
        <div className="image-skeleton">
          <div className="skeleton-shimmer"></div>
        </div>
      )}
      <img
        ref={imgRef}
        {...imageProps}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
      
      {/* CDN Status Indicator (for development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="cdn-status" style={{
          position: 'absolute',
          top: '2px',
          right: '2px',
          background: isCdnAvailable() ? '#10b981' : '#ef4444',
          color: 'white',
          fontSize: '8px',
          padding: '1px 3px',
          borderRadius: '2px'
        }}>
          {isCdnAvailable() ? 'CDN' : 'LOCAL'}
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
