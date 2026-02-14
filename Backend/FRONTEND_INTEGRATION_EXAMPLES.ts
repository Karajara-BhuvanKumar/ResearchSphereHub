// Frontend API Service Examples
// These files show how to use the backend from your React components

// File: src/services/authService.ts

import apiClient from '@/lib/api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async register(email: string, name: string, password: string, confirmPassword: string) {
    return apiClient.post<AuthResponse>('/auth/register', {
      email,
      name,
      password,
      confirmPassword,
    });
  },

  async login(email: string, password: string) {
    return apiClient.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
  },

  async getProfile() {
    return apiClient.get<User>('/auth/me');
  },

  async updateProfile(name?: string, email?: string) {
    return apiClient.put<User>('/auth/profile', {
      name,
      email,
    });
  },

  async changePassword(oldPassword: string, newPassword: string, confirmPassword: string) {
    return apiClient.post('/auth/change-password', {
      oldPassword,
      newPassword,
      confirmPassword,
    });
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// File: src/services/researchService.ts

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  type: 'PAPER' | 'JOURNAL' | 'CONFERENCE';
  content: string;
  source: string;
  publishDate?: string;
  tags?: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResponse {
  data: ResearchPaper[];
  total: number;
  limit: number;
  offset: number;
  pages: number;
}

export const researchService = {
  async createPaper(
    title: string,
    authors: string[],
    type: string,
    content: string,
    source: string,
    publishDate?: string,
    tags?: string[]
  ) {
    return apiClient.post<ResearchPaper>('/research', {
      title,
      authors,
      type,
      content,
      source,
      publishDate,
      tags,
    });
  },

  async searchPapers(
    search?: string,
    type?: string,
    tags?: string[],
    limit?: number,
    offset?: number
  ) {
    return apiClient.get<SearchResponse>('/research/search', {
      params: {
        search,
        type,
        tags: tags?.join(','),
        limit,
        offset,
      },
    });
  },

  async getPaper(id: string) {
    return apiClient.get<ResearchPaper>(`/research/${id}`);
  },

  async getUserPapers(limit?: number, offset?: number) {
    return apiClient.get<SearchResponse>('/research/user/my-papers', {
      params: { limit, offset },
    });
  },

  async updatePaper(id: string, data: Partial<ResearchPaper>) {
    return apiClient.put<ResearchPaper>(`/research/${id}`, data);
  },

  async deletePaper(id: string) {
    return apiClient.delete(`/research/${id}`);
  },
};

// File: src/services/bookmarkService.ts

export interface Bookmark {
  id: string;
  paper: ResearchPaper;
  createdAt: string;
}

export interface BookmarksResponse {
  data: Bookmark[];
  total: number;
  limit: number;
  offset: number;
  pages: number;
}

export const bookmarkService = {
  async addBookmark(paperId: string) {
    return apiClient.post<Bookmark>(`/bookmarks/${paperId}`);
  },

  async removeBookmark(paperId: string) {
    return apiClient.delete(`/bookmarks/${paperId}`);
  },

  async getUserBookmarks(limit?: number, offset?: number) {
    return apiClient.get<BookmarksResponse>('/bookmarks', {
      params: { limit, offset },
    });
  },

  async isBookmarked(paperId: string) {
    const response = await apiClient.get<{ isBookmarked: boolean }>(
      `/bookmarks/${paperId}/check`
    );
    return response.isBookmarked;
  },
};
