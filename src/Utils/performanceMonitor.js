// Performance Monitoring Utility
// For CDN performance testing

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      imageLoadTimes: [],
      apiResponseTimes: [],
      pageLoadTime: 0,
      totalImages: 0,
      cdnHits: 0,
      localLoads: 0
    };
    
    this.init();
  }

  init() {
    // Monitor page load
    window.addEventListener('load', () => {
      this.metrics.pageLoadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      this.reportPerformance();
    });

    // Monitor image loading
    this.monitorImageLoading();
    
    // Monitor API calls
    this.monitorApiCalls();
  }

  monitorImageLoading() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.initiatorType === 'img') {
          const loadTime = entry.responseEnd - entry.requestStart;
          this.metrics.imageLoadTimes.push({
            url: entry.name,
            loadTime,
            size: entry.transferSize,
            isCdn: this.isCdnUrl(entry.name)
          });

          if (this.isCdnUrl(entry.name)) {
            this.metrics.cdnHits++;
          } else {
            this.metrics.localLoads++;
          }
          
          this.metrics.totalImages++;
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  monitorApiCalls() {
    // Override fetch to monitor API calls
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const url = args[0];
      
      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        
        this.metrics.apiResponseTimes.push({
          url: typeof url === 'string' ? url : url.url,
          responseTime: endTime - startTime,
          status: response.status
        });
        
        return response;
      } catch (error) {
        const endTime = performance.now();
        
        this.metrics.apiResponseTimes.push({
          url: typeof url === 'string' ? url : url.url,
          responseTime: endTime - startTime,
          status: 'error',
          error: error.message
        });
        
        throw error;
      }
    };
  }

  isCdnUrl(url) {
    // Check if URL is from CDN (future implementation)
    const cdnDomains = [
      'cloudfront.net',
      'cloudinary.com',
      'imgix.net',
      // Add your CDN domain here
    ];
    
    return cdnDomains.some(domain => url.includes(domain));
  }

  calculateAverageImageLoadTime() {
    if (this.metrics.imageLoadTimes.length === 0) return 0;
    
    const total = this.metrics.imageLoadTimes.reduce((sum, img) => sum + img.loadTime, 0);
    return total / this.metrics.imageLoadTimes.length;
  }

  calculateCdnHitRate() {
    if (this.metrics.totalImages === 0) return 0;
    return (this.metrics.cdnHits / this.metrics.totalImages) * 100;
  }

  reportPerformance() {
    console.group('🚀 Performance Report - 100acress.com');
    console.log('📊 Page Load Time:', `${this.metrics.pageLoadTime}ms`);
    console.log('🖼️ Total Images:', this.metrics.totalImages);
    console.log('⚡ Average Image Load Time:', `${this.calculateAverageImageLoadTime().toFixed(2)}ms`);
    console.log('🌐 CDN Hit Rate:', `${this.calculateCdnHitRate().toFixed(1)}%`);
    console.log('📈 CDN Hits:', this.metrics.cdnHits);
    console.log('🏠 Local Loads:', this.metrics.localLoads);
    
    // Image performance breakdown
    const cdnImages = this.metrics.imageLoadTimes.filter(img => img.isCdn);
    const localImages = this.metrics.imageLoadTimes.filter(img => !img.isCdn);
    
    if (cdnImages.length > 0) {
      const avgCdnTime = cdnImages.reduce((sum, img) => sum + img.loadTime, 0) / cdnImages.length;
      console.log('⚡ CDN Average Load Time:', `${avgCdnTime.toFixed(2)}ms`);
    }
    
    if (localImages.length > 0) {
      const avgLocalTime = localImages.reduce((sum, img) => sum + img.loadTime, 0) / localImages.length;
      console.log('🏠 Local Average Load Time:', `${avgLocalTime.toFixed(2)}ms`);
    }
    
    // API performance
    if (this.metrics.apiResponseTimes.length > 0) {
      const avgApiTime = this.metrics.apiResponseTimes.reduce((sum, api) => sum + api.responseTime, 0) / this.metrics.apiResponseTimes.length;
      console.log('🔌 Average API Response Time:', `${avgApiTime.toFixed(2)}ms`);
    }
    
    console.groupEnd();

    // Performance recommendations
    this.generateRecommendations();
  }

  generateRecommendations() {
    console.group('💡 Performance Recommendations');
    
    if (this.calculateCdnHitRate() < 50) {
      console.warn('🌐 CDN Hit Rate is low. Consider implementing CDN for better performance.');
    }
    
    if (this.calculateAverageImageLoadTime() > 500) {
      console.warn('🖼️ Image load times are high. Consider image optimization.');
    }
    
    if (this.metrics.pageLoadTime > 3000) {
      console.warn('📊 Page load time is high. Consider optimizing critical resources.');
    }
    
    const largeImages = this.metrics.imageLoadTimes.filter(img => img.size > 1000000); // > 1MB
    if (largeImages.length > 0) {
      console.warn('📏 Found large images. Consider compression or responsive images:', largeImages);
    }
    
    console.groupEnd();
  }

  // Export metrics for external analysis
  getMetrics() {
    return {
      ...this.metrics,
      averageImageLoadTime: this.calculateAverageImageLoadTime(),
      cdnHitRate: this.calculateCdnHitRate(),
      timestamp: new Date().toISOString()
    };
  }
}

// Initialize performance monitoring
if (process.env.REACT_APP_ENABLE_PERFORMANCE_MONITORING === 'true') {
  window.performanceMonitor = new PerformanceMonitor();
}

export default PerformanceMonitor;
