import React from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../config/apiClient';
import { getApiBase } from '../config/apiBase';

// Token storage keys
const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// Token utilities
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const setTokens = ({ accessToken, refreshToken }) => {
  if (accessToken) localStorage.setItem(TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// Token validation
export const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

// Authentication state
export const isAuthenticated = () => {
  const token = getToken();
  return isTokenValid(token);
};

// User roles and permissions
export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const { role } = jwtDecode(token);
    return role || 'user';
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
};

export const hasRole = (requiredRole) => {
  const userRole = getUserRole();
  if (!userRole) return false;
  
  // Role hierarchy (if needed)
  const roleHierarchy = {
    admin: ['admin', 'editor', 'user'],
    editor: ['editor', 'user'],
    user: ['user']
  };
  
  return roleHierarchy[userRole]?.includes(requiredRole) || false;
};

// Authentication actions
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { accessToken, refreshToken, user } = response.data.data;
    
    setTokens({ accessToken, refreshToken });
    return { success: true, user };
  } catch (error) {
    console.error('Login failed:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || 'Login failed. Please try again.' 
    };
  }
};

export const logout = async () => {
  try {
    // Call the backend to invalidate the refresh token
    await api.post('/auth/logout', {}, { withCredentials: true });
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear tokens and redirect to login
    clearTokens();
    window.location.href = '/login';
  }
};

// Google OAuth
export const initiateGoogleLogin = () => {
  // This URL should match your backend's Google OAuth endpoint
  const base = getApiBase() || '';
  const noTrailing = base.endsWith('/') ? base.slice(0, -1) : base;
  window.location.href = `${noTrailing}/auth/google`;
};

// Token refresh
export const refreshAccessToken = async () => {
  try {
    const response = await api.post(
      '/auth/refresh-token',
      {},
      { withCredentials: true }
    );
    
    const { accessToken } = response.data.data;
    if (accessToken) {
      setTokens({ accessToken });
      return accessToken;
    }
    return null;
  } catch (error) {
    console.error('Token refresh failed:', error);
    logout();
    return null;
  }
};

// Protected route component
export const withAuth = (Component, requiredRole = null) => {
  return (props) => {
    const isAuth = isAuthenticated();
    const hasRequiredRole = requiredRole ? hasRole(requiredRole) : true;
    
    if (!isAuth) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return null;
    }
    
    if (requiredRole && !hasRequiredRole) {
      // Redirect to unauthorized page if role doesn't match
      window.location.href = '/unauthorized';
      return null;
    }
    
    // Avoid JSX in .js file to ensure Vite/Babel doesn't need JSX transform here
    return React.createElement(Component, props);
  };
};
