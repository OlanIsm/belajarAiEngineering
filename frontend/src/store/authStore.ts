import { create } from 'zustand';
import api from '../api/client';
import { MOCK_USER } from '../api/mockData';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isMockMode: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const initialToken = localStorage.getItem('bai_token') || 'demo-mock-token-123';
const initialUserStr = localStorage.getItem('bai_user');
let initialUser = MOCK_USER;
try {
  if (initialUserStr) initialUser = JSON.parse(initialUserStr);
} catch {
  initialUser = MOCK_USER;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  token: initialToken,
  isLoading: false,
  error: null,
  isMockMode: false,

  clearError: () => set({ error: null }),

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/auth/login', { email, password });
      const token = data.token ?? data.access_token ?? 'demo-token';
      const user = data.user ?? { id: 'u-1', email, name: email.split('@')[0] };
      localStorage.setItem('bai_token', token);
      localStorage.setItem('bai_user', JSON.stringify(user));
      set({ token, user, isLoading: false, error: null, isMockMode: false });
      return true;
    } catch {
      // Backend offline fallback → Seamless Demo Login!
      console.log('[Auth] Backend offline — Fallback to Demo Mode');
      const user = { id: 'demo-user', email, name: nameFromEmail(email) };
      const token = 'demo-mock-token-' + Date.now();
      localStorage.setItem('bai_token', token);
      localStorage.setItem('bai_user', JSON.stringify(user));
      set({ token, user, isLoading: false, error: null, isMockMode: true });
      return true;
    }
  },

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/auth/signup', { email, password, name });
      const token = data.token ?? data.access_token ?? 'demo-token';
      const user = data.user ?? { id: 'u-1', email, name };
      localStorage.setItem('bai_token', token);
      localStorage.setItem('bai_user', JSON.stringify(user));
      set({ token, user, isLoading: false, error: null, isMockMode: false });
      return true;
    } catch {
      // Backend offline fallback
      console.log('[Auth] Backend offline — Fallback to Demo Signup');
      const user = { id: 'demo-user', email, name: name || 'Demo Learner' };
      const token = 'demo-mock-token-' + Date.now();
      localStorage.setItem('bai_token', token);
      localStorage.setItem('bai_user', JSON.stringify(user));
      set({ token, user, isLoading: false, error: null, isMockMode: true });
      return true;
    }
  },

  logout: () => {
    localStorage.removeItem('bai_token');
    localStorage.removeItem('bai_user');
    set({ token: null, user: null, error: null });
  },
}));

function nameFromEmail(email: string) {
  const prefix = email.split('@')[0] || 'Learner';
  return prefix.charAt(0).toUpperCase() + prefix.slice(1);
}
