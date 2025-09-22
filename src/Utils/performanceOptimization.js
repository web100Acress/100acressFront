// Performance optimization utilities

// Defer non-critical JavaScript execution
export const deferExecution = (callback, delay = 0) => {
  if (delay > 0) {
    setTimeout(callback, delay);
  } else {
    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback);
    } else {
      setTimeout(callback, 1);
    }
  }
};

// Defer analytics and tracking scripts
export const deferAnalytics = () => {
  deferExecution(() => {
    // Initialize Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-1XY9M6DY08', {
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }, 2000); // Defer by 2 seconds
};

// Defer non-critical third-party scripts
export const deferThirdPartyScripts = () => {
  deferExecution(() => {
    // Load any non-critical third-party scripts here
    console.log('Loading non-critical third-party scripts...');
  }, 3000); // Defer by 3 seconds
};

// Optimize image loading
export const optimizeImageLoading = () => {
  // Add loading="lazy" to images that don't have it
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalImages = [
    'https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/experion-trillion-banner.webp'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};

// Initialize performance optimizations
export const initializePerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;
  
  // Run optimizations when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      optimizeImageLoading();
      preloadCriticalResources();
    });
  } else {
    optimizeImageLoading();
    preloadCriticalResources();
  }
  
  // Defer non-critical operations
  deferAnalytics();
  deferThirdPartyScripts();
};

// Bundle size monitoring (development only)
export const monitorBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bundle size monitoring enabled');
    // Add bundle size monitoring logic here
  }
};
