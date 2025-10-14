import axios from 'axios';
import { getApiBase } from './apiBase';

let initialized = false;

function extractPath(url) {
  try {
    const u = new URL(url);
    return u.pathname + (u.search || '') + (u.hash || '');
  } catch {
    return url; // relative URL or invalid -> return as-is
  }
}

export function initAxios() {
  if (initialized) return;
  initialized = true;

  // Do NOT set a global default baseURL; we will decide per-request.

  // Attach token automatically
  axios.interceptors.request.use((config) => {
    try {
      const stored = window.localStorage.getItem('myToken');
      // Support both raw token and JSON-stringified token
      let token = stored;
      if (stored && stored.startsWith('"') && stored.endsWith('"')) {
        try { token = JSON.parse(stored); } catch {}
      }
      if (token) {
        config.headers = config.headers || {};
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch {}

    const base = getApiBase();

    // Apply baseURL for any non-absolute URL (including ones starting with '/').
    // Absolute URLs (http/https) are left untouched.
    const full = typeof config.url === 'string' ? config.url : '';
    if (full && !/^https?:\/\//i.test(full)) {
      // Normalize base by removing trailing slashes first
      const normalizedBase = (base || '').replace(/\/+$/, '');
      // If URL starts with '/', keep it as-is; otherwise add a separator '/'
      config.baseURL = full.startsWith('/')
        ? normalizedBase
        : `${normalizedBase}/`;
    }

    // Dev-only diagnostics: show final resolved URL
    try {
      const env = (process.env.NODE_ENV || '').toLowerCase();
      if (env !== 'production') {
        const finalUrl = `${config.baseURL || ''}${typeof config.url === 'string' ? config.url : ''}`;
        // eslint-disable-next-line no-console
        console.debug('[axios request]', { method: (config.method || 'GET').toUpperCase(), base: config.baseURL, url: config.url, finalUrl });
      }
    } catch {}

    return config;
  });
}

export function refreshAxiosBase() {
  // No-op: we compute base per request now.
}
