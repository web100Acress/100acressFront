const DEFAULT_BASE = (() => {
  try {
    if (typeof window !== 'undefined') {
      const isHttps = window.location.protocol === 'https:';
      const isLocalhost = /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(window.location.hostname);
      
      if (!isHttps && isLocalhost) {
        console.log('Using Vite proxy /api for local development');
        return '/api';
      }
      
      if (isHttps || !isLocalhost) {
        console.log('Using production API: https://api.100acress.com');
        return 'https://api.100acress.com';
      }
    }
    
    console.log('Using default API base: http://localhost:3500');
    return 'http://localhost:3500';
  } catch (error) {
    console.error('Error determining API base URL:', error);
    return 'http://localhost:3500';
  }
})();

const getApiBase = () => {
  try {
    if (typeof window !== 'undefined') {
      const isHttps = window.location.protocol === 'https:';
      const isLocalhost = /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(window.location.hostname);
      if (!isHttps && isLocalhost) {
        return '/api';
      }
    }
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('apiBase') : null;
    let base = stored || DEFAULT_BASE;
    if (typeof base === 'string') {
      base = base.trim();
      if (base.length > 1 && base.endsWith('/')) base = base.slice(0, -1);
      if (base === 'api') base = '/api';
      if (base.startsWith('//')) base = base.replace(/^\/+/g, '/');
      if (base === '/api/api') base = '/api';
      if (base.startsWith('/api/api')) base = '/api' + base.slice('/api/api'.length);
      if (base === '' || base === '/') base = DEFAULT_BASE;
    }
    console.log('Using API base:', base);
    return base;
  } catch (error) {
    console.error('Error getting API base URL:', error);
    return DEFAULT_BASE;
  }
};

const setApiBase = (url) => {
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

const clearApiBaseOverride = () => {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('apiBase');
      console.log('API base URL override cleared');
    }
  } catch (error) {
    console.error('Error clearing API base URL override:', error);
  }
};

const testLiveApi = async () => {
  try {
    console.log('Testing connection to live API...');
    const response = await fetch('https://api.100acress.com/health');
    const data = await response.json();
    console.log('Live API response:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error connecting to live API:', error);
    return { 
      success: false, 
      error: error.message,
      suggestion: 'Please check if the API server is running and CORS is properly configured.'
    };
  }
};

// Run the test when this module is imported
testLiveApi().then(result => {
  if (result.success) {
    console.log(' Live API is accessible');
  } else {
    console.error(' Could not connect to live API:', result.error);
  }
});

export { getApiBase, setApiBase, clearApiBaseOverride, testLiveApi };
