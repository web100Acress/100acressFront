// Performance monitoring utility for tracking Core Web Vitals
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    // Track Largest Contentful Paint (LCP)
    this.observeLCP();
    
    // Track First Input Delay (FID)
    this.observeFID();
    
    // Track Cumulative Layout Shift (CLS)
    this.observeCLS();
    
    // Track First Contentful Paint (FCP)
    this.observeFCP();
    
    // Track Time to Interactive (TTI)
    this.observeTTI();
  }

  observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        this.metrics.lcp = lastEntry.startTime;
        this.logMetric('LCP', lastEntry.startTime);
        
        // Send to analytics if LCP is poor
        if (lastEntry.startTime > 2500) {
          this.sendToAnalytics('poor_lcp', { value: lastEntry.startTime });
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
          this.logMetric('FID', this.metrics.fid);
          
          // Send to analytics if FID is poor
          if (this.metrics.fid > 100) {
            this.sendToAnalytics('poor_fid', { value: this.metrics.fid });
          }
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    }
  }

  observeCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.metrics.cls = clsValue;
            this.logMetric('CLS', clsValue);
            
            // Send to analytics if CLS is poor
            if (clsValue > 0.1) {
              this.sendToAnalytics('poor_cls', { value: clsValue });
            }
          }
        });
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }

  observeFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0];
        
        this.metrics.fcp = firstEntry.startTime;
        this.logMetric('FCP', firstEntry.startTime);
        
        // Send to analytics if FCP is poor
        if (firstEntry.startTime > 1800) {
          this.sendToAnalytics('poor_fcp', { value: firstEntry.startTime });
        }
      });
      
      observer.observe({ entryTypes: ['first-contentful-paint'] });
    }
  }

  observeTTI() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.metrics.tti = entry.startTime;
          this.logMetric('TTI', entry.startTime);
          
          // Send to analytics if TTI is poor
          if (entry.startTime > 3800) {
            this.sendToAnalytics('poor_tti', { value: entry.startTime });
          }
        });
      });
      
      observer.observe({ entryTypes: ['interaction'] });
    }
  }

  logMetric(name, value) {
    console.log(`🚀 ${name}: ${value.toFixed(2)}ms`);
    
    // Store in localStorage for debugging
    const stored = JSON.parse(localStorage.getItem('performance_metrics') || '{}');
    stored[name] = value;
    stored.timestamp = Date.now();
    localStorage.setItem('performance_metrics', JSON.stringify(stored));
  }

  sendToAnalytics(event, data) {
    // Send to Google Analytics
    if (window.gtag) {
      window.gtag('event', event, {
        event_category: 'Performance',
        event_label: data.value,
        value: Math.round(data.value)
      });
    }
    
    // Send to custom analytics endpoint
    fetch('/api/analytics/performance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event,
        data,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent
      })
    }).catch(err => console.warn('Failed to send performance data:', err));
  }

  getMetrics() {
    return this.metrics;
  }

  // Track resource loading performance
  trackResourceTiming() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.initiatorType === 'img' && entry.duration > 1000) {
            console.warn(`Slow image load: ${entry.name} took ${entry.duration}ms`);
            this.sendToAnalytics('slow_image_load', {
              url: entry.name,
              duration: entry.duration
            });
          }
        });
      });
      
      observer.observe({ entryTypes: ['resource'] });
    }
  }

  // Track JavaScript errors
  trackErrors() {
    window.addEventListener('error', (event) => {
      this.sendToAnalytics('js_error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });
  }

  // Track unhandled promise rejections
  trackUnhandledRejections() {
    window.addEventListener('unhandledrejection', (event) => {
      this.sendToAnalytics('unhandled_rejection', {
        reason: event.reason
      });
    });
  }
}

// Initialize performance monitoring
const performanceMonitor = new PerformanceMonitor();

// Track resource timing and errors
performanceMonitor.trackResourceTiming();
performanceMonitor.trackErrors();
performanceMonitor.trackUnhandledRejections();

export default performanceMonitor; 