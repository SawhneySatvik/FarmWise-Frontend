"use client"

// API utility for making requests to the backend server

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Base API Service Class that all services will extend
export class ApiService {
  protected baseUrl = API_BASE_URL;
  
  // Helper to get authorization token
  protected getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }
  
  // Helper to set token
  protected setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }
  
  // Helper to remove token
  protected removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }
  
  // GET request
  protected async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    let url = `${this.baseUrl}${endpoint}`;
    
    if (params) {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, value.toString());
        }
      });
      const queryString = query.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    
    return this.request<T>(url, { method: 'GET' });
  }
  
  // POST request
  protected async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
  
  // PUT request
  protected async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
  
  // DELETE request
  protected async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
    });
  }
  
  // Base request method
  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}

// Generic fetch function with error handling
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  // Get token from localStorage if available
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('authToken');
  }

  // Set up headers
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle common error responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    // Parse JSON response
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Authentication APIs
export const authAPI = {
  register: async (userData: { username: string, phone_number: string, password: string, email?: string }) => {
    return fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: { phone_number: string, password: string }) => {
    return fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  getProfile: async () => {
    return fetchWithAuth('/auth/profile');
  },

  updateProfile: async (profileData: any) => {
    return fetchWithAuth('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// Chat APIs
export const chatAPI = {
  createSession: async () => {
    return fetchWithAuth('/chat/session', {
      method: 'POST',
    });
  },

  getSessions: async () => {
    return fetchWithAuth('/chat/sessions');
  },

  getSession: async (sessionId: string) => {
    return fetchWithAuth(`/chat/session/${sessionId}`);
  },

  sendMessage: async (sessionId: string, content: string) => {
    return fetchWithAuth(`/chat/session/${sessionId}/message`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  },

  getMessages: async (sessionId: string) => {
    return fetchWithAuth(`/chat/session/${sessionId}/messages`);
  },
};

// Market APIs
export const marketAPI = {
  getMarketsByLocation: async (params: { state?: string, district?: string }) => {
    const query = new URLSearchParams();
    if (params.state) query.append('state', params.state);
    if (params.district) query.append('district', params.district);

    return fetchWithAuth(`/market/locations?${query.toString()}`);
  },

  getCropPrices: async (crop: string, state?: string) => {
    const query = new URLSearchParams();
    query.append('crop', crop);
    if (state) query.append('state', state);

    return fetchWithAuth(`/market/prices?${query.toString()}`);
  },
};

// Weather APIs
export const weatherAPI = {
  getCurrentWeather: async (params: { location?: string, lat?: number, lon?: number }) => {
    const query = new URLSearchParams();
    if (params.location) query.append('location', params.location);
    if (params.lat) query.append('lat', params.lat.toString());
    if (params.lon) query.append('lon', params.lon.toString());

    return fetchWithAuth(`/weather/current?${query.toString()}`);
  },

  getForecast: async (params: { location?: string, lat?: number, lon?: number, days?: number }) => {
    const query = new URLSearchParams();
    if (params.location) query.append('location', params.location);
    if (params.lat) query.append('lat', params.lat.toString());
    if (params.lon) query.append('lon', params.lon.toString());
    if (params.days) query.append('days', params.days.toString());

    return fetchWithAuth(`/weather/forecast?${query.toString()}`);
  },
};

// Export all APIs
const api = {
  auth: authAPI,
  chat: chatAPI,
  market: marketAPI,
  weather: weatherAPI,
};

export default api; 