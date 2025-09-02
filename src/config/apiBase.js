const DEFAULT_BASE = (() => {
  try {
    if (typeof window !== 'undefined') {
      const isHttps = window.location.protocol === 'https:';
      const isLocalhost = /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(window.location.hostname);
      
      // In local dev over HTTP, use Vite proxy
      if (!isHttps && isLocalhost) {
        console.log('Using Vite proxy /api for local development');
        return '/api';
      }
      
      // For production or HTTPS, use the production API
      if (isHttps || !isLocalhost) {
        console.log('Using production API: https://api.100acress.com');
        return 'https://api.100acress.com';
      }
    }
    
    // Fallback for non-browser environments
    console.log('Using default API base: http://localhost:3500');
    return 'http://localhost:3500';
  } catch (error) {
    console.error('Error determining API base URL:', error);
    return 'http://localhost:3500'; // Fallback
  }
})();

export const getApiBase = () => {
  try {
    // If running on HTTP localhost, always use Vite proxy '/api' and ignore overrides
    if (typeof window !== 'undefined') {
      const isHttps = window.location.protocol === 'https:';
      const isLocalhost = /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(window.location.hostname);
      if (!isHttps && isLocalhost) {
        return '/api';
      }
    }
    // Check for override in localStorage
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('apiBase') : null;
    let base = stored || DEFAULT_BASE;
    if (typeof base === 'string') {
      base = base.trim();
      // Remove trailing slash
      if (base.length > 1 && base.endsWith('/')) base = base.slice(0, -1);
      // Normalize common mistakes that create double '/api'
      if (base === 'api') base = '/api';
      if (base.startsWith('//')) base = base.replace(/^\/+/g, '/');
      if (base === '/api/api') base = '/api';
      if (base.startsWith('/api/api')) base = '/api' + base.slice('/api/api'.length);
      // If someone stored just '' or '/' fallback
      if (base === '' || base === '/') base = DEFAULT_BASE;
    }
    console.log('Using API base:', base);
    return base;
  } catch (error) {
    console.error('Error getting API base URL:', error);
    return DEFAULT_BASE;
  }
};

export const setApiBase = (url) => {
  try {
    if (typeof window !== 'undefined') {
      if (url) {
        window.localStorage.setItem('apiBase', url);
        console.log('API base URL overridden to:', url);
      } else {
        clearApiBaseOverride();
      }
    }
  } catch (error) {
    console.error('Error setting API base URL:', error);
  }
};

export const clearApiBaseOverride = () => {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('apiBase');
      console.log('API base URL override cleared');
    }
  } catch (error) {
    console.error('Error clearing API base URL override:', error);
  }
};
