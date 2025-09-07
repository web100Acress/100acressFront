import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  lazy = true,
  placeholder = 'blur',
  quality = 75,
  sizes = '100vw',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const imgRef = useRef(null);
  const [isInView, setIsInView] = useState(!lazy || priority);

  // Generate optimized image URLs
  const generateSrcSet = (baseSrc) => {
    if (!baseSrc) return '';
    
    // If it's already a full URL, return as is
    if (baseSrc.startsWith('http') || baseSrc.startsWith('//')) {
      return baseSrc;
    }
    
    // For local images, create responsive versions
    const widths = [320, 640, 768, 1024, 1280, 1920];
    return widths
      .map(w => `${baseSrc}?w=${w}&q=${quality} ${w}w`)
      .join(', ');
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority, isInView]);

  // Set current src when in view
  useEffect(() => {
    if (isInView && src) {
      setCurrentSrc(src);
    }
  }, [isInView, src]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setIsError(true);
    onError?.(e);
  };

  // Generate blur placeholder
  const blurDataURL = `data:image/svg+xml;base64,${btoa(
    `<svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
    </svg>`
  )}`;

  return (
    <ImageContainer
      ref={imgRef}
      className={className}
      width={width}
      height={height}
      $isLoaded={isLoaded}
      $isError={isError}
      {...props}
    >
      {/* Placeholder */}
      {placeholder === 'blur' && !isLoaded && !isError && (
        <PlaceholderImage
          src={blurDataURL}
          alt=""
          width={width}
          height={height}
          loading="eager"
        />
      )}
      
      {/* Main image */}
      {currentSrc && (
        <MainImage
          src={currentSrc}
          srcSet={generateSrcSet(currentSrc)}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          onError={handleError}
          $isLoaded={isLoaded}
          $priority={priority}
        />
      )}
      
      {/* Error fallback */}
      {isError && (
        <ErrorFallback>
          <svg width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
          <span>Image not available</span>
        </ErrorFallback>
      )}
      
      {/* Loading indicator */}
      {!isLoaded && !isError && currentSrc && (
        <LoadingIndicator>
          <div className="spinner" />
        </LoadingIndicator>
      )}
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
  overflow: hidden;
  background-color: #f3f4f6;
  
  ${props => props.width && `width: ${typeof props.width === 'number' ? props.width + 'px' : props.width};`}
  ${props => props.height && `height: ${typeof props.height === 'number' ? props.height + 'px' : props.height};`}
  
  ${props => !props.width && !props.height && `
    width: 100%;
    height: auto;
  `}
`;

const PlaceholderImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(10px);
  transform: scale(1.1);
  transition: opacity 0.3s ease;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
  
  opacity: ${props => props.$isLoaded ? 1 : 0};
  
  ${props => props.$priority && `
    will-change: auto;
  `}
  
  &:not([src]) {
    opacity: 0;
  }
`;

const ErrorFallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 120px;
  color: #6b7280;
  background-color: #f9fafb;
  
  svg {
    margin-bottom: 8px;
    opacity: 0.5;
  }
  
  span {
    font-size: 12px;
    text-align: center;
  }
`;

const LoadingIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  .spinner {
    width: 24px;
    height: 24px;
    border: 2px solid #f3f4f6;
    border-top: 2px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default OptimizedImage;
