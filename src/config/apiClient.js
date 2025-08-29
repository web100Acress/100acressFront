import axios from 'axios';
import { getApiBase } from './apiBase';

// Create axios instance with defaults
const api = axios.create({
  baseURL: getApiBase(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('myToken') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token.replace(/^"|"$/g, '')}`;
    }
    
    if (process.env.NODE_ENV !== 'production') {
      console.log(`%c ${config.method?.toUpperCase()} ${config.url}`, 
        'color: white; background-color: #2274A5; padding: 2px 5px; border-radius: 3px;');
    }
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', {
        status: error.response.status,
        url: error.config.url,
        data: error.response.data
      });
    } else if (error.request) {
      // Request made but no response
      console.error('No response:', error.request);
    } else {
      // Other errors
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
