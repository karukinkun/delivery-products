'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // QueryClientのインスタンスの再生成を防止するためuseStateを使用
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000, // 60秒ごとにキャッシュを更新
            refetchOnWindowFocus: false, // ウィンドウ/タブのフォーカス時に再取得しない
            retry: 1, // クエリ失敗時の自動リトライは1回まで
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
