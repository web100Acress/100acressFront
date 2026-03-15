// Vite plugin to extract critical CSS and defer non-critical styles
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export function criticalCSSPlugin(options = {}) {
  const {
    criticalPath = 'src/styles/critical.css',
    nonCriticalPath = 'src/styles/non-critical.css'
  } = options;

  return {
    name: 'critical-css',
    generateBundle(options, bundle) {
      // Find the main CSS file
      const cssFiles = Object.entries(bundle).filter(([_, chunk]) => 
        chunk.type === 'asset' && chunk.fileName.endsWith('.css')
      );

      if (cssFiles.length === 0) return;

      const [fileName, chunk] = cssFiles[0];
      const cssContent = chunk.source;

      // Define critical CSS selectors (above-the-fold content)
      const criticalSelectors = [
        // Layout and structure
        'html', 'body', '#root',
        // Header and navigation
        '.navbar', '.nav-desktop', '.nav-mobile',
        // Hero section
        '.hero-section', '.hero-title', '.hero-subtitle',
        // Loading states
        '.loading-spinner', '.skeleton',
        // Essential buttons
        '.btn-primary', '.btn-whatsapp',
        // Core utilities
        '.container', '.row', '.col',
        // Fonts and typography
        '.font-primary', '.text-white', '.text-dark'
      ];

      // Extract critical CSS
      const criticalCSS = extractCriticalCSS(cssContent, criticalSelectors);
      
      // Non-critical CSS is everything else
      const nonCriticalCSS = cssContent.replace(criticalCSS, '').trim();

      // Write critical CSS inline (will be handled by index.html)
      chunk.source = criticalCSS + '\n\n/* Non-critical CSS */\n' + nonCriticalCSS;

      // Create a separate non-critical CSS file for deferred loading
      this.emitFile({
        type: 'asset',
        fileName: 'non-critical.css',
        source: nonCriticalCSS
      });
    }
  };
}

function extractCriticalCSS(css, selectors) {
  // Simple regex-based extraction (in production, use a proper CSS parser)
  const lines = css.split('\n');
  const criticalLines = [];
  let inCriticalRule = false;

  for (const line of lines) {
    // Check if line contains a critical selector
    const hasCriticalSelector = selectors.some(selector => 
      line.includes(selector) || line.includes(`.${selector}`)
    );

    if (hasCriticalSelector) {
      inCriticalRule = true;
    }

    if (inCriticalRule) {
      criticalLines.push(line);
      
      // End of rule
      if (line.includes('}') && !line.includes('{')) {
        inCriticalRule = false;
      }
    }
  }

  return criticalLines.join('\n');
}
