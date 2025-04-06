"use client"

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authService } from '@/services';

// Types
export interface User {
  id: number;
  username: string;
  phone_number: string;
  email?: string;
  farm_location?: string;
  farm_size?: number;
  crops?: string[];
  livestock?: string[];
  soil_type?: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (phoneNumber: string, password: string) => Promise<void>;
  register: (username: string, phoneNumber: string, password: string, email?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: async () => {}
});

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const userData = await authService.getProfile();
          setUser(userData);
        } catch (err) {
          // Token is invalid or expired
          authService.logout();
          console.error('Authentication error:', err);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (phoneNumber: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login({ phone_number: phoneNumber, password });
      const userData = await authService.getProfile();
      setUser(userData);
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (username: string, phoneNumber: string, password: string, email?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register({ 
        username, 
        phone_number: phoneNumber, 
        password,
        ...(email && { email })
      });
      const userData = await authService.getProfile();
      setUser(userData);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Update profile
  const updateProfile = async (data: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.updateProfile(data);
      setUser(response.user);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper to check if user is authenticated (for page guards)
export function requireAuth(redirectTo = '/') {
  const { user, loading } = useAuth();
  
  // If not authenticated and not loading, redirect
  if (!user && !loading) {
    if (typeof window !== 'undefined') {
      window.location.href = redirectTo;
    }
    return false;
  }
  
  return true;
} 