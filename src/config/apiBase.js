// Helper function to safely access process.env
const getEnv = (key, defaultValue = '') => {
  // In browser environment
  if (typeof window !== 'undefined') {
    // Check for Vite environment variables (prefixed with VITE_)
    if (import.meta.env && import.meta.env[`VITE_${key}`] !== undefined) {
      return import.meta.env[`VITE_${key}`];
    }
    // Check for Create React App environment variables (prefixed with REACT_APP_)
    if (process && process.env && process.env[`REACT_APP_${key}`] !== undefined) {
      return process.env[`REACT_APP_${key}`];
    }
    return defaultValue;
  }
  // In Node.js environment
  if (typeof process !== 'undefined' && process.env) {
    return process.env[`REACT_APP_${key}`] || defaultValue;
  }
  return defaultValue;
};

const DEFAULT_BASE = (() => {
  try {
    if (typeof window !== 'undefined') {
      const isHttps = window.location.protocol === 'https:';
      const isLocalhost = /^(localhost|127\.0\.0\.1|\[::1\]|192\.168|10\.|172\.(1[6-9]|2[0-9]|3[01]))/i.test(window.location.hostname);
      
      // In development or when running locally
      if (!isHttps && isLocalhost) {
        console.log('Using development API: http://localhost:3500');
        return 'http://localhost:3500';
      }
      
      // In production or when accessed via HTTPS
      console.log('Using production API: https://api.100acress.com');
      return 'https://api.100acress.com';
    }
    
    // Fallback for server-side rendering or other environments
    console.log('Using default API base: http://localhost:3500');
    return 'http://localhost:3500';
  } catch (error) {
    console.error('Error determining API base URL:', error);
    return 'http://localhost:3500';
  }
})();

// Get the current API base URL
export const getApiBase = () => {
  // Check for localStorage override
  if (typeof window !== 'undefined') {
    try {
      const override = localStorage.getItem('apiBaseOverride');
      if (override) {
        const parsed = JSON.parse(override);
        if (parsed && parsed.url) {
          return parsed.url;
        }
      }
    } catch (e) {
      console.warn('Error reading API base from localStorage:', e);
    }
  }
  
  // Get from environment variables or use default
  return getEnv('API_BASE') || DEFAULT_BASE;
};

// Set a custom API base URL (for development/testing)
export const setApiBase = (url) => {
  if (!url) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('apiBaseOverride');
    }
    return { success: true, message: 'API base reset to default' };
  }
  
  try {
    // Ensure the URL is properly formatted
    const urlObj = new URL(url);
    const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('apiBaseOverride', JSON.stringify({
        url: baseUrl,
        timestamp: Date.now()
      }));
    }
    
    return { 
      success: true, 
      message: `API base set to ${baseUrl}`,
      url: baseUrl
    };
  } catch (error) {
    console.error('Invalid API base URL:', error);
    return { 
      success: false, 
      message: 'Invalid URL. Please use format: http(s)://domain.com',
      error: error.message 
    };
  }
};

// Clear any API base override
export const clearApiBaseOverride = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('apiBaseOverride');
  }
  return { success: true, message: 'API base override cleared' };
};

// Test if the API is accessible
export const testLiveApi = async () => {
  const baseUrl = getApiBase();
  const testUrl = `${baseUrl.replace(/\/+$/, '')}/health`;
  
  try {
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      mode: 'cors'
    });
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('API test failed:', error);
    return { 
      success: false, 
      error: error.message,
      message: `Failed to connect to API at ${testUrl}`
    };
  }
};

// Only run the test in browser environment
if (typeof window !== 'undefined') {
  testLiveApi().then(result => {
    if (result.success) {
      console.log('✓ API is accessible at', getApiBase());
    } else {
      console.warn('⚠️ Could not connect to API at', getApiBase());
      console.warn('Error:', result.message);
    }
  }).catch(console.error);
}

// Export the current API base URL as a string
export const API_BASE = getApiBase();
