import { create } from 'zustand';

type LoadingStoreType = {
  loadingCount: number;
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

export const loadingStore = create<LoadingStoreType>((set) => ({
  loadingCount: 0,
  isLoading: false,

  startLoading: () =>
    set((state) => {
      const loadingCount = state.loadingCount + 1;

      return {
        loadingCount,
        isLoading: loadingCount > 0,
      };
    }),

  stopLoading: () =>
    set((state) => {
      const loadingCount = Math.max(0, state.loadingCount - 1);

      return {
        loadingCount,
        isLoading: loadingCount > 0,
      };
    }),
}));
