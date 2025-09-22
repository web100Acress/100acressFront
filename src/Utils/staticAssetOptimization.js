// Static Asset Optimization utilities

// Optimize image loading with responsive images
export const optimizeImageLoading = () => {
  // Add loading="lazy" to images that don't have it
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Add decoding="async" for better performance
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
  });
};

// Preload critical images
export const preloadCriticalImages = () => {
  const criticalImages = [
    'https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/experion-trillion-banner.webp',
    // Add other critical images here
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

// Optimize CSS loading
export const optimizeCSSLoading = () => {
  // Add media queries for non-critical CSS
  const nonCriticalCSS = [
    'animate.css',
    'mdb-react-ui-kit/dist/css/mdb.min.css',
    '@fortawesome/fontawesome-free/css/all.min.css'
  ];
  
  nonCriticalCSS.forEach(cssFile => {
    const links = document.querySelectorAll(`link[href*="${cssFile}"]`);
    links.forEach(link => {
      if (!link.hasAttribute('media')) {
        link.setAttribute('media', 'print');
        link.onload = function() {
          this.media = 'all';
        };
      }
    });
  });
};

// Optimize font loading
export const optimizeFontLoading = () => {
  // Add font-display: swap to Google Fonts
  const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
  fontLinks.forEach(link => {
    if (!link.href.includes('display=swap')) {
      const url = new URL(link.href);
      url.searchParams.set('display', 'swap');
      link.href = url.toString();
    }
  });
};

// Optimize third-party scripts
export const optimizeThirdPartyScripts = () => {
  // Defer non-critical scripts
  const scripts = document.querySelectorAll('script[src*="googletagmanager.com"], script[src*="google-analytics.com"]');
  scripts.forEach(script => {
    if (!script.hasAttribute('defer') && !script.hasAttribute('async')) {
      script.setAttribute('defer', '');
    }
  });
};

// Set up proper cache headers for static assets
export const setupCacheHeaders = () => {
  // This would typically be done server-side, but we can set up client-side hints
  const staticAssets = document.querySelectorAll('img[src*="s3"], link[href*="s3"]');
  staticAssets.forEach(asset => {
    // Add cache hints
    asset.setAttribute('data-cache', 'long-term');
  });
};

// Optimize resource hints
export const optimizeResourceHints = () => {
  // Add dns-prefetch for external domains
  const externalDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    '100acress-media-bucket.s3.ap-south-1.amazonaws.com',
    'api.100acress.com'
  ];
  
  externalDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });
  
  // Add preconnect for critical domains
  const criticalDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com'
  ];
  
  criticalDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = `https://${domain}`;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Initialize all static asset optimizations
export const initializeStaticAssetOptimizations = () => {
  if (typeof window === 'undefined') return;
  
  // Run optimizations when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      optimizeImageLoading();
      preloadCriticalImages();
      optimizeCSSLoading();
      optimizeFontLoading();
      optimizeThirdPartyScripts();
      setupCacheHeaders();
      optimizeResourceHints();
    });
  } else {
    optimizeImageLoading();
    preloadCriticalImages();
    optimizeCSSLoading();
    optimizeFontLoading();
    optimizeThirdPartyScripts();
    setupCacheHeaders();
    optimizeResourceHints();
  }
};

// Bundle size monitoring (development only)
export const monitorBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Static asset optimization enabled');
    
    // Monitor image loading performance
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource' && entry.name.includes('.webp')) {
          console.log(`Image loaded: ${entry.name} in ${entry.duration}ms`);
        }
      });
    });
    
    observer.observe({ entryTypes: ['resource'] });
  }
};
