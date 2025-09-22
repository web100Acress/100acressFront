// Comprehensive performance monitoring and optimization

// Performance metrics collection
export const collectPerformanceMetrics = () => {
  const metrics = {
    // Core Web Vitals
    lcp: null, // Largest Contentful Paint
    fid: null, // First Input Delay
    cls: null, // Cumulative Layout Shift
    fcp: null, // First Contentful Paint
    ttfb: null, // Time to First Byte
    
    // Additional metrics
    domContentLoaded: null,
    windowLoad: null,
    resourceCount: 0,
    resourceSize: 0
  };

  // Collect Core Web Vitals
  if ('PerformanceObserver' in window) {
    // LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      metrics.lcp = lastEntry.startTime;
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // FID
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        metrics.fid = entry.processingStart - entry.startTime;
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // CLS
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      metrics.cls = clsValue;
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // FCP
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          metrics.fcp = entry.startTime;
        }
      });
    });
    fcpObserver.observe({ entryTypes: ['paint'] });
  }

  // Collect additional metrics
  window.addEventListener('DOMContentLoaded', () => {
    metrics.domContentLoaded = performance.now();
  });

  window.addEventListener('load', () => {
    metrics.windowLoad = performance.now();
    
    // Collect resource metrics
    const resources = performance.getEntriesByType('resource');
    metrics.resourceCount = resources.length;
    metrics.resourceSize = resources.reduce((total, resource) => {
      return total + (resource.transferSize || 0);
    }, 0);
  });

  return metrics;
};

// Performance optimization recommendations
export const getPerformanceRecommendations = (metrics) => {
  const recommendations = [];

  // LCP recommendations
  if (metrics.lcp > 2500) {
    recommendations.push({
      type: 'lcp',
      priority: 'high',
      message: 'LCP is too slow. Optimize images, use WebP format, and implement lazy loading.',
      impact: 'Critical for user experience'
    });
  }

  // FID recommendations
  if (metrics.fid > 100) {
    recommendations.push({
      type: 'fid',
      priority: 'high',
      message: 'FID is too slow. Reduce JavaScript execution time and optimize third-party scripts.',
      impact: 'Critical for interactivity'
    });
  }

  // CLS recommendations
  if (metrics.cls > 0.1) {
    recommendations.push({
      type: 'cls',
      priority: 'high',
      message: 'CLS is too high. Reserve space for images and avoid layout shifts.',
      impact: 'Critical for visual stability'
    });
  }

  // Resource recommendations
  if (metrics.resourceCount > 50) {
    recommendations.push({
      type: 'resources',
      priority: 'medium',
      message: 'Too many resources. Consider bundling, code splitting, and removing unused code.',
      impact: 'Affects loading performance'
    });
  }

  if (metrics.resourceSize > 1024 * 1024) { // 1MB
    recommendations.push({
      type: 'size',
      priority: 'medium',
      message: 'Total resource size is large. Optimize images, minify code, and use compression.',
      impact: 'Affects loading performance'
    });
  }

  return recommendations;
};

// Performance monitoring dashboard
export const createPerformanceDashboard = () => {
  if (process.env.NODE_ENV !== 'development') return;

  const dashboard = document.createElement('div');
  dashboard.id = 'performance-dashboard';
  dashboard.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px;
    border-radius: 5px;
    font-family: monospace;
    font-size: 12px;
    z-index: 10000;
    max-width: 300px;
  `;

  const updateDashboard = () => {
    const metrics = collectPerformanceMetrics();
    const recommendations = getPerformanceRecommendations(metrics);
    
    dashboard.innerHTML = `
      <h4>Performance Metrics</h4>
      <div>LCP: ${metrics.lcp ? metrics.lcp.toFixed(2) + 'ms' : 'Loading...'}</div>
      <div>FID: ${metrics.fid ? metrics.fid.toFixed(2) + 'ms' : 'Loading...'}</div>
      <div>CLS: ${metrics.cls ? metrics.cls.toFixed(3) : 'Loading...'}</div>
      <div>FCP: ${metrics.fcp ? metrics.fcp.toFixed(2) + 'ms' : 'Loading...'}</div>
      <div>Resources: ${metrics.resourceCount}</div>
      <div>Size: ${(metrics.resourceSize / 1024).toFixed(2)}KB</div>
      <h4>Recommendations</h4>
      ${recommendations.map(rec => 
        `<div style="color: ${rec.priority === 'high' ? '#ff6b6b' : '#ffa726'}">
          ${rec.message}
        </div>`
      ).join('')}
    `;
  };

  // Update dashboard every 2 seconds
  setInterval(updateDashboard, 2000);
  updateDashboard();

  document.body.appendChild(dashboard);
};

// Initialize performance monitoring
export const initializePerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;
  
  // Start collecting metrics
  const metrics = collectPerformanceMetrics();
  
  // Create development dashboard
  if (process.env.NODE_ENV === 'development') {
    createPerformanceDashboard();
  }
  
  // Log performance data
  window.addEventListener('load', () => {
    setTimeout(() => {
      const finalMetrics = collectPerformanceMetrics();
      const recommendations = getPerformanceRecommendations(finalMetrics);
      
      console.log('Performance Metrics:', finalMetrics);
      console.log('Performance Recommendations:', recommendations);
      
      // Send to analytics if available
      if (window.gtag) {
        window.gtag('event', 'performance_metrics', {
          lcp: finalMetrics.lcp,
          fid: finalMetrics.fid,
          cls: finalMetrics.cls,
          fcp: finalMetrics.fcp,
          resource_count: finalMetrics.resourceCount,
          resource_size: finalMetrics.resourceSize
        });
      }
    }, 1000);
  });
};
