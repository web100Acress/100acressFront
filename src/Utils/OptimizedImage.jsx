import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = 'blur',
  loading = 'lazy',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Generate a low-quality placeholder
  const placeholderSrc = `${src}?w=10&blur=10`;

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {isInView && (
        <>
          {/* Low-quality placeholder */}
          {!isLoaded && !hasError && placeholder === 'blur' && (
            <img
              src={placeholderSrc}
              alt=""
              className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110 transition-opacity duration-300"
              aria-hidden="true"
            />
          )}
          
          {/* Main image */}
          <img
            src={hasError ? '/placeholder-image.jpg' : src}
            alt={alt}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${props.className || ''}`}
            {...props}
          />
          
          {/* Loading skeleton */}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(OptimizedImage);
