import axios from 'axios';
import { getApiBase } from './apiBase';

// Helper function to get the base URL with proper protocol
const getBaseUrl = () => {
  const base = getApiBase();
  // Ensure the URL has a protocol
  if (base.startsWith('http')) {
    return base;
  }
  // Default to https in production, http in development
  const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
  return `${protocol}//${base.replace(/^\/\//, '')}`;
};

// Create axios instance with defaults
const api = axios.create({
  // Ensure trailing slash so joining with 'path' works correctly
  baseURL: (() => {
    const b = getBaseUrl();
    return b.endsWith('/') ? b : `${b}/`;
  })(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Do NOT send credentials by default; enable per request when token exists
  withCredentials: false,
  crossDomain: true,
  // Add this to handle CORS credentials properly
  withXSRFToken: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('myToken') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token.replace(/^"|"$/g, '')}`;
      // Only send credentials when we actually authenticate
      config.withCredentials = true;
    }

    // If sending FormData, let the browser set the proper multipart boundaries
    if (config.data instanceof FormData) {
      try {
        delete config.headers['Content-Type'];
      } catch (_) {}

    }
    // Normalize base join: keep absolute URLs untouched
    const url = typeof config.url === 'string' ? config.url : '';
    if (url && !/^https?:\/\//i.test(url)) {
      // Ensure instance baseURL has trailing slash, and do not duplicate slashes
      const base = (api.defaults.baseURL || '').replace(/\/+$/, '');
      config.baseURL = url.startsWith('/') ? base : `${base}/`;
    }
    
    // Add cache-busting parameter for GET requests
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(), // Add timestamp to prevent caching
      };
    }
    
    if (process.env.NODE_ENV !== 'production') {
      console.log(`%c ${config.method?.toUpperCase()} ${config.url}`, 
        'color: white; background-color: #2274A5; padding: 2px 5px; border-radius: 3px;');
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle CORS errors
    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error:', error.message);
      // Optionally show a user-friendly message
      // You can add a notification system call here
    }
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('myToken');
      localStorage.removeItem('token');
      // Redirect to login or show login modal
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
