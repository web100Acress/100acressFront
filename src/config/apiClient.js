import axios from 'axios';
import { getApiBase } from './apiBase';

// Create a shared axios instance using centralized base URL
const api = axios.create({
  baseURL: getApiBase(),
});


api.interceptors.request.use((config) => {
  try {
    // Always refresh baseURL so localStorage overrides apply without reload
    const base = getApiBase();
    const full = typeof config.url === 'string' ? config.url : '';
    if (full && !/^https?:\/\//i.test(full)) {
      // Only set base for relative URLs
      config.baseURL = base;
    }

    // Robust token extraction (handles JSON-quoted values) from myToken or token
    const storedPrimary = window.localStorage.getItem('myToken');
    const storedFallback = window.localStorage.getItem('token');
    let token = storedPrimary || storedFallback || '';
    // Unquote JSON-quoted values
    if (token && token.startsWith('"') && token.endsWith('"')) {
      try { token = JSON.parse(token); } catch {}
    }
    // Normalize accidental prefixes and whitespace
    if (typeof token === 'string') {
      token = token.trim();
      if (/^Bearer\s+/i.test(token)) {
        token = token.replace(/^Bearer\s+/i, '').trim();
      }
      // Remove any stray quotes inside
      token = token.replace(/"/g, '');
    }
    if (token) {
      config.headers = config.headers || {};
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Dev diagnostics: log final resolved URL
    try {
      const env = (process.env.NODE_ENV || '').toLowerCase();
      if (env !== 'production') {
        const finalUrl = `${config.baseURL || ''}${typeof config.url === 'string' ? config.url : ''}`;
        // eslint-disable-next-line no-console
        console.debug('[api request]', { method: (config.method || 'GET').toUpperCase(), base: config.baseURL, url: config.url, finalUrl });
      }
    } catch {}
  } catch {}
  return config;
});

export default api;

// Error diagnostics: log useful info on failures to help debugging
api.interceptors.response.use(
  (res) => res,
  (error) => {
    try {
      const cfg = error.config || {};
      const info = {
        message: error.message,
        code: error.code,
        method: (cfg.method || 'GET').toUpperCase(),
        baseURL: cfg.baseURL,
        url: cfg.url,
        finalUrl: `${cfg.baseURL || ''}${typeof cfg.url === 'string' ? cfg.url : ''}`,
        hasAuth: !!(cfg.headers && cfg.headers.Authorization),
        responseStatus: error.response && error.response.status,
        responseData: error.response && error.response.data,
      };
      // eslint-disable-next-line no-console
      console.error('[api error]', info);
    } catch {}
    return Promise.reject(error);
  }
);
