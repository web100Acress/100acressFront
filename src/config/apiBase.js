const DEFAULT_BASE = (() => {
  if (typeof window !== 'undefined') {
    const isHttps = window.location.protocol === 'https:';
    const isLocalhost = /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(window.location.hostname);
    // In local dev over HTTP, use Vite proxy
    if (!isHttps && isLocalhost) {
      return '/api';
    }
    if (isHttps || !isLocalhost) {
      return 'https://api.100acress.com';
    }
  }
  return 'http://localhost:3500';
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
    return base;
  } catch {
    return DEFAULT_BASE;
  }
};

export const setApiBase = (url) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('apiBase', url);
  }
};

export const clearApiBaseOverride = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('apiBase');
  }
};
