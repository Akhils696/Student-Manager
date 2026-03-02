import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// Custom hook for authentication state
export const useAuthState = () => {
  const [authState, setAuthState] = useState({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: true,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Verify token and get user info
          const response = await api.get('/auth/profile');
          setAuthState({
            user: response.data,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem('token');
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
        }));
      }
    };

    initializeAuth();
  }, []);

  return authState;
};

// Custom hook for authentication actions
export const useAuthActions = () => {
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      
      // Update any global state as needed
      
      return { success: true, user, token };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      
      return { success: true, user, token };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    // Update any global state as needed
    navigate('/login');
  };

  const forgotPassword = async (email) => {
    try {
      await api.post('/auth/forgot-password', { email });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send reset link';
      return { success: false, error: message };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      await api.post(`/auth/reset-password/${token}`, { password: newPassword });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to reset password';
      return { success: false, error: message };
    }
  };

  return {
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  };
};

// Custom hook to protect routes
export const useProtectedRoute = () => {
  const authState = useAuthState();
  
  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated) {
      window.location.href = '/login';
    }
  }, [authState.isAuthenticated, authState.isLoading]);

  return authState;
};