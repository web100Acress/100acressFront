import axios from 'axios';
import { getApiBase } from './apiBase';

// Helper function to get the base URL with proper protocol
const getBaseUrl = () => {
  try {
    let base = getApiBase();
    
    // If no protocol specified, add http/https based on environment
    if (!base.match(/^https?:\/\//)) {
      const isProduction = process.env.NODE_ENV === 'production';
      const protocol = isProduction ? 'https:' : 'http:';
      base = `${protocol}//${base}`;
    }
    
    // Ensure we're using HTTPS in production
    if (process.env.NODE_ENV === 'production' && base.startsWith('http:')) {
      base = 'https:' + base.substring(5);
    }
    
    // Remove trailing slashes
    base = base.replace(/\/+$/, '');
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('Using API base URL:', base);
    }
    
    return base;
  } catch (error) {
    console.error('Error getting base URL:', error);
    // Fallback to current origin with /api
    return window.location.origin + '/api';
  }
};

// Helper function to determine the base URL
const getApiBaseUrl = () => {
  // Use VITE_API_URL if available (set in .env), otherwise fallback to VITE_API_BASE or default
  return import.meta.env.VITE_API_URL || 
         import.meta.env.VITE_API_BASE || 
         (import.meta.env.PROD ? 'https://api.100acress.com' : 'http://localhost:3500');
};

// Create axios instance with defaults
const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // CORS configuration
  withCredentials: true,
  // XSRF token configuration
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

// Simple rate limiting to prevent infinite requests
const requestTracker = new Map();
const RATE_LIMIT_WINDOW = 1000; // 1 second
const MAX_REQUESTS_PER_WINDOW = 5;

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Skip interceptor for external URLs
    if (config.url.startsWith('http')) {
      return config;
    }

    // Rate limiting check
    const requestKey = `${config.method?.toUpperCase()}_${config.url}`;
    const now = Date.now();
    const requests = requestTracker.get(requestKey) || [];
    
    // Remove old requests outside the window
    const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
    
    if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
      console.warn(`Rate limit exceeded for ${requestKey}. Blocking request.`);
      return Promise.reject(new Error('Rate limit exceeded'));
    }
    
    // Track this request
    recentRequests.push(now);
    requestTracker.set(requestKey, recentRequests);

    // Ensure URL is properly formatted
    if (typeof config.url === 'string') {
      // Remove leading/trailing slashes to prevent double slashes
      config.url = config.url.replace(/^\/+|\/+$/g, '');
    }

    // Add auth token if exists
    const token = localStorage.getItem('myToken') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token.replace(/^"|"$/g, '')}`;
      config.withCredentials = true;
    }

    // Handle FormData (for file uploads)
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']; // Let browser set the boundary
      
      // Add cache busting for file uploads
      if (config.params) {
        config.params._ = Date.now();
      } else {
        config.params = { _: Date.now() };
      }
    }

    // Log the request in development
    if (process.env.NODE_ENV !== 'production') {
      console.groupCollapsed(`%c ${config.method?.toUpperCase()} ${config.url}`, 
        'background: #2196F3; color: white; padding: 2px 8px; border-radius: 4px;');
      console.log('Request:', {
        baseURL: config.baseURL,
        url: config.url,
        method: config.method,
        headers: config.headers,
        params: config.params,
        data: config.data
      });
      console.groupEnd();
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject({
      ...error,
      message: error.message || 'Request failed',
      config: error.config,
      isAxiosError: true
    });
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.NODE_ENV !== 'production') {
      console.groupCollapsed(`%c ${response.status} ${response.config.url}`, 
        'background: #4CAF50; color: white; padding: 2px 8px; border-radius: 4px;');
      console.log('Response:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        headers: response.headers
      });
      console.groupEnd();
    }
    
    // Handle empty responses
    if (response.status === 204) {
      return { ...response, data: { success: true } };
    }
    
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Log the error in development
    if (process.env.NODE_ENV !== 'production') {
      console.groupCollapsed(`%c ${error.response?.status || 'NETWORK_ERR'} ${originalRequest?.url || ''}`, 
        'background: #F44336; color: white; padding: 2px 8px; border-radius: 4px;');
      
      if (error.response) {
        // Server responded with a status code outside 2xx
        console.error('Response Error:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers
        });
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Request setup error:', error.message);
      }
      
      console.groupEnd();
    }

    // Handle network errors
    if (error.code === 'ERR_NETWORK' || !error.response) {
      console.error('Network Error - Please check your connection and try again');
      return Promise.reject({
        ...error,
        message: 'Network Error: Unable to connect to the server. Please check your internet connection.',
        isNetworkError: true
      });
    }
    
    const { status } = error.response;
    
    // Handle 401 Unauthorized
    if (status === 401) {
      // Clear auth data
      localStorage.removeItem('myToken');
      localStorage.removeItem('token');
      
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
        window.location.href = `/login?returnUrl=${returnUrl}`;
      }
      
      return Promise.reject({
        ...error,
        message: 'Your session has expired. Please log in again.',
        isUnauthorized: true
      });
    }
    
    // Handle rate limiting (429) and service unavailable (503)
    if (status === 429 || status === 503) {
      const retryAfter = parseInt(error.response.headers?.['retry-after']) || 1;
      const retryCount = originalRequest.__retryCount || 0;
      const maxRetries = 3;
      
      if (retryCount < maxRetries) {
        originalRequest.__retryCount = retryCount + 1;
        
        // Exponential backoff with jitter
        const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
        const jitter = Math.random() * 1000;
        const backoff = delay + jitter;
        
        console.warn(`Retrying request (${retryCount + 1}/${maxRetries}) after ${backoff}ms`);
        
        return new Promise(resolve => {
          setTimeout(() => resolve(api(originalRequest)), backoff);
        });
      }
      
      return Promise.reject({
        ...error,
        message: 'Server is busy. Please try again later.',
        isRetryError: true
      });
    }
    
    // Handle other error statuses
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        'An unexpected error occurred';
    
    return Promise.reject({
      ...error,
      message: errorMessage,
      status: status,
      response: error.response,
      isAxiosError: true
    });
  }
);

export default api;
