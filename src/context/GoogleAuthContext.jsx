import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import googleAuthClient from '../config/googleAuthClient';
import apiClient, { setAccessTokenMem, clearAccessTokenMem } from '../config/apiClient';

const GoogleAuthContext = createContext({});

export const GoogleAuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = useCallback(async (credential) => {
    try {
      setLoading(true);
      setError(null);
      
      // Prevent session hijack by old refresh token: clear tokens and logout first
      try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('myToken');
        delete apiClient.defaults.headers.common['Authorization'];
        await apiClient.post('auth/logout'); // ignore errors if not logged in
      } catch (_) {}

      const response = await googleAuthClient.post('auth/google', { 
        credential 
      });
      
      const { token, user } = response.data;
      
      if (!token) {
        throw new Error('No authentication token received');
      }
      
      // Store token in memory only (no localStorage persistence)
      setAccessTokenMem(token);
      
      // Set default authorization header for future requests
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      message.success('Successfully logged in with Google!');
      // Ensure redirect even if caller forgets to navigate
      try { navigate('/'); } catch (_) {}
      // Do not hard-reload; tokens are in-memory and would be lost on refresh
      return { success: true, user };
      
    } catch (err) {
      console.error('Google login error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to login with Google';
      setError(errorMessage);
      message.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGoogleLogout = useCallback(async () => {
    try {
      setLoading(true);
      await apiClient.post('auth/logout');
      // Clear all token storages
      try { clearAccessTokenMem(); } catch {}
      localStorage.removeItem('myToken');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      delete apiClient.defaults.headers.common['Authorization'];
      message.success('Successfully logged out');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      message.error('Failed to logout');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return (
    <GoogleAuthContext.Provider
      value={{
        loading,
        error,
        handleGoogleLogin,
        handleGoogleLogout,
      }}
    >
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => {
  const context = useContext(GoogleAuthContext);
  if (context === undefined) {
    throw new Error('useGoogleAuth must be used within a GoogleAuthProvider');
  }
  return context;
};

export default GoogleAuthContext;
