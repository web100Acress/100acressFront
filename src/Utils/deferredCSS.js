import React, { useMemo } from 'react';
// Utility to defer loading of non-critical CSS
export const loadCSSDeferred = (href, id, media = 'all') => {
  return new Promise((resolve, reject) => {
    // Check if stylesheet already exists
    if (document.getElementById(id)) {
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.id = id;
    link.media = media;
    
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
    
    // Add to head with low priority
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        document.head.appendChild(link);
      });
    } else {
      // Use requestIdleCallback for non-critical CSS
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
          document.head.appendChild(link);
        });
      } else {
        setTimeout(() => {
          document.head.appendChild(link);
        }, 100);
      }
    }
  });
};

// Load CSS on user interaction
export const loadCSSOnInteraction = (href, id, events = ['scroll', 'click', 'keydown']) => {
  const loadCSS = () => {
    loadCSSDeferred(href, id);
    events.forEach(event => {
      document.removeEventListener(event, loadCSS);
    });
  };
  
  events.forEach(event => {
    document.addEventListener(event, loadCSS, { once: true });
  });
};

// Load CSS after delay
export const loadCSSAfterDelay = (href, id, delay = 2000) => {
  setTimeout(() => {
    loadCSSDeferred(href, id);
  }, delay);
};

// Load CSS when element enters viewport
export const loadCSSOnIntersection = (href, id, selector, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  };
  
  const observerOptions = { ...defaultOptions, ...options };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadCSSDeferred(href, id);
        observer.disconnect();
      }
    });
  }, observerOptions);
  
  const element = document.querySelector(selector);
  if (element) {
    observer.observe(element);
  }
};

// Preload CSS without rendering
export const preloadCSS = (href, id) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  link.id = `${id}-preload`;
  
  document.head.appendChild(link);
  
  // Convert to actual stylesheet when needed
  link.onload = () => {
    link.rel = 'stylesheet';
  };
};

// Batch load multiple CSS files
export const loadCSSBatch = (styles) => {
  const promises = styles.map(style => {
    const { href, id, media, defer = false } = style;
    
    if (defer) {
      return loadCSSDeferred(href, id, media);
    } else {
      return new Promise((resolve) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.id = id;
        link.media = media || 'all';
        link.onload = resolve;
        document.head.appendChild(link);
      });
    }
  });
  
  return Promise.all(promises);
};

// Dynamic CSS loading for routes
export const loadRouteCSS = (routeName) => {
  const routeCSSMap = {
    '/home': '/css/home.css',
    '/about': '/css/about.css',
    '/contact': '/css/contact.css',
    '/properties': '/css/properties.css',
    '/blog': '/css/blog.css',
    '/admin': '/css/admin.css',
    '/banner': '/css/banner.css',
    '/project': '/css/project.css'
  };
  
  const cssHref = routeCSSMap[routeName];
  if (cssHref) {
    return loadCSSDeferred(cssHref, `route-${routeName}`);
  }
  
  return Promise.resolve();
};

// Remove CSS when no longer needed
export const unloadCSS = (id) => {
  const link = document.getElementById(id);
  if (link) {
    link.parentNode.removeChild(link);
  }
};

// Swap CSS (useful for theme switching)
export const swapCSS = (oldId, newHref, newId) => {
  const oldLink = document.getElementById(oldId);
  if (oldLink) {
    const newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.href = newHref;
    newLink.id = newId;
    newLink.media = oldLink.media;
    
    oldLink.parentNode.replaceChild(newLink, oldLink);
  }
};
