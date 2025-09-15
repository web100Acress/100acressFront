import axios from 'axios';
import { getApiBase } from './apiBase';

// Create a dedicated axios instance for Google OAuth requests
// Normalize baseURL to ALWAYS end with a trailing slash so path-only URLs like 'auth/google/callback'
// become '/api/auth/google/callback' in dev via Vite proxy
const normalizedBase = (() => {
  const base = getApiBase() || '';
  return base.endsWith('/') ? base : base + '/';
})();

const googleAuthClient = axios.create({
  baseURL: normalizedBase,
  withCredentials: true, // Important for cookies/sessions
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// No Authorization header needed for Google OAuth calls
googleAuthClient.interceptors.request.use((config) => config, (error) => Promise.reject(error));

// Response interceptor to handle common errors
googleAuthClient.interceptors.response.use((response) => response, (error) => Promise.reject(error));

export default googleAuthClient;
