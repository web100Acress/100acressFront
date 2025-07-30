import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  lazy = true,
  priority = false,
  fallbackSrc = '/Images/dummy.webp',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!lazy || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [lazy]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Generate WebP srcset if original is not WebP
  const generateSrcSet = (originalSrc) => {
    if (originalSrc.includes('.webp') || originalSrc.includes('.avif')) {
      return originalSrc;
    }
    
    // For CDN images, try to get WebP version
    if (originalSrc.includes('cloudfront.net') || originalSrc.includes('s3.ap-south-1.amazonaws.com')) {
      const baseUrl = originalSrc.split('?')[0];
      const webpUrl = baseUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      return `${originalSrc} 1x, ${webpUrl} 1x`;
    }
    
    return originalSrc;
  };

  const finalSrc = hasError ? fallbackSrc : src;
  const srcSet = generateSrcSet(finalSrc);

  return (
    <div
      ref={imgRef}
      className={`image-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        ...(width && height ? { aspectRatio: `${width}/${height}` } : {}),
      }}
    >
      {/* Skeleton loader */}
      {!isLoaded && (
        <div
          className="skeleton-loader"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'loading 1.5s infinite',
          }}
        />
      )}
      
      {/* Actual image */}
      {isInView && (
        <img
          src={finalSrc}
          alt={alt}
          className={`optimized-image ${isLoaded ? 'loaded' : ''}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
      
      <style jsx>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        .optimized-image {
          display: block;
        }
        
        .optimized-image.loaded {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage; 