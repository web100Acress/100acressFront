import axios from 'axios';
import { getApiBase } from './apiBase';

// Create a shared axios instance using centralized base URL
const api = axios.create({
  baseURL: getApiBase(),
});

// Attach Authorization header automatically if token exists
api.interceptors.request.use((config) => {
  try {
    const token = window.localStorage.getItem('myToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

export default api;
