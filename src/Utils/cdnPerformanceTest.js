// CDN Performance Testing Utility
// Real measurable performance gains for 100acress.com

class CDNPerformanceTest {
  constructor() {
    this.testResults = {
      beforeCDN: {},
      afterCDN: {},
      improvements: {}
    };
    
    this.testImages = [
      '/Images/downtown-city-skyline-along-river.webp', // 8.3MB problem image
      '/Images/logoavtar.webp', // 460KB
      '/Images/emaarsco.webp' // 324KB
    ];
  }

  // Test image loading performance
  async testImageLoadTime(imageUrl, testName = 'default') {
    console.log(`🧪 Testing: ${testName}`);
    
    const startTime = performance.now();
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      const startTime = performance.now();
      
      img.onload = () => {
        const endTime = performance.now();
        const loadTime = endTime - startTime;
        
        // Get actual resource timing if available
        const resourceTiming = performance.getEntriesByName(imageUrl)[0];
        const detailedTiming = resourceTiming ? {
          loadTime: loadTime,
          dnsTime: resourceTiming.domainLookupEnd - resourceTiming.domainLookupStart,
          connectTime: resourceTiming.connectEnd - resourceTiming.connectStart,
          ttfb: resourceTiming.responseStart - resourceTiming.requestStart,
          downloadTime: resourceTiming.responseEnd - resourceTiming.responseStart,
          size: resourceTiming.transferSize,
          compressedSize: resourceTiming.encodedBodySize
        } : { loadTime };
        
        console.log(`⚡ ${testName}: ${loadTime.toFixed(2)}ms`);
        resolve(detailedTiming);
      };
      
      img.onerror = () => {
        reject(new Error(`Failed to load image: ${imageUrl}`));
      };
      
      img.src = imageUrl;
    });
  }

  // Test multiple images
  async testMultipleImages(imageUrls, testLabel) {
    console.log(`\n📊 Testing ${testLabel}...`);
    
    const results = [];
    for (const url of imageUrls) {
      try {
        const result = await this.testImageLoadTime(url, url.split('/').pop());
        results.push({ url, ...result });
      } catch (error) {
        console.error(`❌ Error testing ${url}:`, error.message);
      }
    }
    
    return results;
  }

  // Test CDN vs Local performance
  async runCDNComparisonTest() {
    console.log('🚀 Starting CDN Performance Comparison Test\n');
    
    // Test local images (current setup)
    console.log('📍 Testing LOCAL images (current setup)...');
    const localResults = await this.testMultipleImages(
      this.testImages, 
      'LOCAL IMAGES'
    );
    this.testResults.beforeCDN = localResults;
    
    // Test CDN images (if CDN is configured)
    const cdnUrl = process.env.REACT_APP_CDN_URL;
    if (cdnUrl) {
      console.log('\n🌐 Testing CDN images...');
      const cdnImages = this.testImages.map(img => `${cdnUrl}${img}`);
      const cdnResults = await this.testMultipleImages(
        cdnImages, 
        'CDN IMAGES'
      );
      this.testResults.afterCDN = cdnResults;
      
      // Calculate improvements
      this.calculateImprovements();
    } else {
      console.warn('⚠️ CDN not configured. Set REACT_APP_CDN_URL to test CDN performance.');
    }
    
    this.generateReport();
  }

  // Calculate performance improvements
  calculateImprovements() {
    const improvements = [];
    
    for (let i = 0; i < this.testResults.beforeCDN.length; i++) {
      const before = this.testResults.beforeCDN[i];
      const after = this.testResults.afterCDN[i];
      
      if (before && after) {
        const improvement = {
          image: before.url.split('/').pop(),
          beforeLoadTime: before.loadTime,
          afterLoadTime: after.loadTime,
          improvementPercent: ((before.loadTime - after.loadTime) / before.loadTime * 100).toFixed(1),
          beforeSize: before.size,
          afterSize: after.size,
          sizeReduction: before.size && after.size ? 
            ((before.size - after.size) / before.size * 100).toFixed(1) : 'N/A'
        };
        
        improvements.push(improvement);
      }
    }
    
    this.testResults.improvements = improvements;
  }

  // Generate performance report
  generateReport() {
    console.log('\n📈 PERFORMANCE REPORT - 100acress.com CDN Test');
    console.log('=' .repeat(60));
    
    if (this.testResults.improvements.length > 0) {
      console.log('\n🎯 IMAGE LOAD TIME COMPARISON:');
      console.log('Image'.padEnd(30) + 'Before'.padEnd(12) + 'After'.padEnd(12) + 'Improvement');
      console.log('-'.repeat(60));
      
      this.testResults.improvements.forEach(improvement => {
        const image = improvement.image.padEnd(30);
        const before = `${improvement.beforeLoadTime.toFixed(0)}ms`.padEnd(12);
        const after = `${improvement.afterLoadTime.toFixed(0)}ms`.padEnd(12);
        const improvementText = `${improvement.improvementPercent}% 🚀`;
        
        console.log(image + before + after + improvementText);
      });
      
      // Calculate averages
      const avgBefore = this.testResults.improvements.reduce((sum, imp) => sum + imp.beforeLoadTime, 0) / this.testResults.improvements.length;
      const avgAfter = this.testResults.improvements.reduce((sum, imp) => sum + imp.afterLoadTime, 0) / this.testResults.improvements.length;
      const avgImprovement = ((avgBefore - avgAfter) / avgBefore * 100).toFixed(1);
      
      console.log('\n📊 AVERAGE PERFORMANCE:');
      console.log(`Before CDN: ${avgBefore.toFixed(0)}ms`);
      console.log(`After CDN:  ${avgAfter.toFixed(0)}ms`);
      console.log(`Average Improvement: ${avgImprovement}% 🎉`);
      
      // Size comparison
      const totalBefore = this.testResults.improvements.reduce((sum, imp) => sum + (imp.beforeSize || 0), 0);
      const totalAfter = this.testResults.improvements.reduce((sum, imp) => sum + (imp.afterSize || 0), 0);
      
      if (totalBefore > 0 && totalAfter > 0) {
        const sizeReduction = ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1);
        console.log(`\n📦 SIZE COMPARISON:`);
        console.log(`Before: ${(totalBefore / 1024 / 1024).toFixed(2)}MB`);
        console.log(`After:  ${(totalAfter / 1024 / 1024).toFixed(2)}MB`);
        console.log(`Size Reduction: ${sizeReduction}% 💾`);
      }
      
    } else {
      console.log('\n⚠️ No CDN comparison data available.');
      console.log('Make sure REACT_APP_CDN_URL is configured to test CDN performance.');
    }
    
    // Recommendations
    this.generateRecommendations();
  }

  // Generate performance recommendations
  generateRecommendations() {
    console.log('\n💡 PERFORMANCE RECOMMENDATIONS:');
    
    const avgLoadTime = this.testResults.improvements.length > 0 ?
      this.testResults.improvements.reduce((sum, imp) => sum + imp.beforeLoadTime, 0) / this.testResults.improvements.length : 0;
    
    if (avgLoadTime > 1000) {
      console.log('🔴 CRITICAL: Images taking >1s to load');
      console.log('   → Implement image compression immediately');
      console.log('   → Use WebP format with 80-85% quality');
    }
    
    if (avgLoadTime > 500) {
      console.log('🟡 WARNING: Images taking >500ms to load');
      console.log('   → Consider lazy loading for below-fold images');
      console.log('   → Implement responsive images with srcset');
    }
    
    if (avgLoadTime < 200) {
      console.log('🟢 EXCELLENT: Images loading quickly');
      console.log('   → CDN is working effectively');
      console.log('   → Consider preloading critical images');
    }
    
    // Check for the 8.3MB image specifically
    const largeImage = this.testResults.improvements.find(imp => imp.image.includes('downtown-city'));
    if (largeImage && largeImage.beforeLoadTime > 2000) {
      console.log('🔴 URGENT: The downtown image (8.3MB) is causing performance issues');
      console.log('   → Compress to <500KB immediately');
      console.log('   → Consider using a smaller hero image');
    }
  }

  // Test LCP (Largest Contentful Paint) impact
  async testLCPImpact() {
    console.log('\n🎯 Testing LCP (Largest Contentful Paint) impact...');
    
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcpEntry = entries[entries.length - 1]; // Last LCP entry
        
        console.log(`📊 LCP: ${lcpEntry.startTime.toFixed(0)}ms`);
        console.log(`🖼️ LCP Element: ${lcpEntry.element?.tagName || 'Unknown'}`);
        console.log(`🔗 LCP URL: ${lcpEntry.url || 'Unknown'}`);
        
        resolve({
          lcpTime: lcpEntry.startTime,
          element: lcpEntry.element?.tagName,
          url: lcpEntry.url
        });
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      
      // Fallback timeout
      setTimeout(() => {
        observer.disconnect();
        resolve({ lcpTime: null, element: null, url: null });
      }, 10000);
    });
  }

  // Export results for analysis
  exportResults() {
    const exportData = {
      timestamp: new Date().toISOString(),
      testResults: this.testResults,
      environment: {
        cdnConfigured: Boolean(process.env.REACT_APP_CDN_URL),
        cdnUrl: process.env.REACT_APP_CDN_URL || 'Not configured'
      }
    };
    
    // Create downloadable JSON
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `cdn-performance-test-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    console.log('📁 Test results exported to JSON file');
  }
}

// Auto-run test if in development mode
if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_PERFORMANCE_TESTING === 'true') {
  window.cdnPerformanceTest = new CDNPerformanceTest();
  
  // Run test after page loads
  window.addEventListener('load', () => {
    setTimeout(() => {
      window.cdnPerformanceTest.runCDNComparisonTest();
    }, 2000);
  });
}

export default CDNPerformanceTest;
