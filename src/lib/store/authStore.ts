import type { GetCurrentUserOutput } from 'aws-amplify/auth';
import { create } from 'zustand';

type AuthStore = {
  isAuthenticated: boolean;
  isAuthChecking: boolean;
  user: GetCurrentUserOutput | null;
  setAuthChecking: () => void;
  setAuthenticated: (user: GetCurrentUserOutput) => void;
  setUnauthenticated: () => void;
};

export const authStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isAuthChecking: true,
  user: null,

  setAuthChecking: () =>
    set({
      isAuthChecking: true,
    }),

  setAuthenticated: (user) =>
    set({
      isAuthenticated: true,
      isAuthChecking: false,
      user,
    }),

  setUnauthenticated: () =>
    set({
      isAuthenticated: false,
      isAuthChecking: false,
      user: null,
    }),
}));
