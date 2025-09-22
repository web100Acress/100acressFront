// CloudFront optimization utilities for CDN delivery

// CloudFront cache headers configuration
export const CLOUDFRONT_CACHE_HEADERS = {
  // Static assets (images, CSS, JS) - long-term caching
  static: {
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Expires': new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()
  },
  
  // HTML files - short-term caching
  html: {
    'Cache-Control': 'public, max-age=300, s-maxage=3600',
    'Vary': 'Accept-Encoding'
  },
  
  // API responses - no caching
  api: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  },
  
  // Fonts - long-term caching with CORS
  fonts: {
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
};

// Optimize image delivery with CloudFront
export const optimizeImageDelivery = () => {
  // Add WebP support detection
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  // Replace image sources with WebP versions if supported
  const images = document.querySelectorAll('img[src*="s3"]');
  images.forEach(img => {
    if (supportsWebP() && !img.src.includes('.webp')) {
      const webpSrc = img.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      img.src = webpSrc;
    }
  });
};

// Set up CloudFront Functions for image optimization
export const setupCloudFrontFunctions = () => {
  // This would typically be configured in AWS CloudFront
  // But we can set up client-side hints for optimization
  
  const imageOptimizationHints = {
    // Add responsive image hints
    addResponsiveImageHints: () => {
      const images = document.querySelectorAll('img[src*="s3"]');
      images.forEach(img => {
        // Add sizes attribute for responsive images
        if (!img.hasAttribute('sizes')) {
          img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw');
        }
        
        // Add srcset for different resolutions
        if (!img.hasAttribute('srcset')) {
          const baseSrc = img.src;
          const srcset = [
            `${baseSrc}?w=320 320w`,
            `${baseSrc}?w=640 640w`,
            `${baseSrc}?w=1280 1280w`,
            `${baseSrc}?w=1920 1920w`
          ].join(', ');
          img.setAttribute('srcset', srcset);
        }
      });
    },
    
    // Add WebP format hints
    addWebPFormatHints: () => {
      const images = document.querySelectorAll('img[src*="s3"]');
      images.forEach(img => {
        // Add format hints for CloudFront
        if (!img.src.includes('format=')) {
          const url = new URL(img.src);
          url.searchParams.set('format', 'webp');
          url.searchParams.set('quality', '80');
          img.src = url.toString();
        }
      });
    }
  };

  // Apply optimizations
  imageOptimizationHints.addResponsiveImageHints();
  imageOptimizationHints.addWebPFormatHints();
};

// CloudFront cache invalidation
export const invalidateCloudFrontCache = (paths = ['/*']) => {
  // This would typically be done server-side
  console.log('CloudFront cache invalidation requested for paths:', paths);
  
  // In a real implementation, this would call your backend API
  // which would then trigger CloudFront cache invalidation
  fetch('/api/invalidate-cache', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paths })
  }).catch(error => {
    console.error('Failed to invalidate CloudFront cache:', error);
  });
};

// Optimize CloudFront delivery
export const optimizeCloudFrontDelivery = () => {
  // Add CloudFront-specific optimizations
  const optimizations = {
    // Enable compression hints
    enableCompression: () => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(link => {
        if (!link.href.includes('gzip')) {
          // Add compression hint
          link.setAttribute('data-compression', 'gzip');
        }
      });
    },
    
    // Add CloudFront edge location hints
    addEdgeLocationHints: () => {
      // Add hints for optimal edge location selection
      const meta = document.createElement('meta');
      meta.name = 'cloudfront-edge-location';
      meta.content = 'auto';
      document.head.appendChild(meta);
    },
    
    // Optimize for CloudFront caching
    optimizeForCaching: () => {
      // Add cache hints to static assets
      const staticAssets = document.querySelectorAll('img[src*="s3"], link[href*="s3"]');
      staticAssets.forEach(asset => {
        asset.setAttribute('data-cache-strategy', 'cloudfront');
        asset.setAttribute('data-cache-ttl', '31536000'); // 1 year
      });
    }
  };

  // Apply all optimizations
  optimizations.enableCompression();
  optimizations.addEdgeLocationHints();
  optimizations.optimizeForCaching();
};

// Initialize CloudFront optimizations
export const initializeCloudFrontOptimizations = () => {
  if (typeof window === 'undefined') return;
  
  // Run optimizations when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      optimizeImageDelivery();
      setupCloudFrontFunctions();
      optimizeCloudFrontDelivery();
    });
  } else {
    optimizeImageDelivery();
    setupCloudFrontFunctions();
    optimizeCloudFrontDelivery();
  }
};

// CloudFront performance monitoring
export const monitorCloudFrontPerformance = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('CloudFront optimization enabled');
    
    // Monitor CloudFront performance
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource' && entry.name.includes('cloudfront.net')) {
          console.log(`CloudFront resource loaded: ${entry.name} in ${entry.duration}ms`);
        }
      });
    });
    
    observer.observe({ entryTypes: ['resource'] });
  }
};
