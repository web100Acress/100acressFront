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

  // Set initial baseURL
  axios.defaults.baseURL = getApiBase();

  // Attach token automatically
  axios.interceptors.request.use((config) => {
    try {
      const token = window.localStorage.getItem('myToken');
      if (token) {
        config.headers = config.headers || {};
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch {}

    const base = getApiBase();

    // Rewrite hardcoded full URLs that point to the old live domain
    const full = typeof config.url === 'string' ? config.url : '';
    if (full.startsWith('http')) {
      // If it's pointing to api.100acress.com, rewrite to current base
      if (full.startsWith('')) {
        const path = extractPath(full);
        config.url = path.startsWith('/') ? path : `/${path}`;
        config.baseURL = base;
      }
    } else {
      // Relative URL: ensure baseURL is current
      config.baseURL = base;
    }

    return config;
  });
}

export function refreshAxiosBase() {
  // Update default base for future requests
  axios.defaults.baseURL = getApiBase();
}
