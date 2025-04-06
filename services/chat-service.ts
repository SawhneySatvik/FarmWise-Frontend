"use client";

import { ApiService } from './api';

// Types
export interface ChatSession {
  id: number;
  name: string;
  started_at: string;
  updated_at: string;
  is_active: boolean;
  message_count: number;
}

export interface ChatMessage {
  id: number;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
  metadata?: Record<string, any>;
}

export interface SessionWithMessages extends ChatSession {
  messages: ChatMessage[];
}

export interface MessageResponse {
  user_message: ChatMessage;
  ai_message: ChatMessage;
}

export interface CreateSessionResponse {
  id: number;
  name: string;
  started_at: string;
  updated_at: string;
  is_active: boolean;
  welcome_message: ChatMessage;
}

/**
 * Chat Service for handling chat-related API calls
 */
export class ChatService extends ApiService {
  /**
   * Get all chat sessions for the current user
   * @param activeOnly Only return active sessions
   * @param limit Maximum number of sessions to return
   */
  async getSessions(activeOnly: boolean = false, limit: number = 10): Promise<ChatSession[]> {
    const queryParams = new URLSearchParams();
    
    if (activeOnly) {
      queryParams.append('active', 'true');
    }
    
    if (limit) {
      queryParams.append('limit', limit.toString());
    }
    
    const query = queryParams.toString();
    const endpoint = `/chat/sessions${query ? `?${query}` : ''}`;
    
    return this.get<ChatSession[]>(endpoint);
  }

  /**
   * Create a new chat session
   * @param name Optional name for the session
   */
  async createSession(name?: string): Promise<CreateSessionResponse> {
    return this.post<CreateSessionResponse>('/chat/sessions', { name });
  }

  /**
   * Get a specific chat session with messages
   * @param sessionId ID of the session to retrieve
   * @param includeMetadata Include message metadata
   */
  async getSession(sessionId: number, includeMetadata: boolean = false): Promise<SessionWithMessages> {
    const queryParams = new URLSearchParams();
    
    if (includeMetadata) {
      queryParams.append('include_metadata', 'true');
    }
    
    const query = queryParams.toString();
    const endpoint = `/chat/sessions/${sessionId}${query ? `?${query}` : ''}`;
    
    return this.get<SessionWithMessages>(endpoint);
  }

  /**
   * Send a message to a chat session and get AI response
   * @param sessionId ID of the session to send message to
   * @param content Message content
   */
  async sendMessage(sessionId: number, content: string): Promise<MessageResponse> {
    return this.post<MessageResponse>(`/chat/sessions/${sessionId}/messages`, { content });
  }

  /**
   * Update a chat session (rename or close)
   * @param sessionId ID of the session to update
   * @param updates Updates to apply (name or is_active)
   */
  async updateSession(sessionId: number, updates: { name?: string; is_active?: boolean }): Promise<ChatSession> {
    return this.put<ChatSession>(`/chat/sessions/${sessionId}`, updates);
  }

  /**
   * Delete a chat session
   * @param sessionId ID of the session to delete
   */
  async deleteSession(sessionId: number): Promise<{ message: string }> {
    return this.delete<{ message: string }>(`/chat/sessions/${sessionId}`);
  }

  /**
   * Send a direct query without creating a session (guest mode)
   * @param content Message content
   */
  async directQuery(content: string): Promise<{ response: string; metadata?: Record<string, any> }> {
    return this.post<{ response: string; metadata?: Record<string, any> }>('/chat/query', { content });
  }
}

// Create and export a singleton instance
const chatService = new ChatService();
export default chatService; 