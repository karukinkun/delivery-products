import { loadingStore } from '@/lib/store/loadingStore';

type ApiClientOptions = {
  globalLoading?: boolean;
};

export async function apiClient<T>(
  fn: () => Promise<T>,
  options: ApiClientOptions = {},
): Promise<T> {
  const { globalLoading = true } = options;
  const { startLoading, stopLoading } = loadingStore.getState();

  if (globalLoading) {
    startLoading();
  }

  try {
    return await fn();
  } finally {
    if (globalLoading) {
      stopLoading();
    }
  }
}
