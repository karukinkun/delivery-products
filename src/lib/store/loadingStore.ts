import { create } from 'zustand';

type LoadingStore = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const loadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) =>
    set({
      isLoading: isLoading,
    }),
}));

export default loadingStore;
