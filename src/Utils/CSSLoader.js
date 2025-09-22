/**
 * CSS Loader Utility for optimizing render-blocking CSS
 * Loads CSS asynchronously to improve LCP and FCP
 */

export class CSSLoader {
  constructor() {
    this.loadedStyles = new Set();
    this.loadingPromises = new Map();
  }

  /**
   * Load CSS asynchronously with fallback
   * @param {string} href - CSS file URL
   * @param {Object} options - Loading options
   * @returns {Promise} - Promise that resolves when CSS is loaded
   */
  async loadCSS(href, options = {}) {
    const {
      media = 'all',
      onLoad = null,
      onError = null,
      timeout = 5000
    } = options;

    // Return existing promise if already loading
    if (this.loadingPromises.has(href)) {
      return this.loadingPromises.get(href);
    }

    // Return immediately if already loaded
    if (this.loadedStyles.has(href)) {
      return Promise.resolve();
    }

    const loadPromise = new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = media;
      
      // Set up timeout
      const timeoutId = setTimeout(() => {
        reject(new Error(`CSS load timeout: ${href}`));
      }, timeout);

      link.onload = () => {
        clearTimeout(timeoutId);
        this.loadedStyles.add(href);
        if (onLoad) onLoad();
        resolve();
      };

      link.onerror = () => {
        clearTimeout(timeoutId);
        if (onError) onError();
        reject(new Error(`Failed to load CSS: ${href}`));
      };

      // Use print media trick for non-blocking load
      if (media === 'all') {
        link.media = 'print';
        link.onload = () => {
          clearTimeout(timeoutId);
          link.media = 'all';
          this.loadedStyles.add(href);
          if (onLoad) onLoad();
          resolve();
        };
      }

      document.head.appendChild(link);
    });

    this.loadingPromises.set(href, loadPromise);
    return loadPromise;
  }

  /**
   * Load multiple CSS files in parallel
   * @param {Array} hrefs - Array of CSS URLs
   * @param {Object} options - Loading options
   * @returns {Promise} - Promise that resolves when all CSS is loaded
   */
  async loadMultipleCSS(hrefs, options = {}) {
    const promises = hrefs.map(href => this.loadCSS(href, options));
    return Promise.allSettled(promises);
  }

  /**
   * Preload CSS without applying it
   * @param {string} href - CSS file URL
   */
  preloadCSS(href) {
    if (this.loadedStyles.has(href)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    link.onload = () => {
      link.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  }

  /**
   * Load critical CSS inline
   * @param {string} css - CSS content
   * @param {string} id - Unique identifier for the style element
   */
  loadInlineCSS(css, id = 'critical-css') {
    if (document.getElementById(id)) return;

    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
  }

  /**
   * Remove CSS by href
   * @param {string} href - CSS file URL
   */
  removeCSS(href) {
    const link = document.querySelector(`link[href="${href}"]`);
    if (link) {
      link.remove();
      this.loadedStyles.delete(href);
    }
  }

  /**
   * Check if CSS is loaded
   * @param {string} href - CSS file URL
   * @returns {boolean}
   */
  isLoaded(href) {
    return this.loadedStyles.has(href);
  }
}

// Create global instance
export const cssLoader = new CSSLoader();

// Auto-load critical CSS on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    // Load non-critical CSS after page load
    const nonCriticalCSS = [
      // Add non-critical CSS files here
    ];
    
    nonCriticalCSS.forEach(href => {
      cssLoader.loadCSS(href, {
        media: 'all',
        onLoad: () => console.log(`Loaded CSS: ${href}`),
        onError: () => console.warn(`Failed to load CSS: ${href}`)
      });
    });
  });
}
