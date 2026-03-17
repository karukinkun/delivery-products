import loadingStore from '@/lib/store/loadingStore';

export async function apiClient<T>(fn: () => Promise<T>): Promise<T> {
  const { setIsLoading } = loadingStore.getState();

  try {
    setIsLoading(true);
    return await fn();
  } finally {
    setIsLoading(false);
  }
}
