// Performance monitoring utility for code splitting
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      chunkLoadTimes: {},
      routeChangeTimes: {},
      bundleSizes: {}
    };
    this.init();
  }

  init() {
    // Monitor chunk loading performance
    if (typeof window !== 'undefined') {
      this.observeChunkLoading();
      this.observeRouteChanges();
    }
  }

  observeChunkLoading() {
    // Monitor dynamic imports
    const originalImport = window.import;
    if (originalImport) {
      window.import = async (modulePath) => {
        const startTime = performance.now();
        try {
          const result = await originalImport(modulePath);
          const loadTime = performance.now() - startTime;
          
          this.recordChunkLoad(modulePath, loadTime, true);
          return result;
        } catch (error) {
          const loadTime = performance.now() - startTime;
          this.recordChunkLoad(modulePath, loadTime, false, error);
          throw error;
        }
      };
    }
  }

  observeRouteChanges() {
    // Monitor route changes for SPA navigation performance
    let lastRouteChange = performance.now();
    
    // Listen for popstate events (browser back/forward)
    window.addEventListener('popstate', () => {
      const currentTime = performance.now();
      const routeChangeTime = currentTime - lastRouteChange;
      this.recordRouteChange('popstate', routeChangeTime);
      lastRouteChange = currentTime;
    });

    // Monitor programmatic navigation
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      const currentTime = performance.now();
      const routeChangeTime = currentTime - lastRouteChange;
      this.recordRouteChange('pushState', routeChangeTime);
      lastRouteChange = currentTime;
      return originalPushState.apply(history, args);
    }.bind(this);
  }

  recordChunkLoad(modulePath, loadTime, success, error = null) {
    const chunkName = this.extractChunkName(modulePath);
    
    if (!this.metrics.chunkLoadTimes[chunkName]) {
      this.metrics.chunkLoadTimes[chunkName] = {
        count: 0,
        totalTime: 0,
        averageTime: 0,
        failures: 0,
        lastLoadTime: 0
      };
    }

    const metric = this.metrics.chunkLoadTimes[chunkName];
    metric.count++;
    metric.totalTime += loadTime;
    metric.averageTime = metric.totalTime / metric.count;
    metric.lastLoadTime = loadTime;

    if (!success) {
      metric.failures++;
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📦 Chunk loaded: ${chunkName}`, {
        loadTime: `${loadTime.toFixed(2)}ms`,
        success,
        error: error?.message
      });
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics('chunk_load', {
        chunkName,
        loadTime,
        success,
        error: error?.message
      });
    }
  }

  recordRouteChange(routeType, changeTime) {
    if (!this.metrics.routeChangeTimes[routeType]) {
      this.metrics.routeChangeTimes[routeType] = {
        count: 0,
        totalTime: 0,
        averageTime: 0
      };
    }

    const metric = this.metrics.routeChangeTimes[routeType];
    metric.count++;
    metric.totalTime += changeTime;
    metric.averageTime = metric.totalTime / metric.count;

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 Route change: ${routeType}`, {
        changeTime: `${changeTime.toFixed(2)}ms`
      });
    }
  }

  extractChunkName(modulePath) {
    // Extract meaningful chunk name from module path
    const parts = modulePath.split('/');
    const fileName = parts[parts.length - 1];
    return fileName.replace('.jsx', '').replace('.js', '');
  }

  sendToAnalytics(eventType, data) {
    // Send performance data to analytics service
    // This can be integrated with Google Analytics, Mixpanel, etc.
    if (window.gtag) {
      window.gtag('event', eventType, data);
    }
    
    // Custom analytics endpoint
    fetch('/api/analytics/performance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType,
        data,
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      })
    }).catch(error => {
      // Silently fail if analytics endpoint is not available
      console.warn('Analytics endpoint not available:', error);
    });
  }

  getMetrics() {
    return this.metrics;
  }

  getChunkPerformance() {
    return Object.entries(this.metrics.chunkLoadTimes).map(([chunkName, metrics]) => ({
      chunkName,
      ...metrics
    }));
  }

  getRoutePerformance() {
    return Object.entries(this.metrics.routeChangeTimes).map(([routeType, metrics]) => ({
      routeType,
      ...metrics
    }));
  }

  // Export metrics for debugging
  exportMetrics() {
    return {
      chunkPerformance: this.getChunkPerformance(),
      routePerformance: this.getRoutePerformance(),
      timestamp: new Date().toISOString()
    };
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// Export for use in components
export default performanceMonitor;

// Export for debugging in console
if (typeof window !== 'undefined') {
  window.performanceMonitor = performanceMonitor;
} 