import { create } from 'zustand';

type StoreType = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const loadingStore = create<StoreType>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) =>
    set({
      isLoading,
    }),
}));

export default loadingStore;
