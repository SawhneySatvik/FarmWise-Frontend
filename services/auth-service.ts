"use client";

import { ApiService } from './api';

// Types
export interface RegisterData {
  username: string;
  phone_number: string;
  password: string;
  email?: string;
  preferred_language?: string;
  state?: string;
  district?: string;
  village?: string;
  farm_size?: number;
  farm_size_unit?: string;
}

export interface LoginData {
  phone_number?: string;
  email?: string;
  username?: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    username: string;
    phone_number: string;
    email?: string;
  };
  message: string;
  access_token: string;
}

export interface UserProfile {
  id: number;
  username: string;
  phone_number: string;
  email?: string;
  full_name?: string;
  preferred_language?: string;
  state?: string;
  district?: string;
  village?: string;
  farm_size?: number;
  farm_size_unit?: string;
  crops?: string[];
  livestock?: string[];
  is_active: boolean;
  created_at: string;
  last_login?: string;
}

/**
 * Authentication Service for handling auth-related API calls
 */
export class AuthService extends ApiService {
  /**
   * Register a new user
   */
  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>('/auth/register', userData);

    // Save token on successful registration
    if (response.access_token) {
      this.setToken(response.access_token);
    }

    return response;
  }

  /**
   * Login a user
   */
  async login(credentials: LoginData): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>('/auth/login', credentials);

    // Save token on successful login
    if (response.access_token) {
      this.setToken(response.access_token);
    }

    return response;
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<UserProfile> {
    return this.get<UserProfile>('/auth/profile');
  }

  /**
   * Update user profile
   */
  async updateProfile(profileData: Partial<UserProfile>): Promise<{ message: string; user: UserProfile }> {
    return this.put<{ message: string; user: UserProfile }>('/auth/profile', profileData);
  }

  /**
   * Check if token is valid
   */
  async checkToken(): Promise<{ valid: boolean; user_id: number }> {
    return this.get<{ valid: boolean; user_id: number }>('/auth/check-token');
  }

  /**
   * Logout the current user (client-side only)
   */
  logout(): void {
    this.removeToken();
  }

  /**
   * Check if user is authenticated (has token)
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService; 