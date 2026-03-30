'use client';

import Header from '@/components/Header/header';
import { Spinner } from '@/components/ui/spinner';
import loadingStore from '@/lib/store/loadingStore';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = loadingStore();

  return (
    <>
      <Header />
      <main className="flex justify-center">{children}</main>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <Spinner />
        </div>
      )}
    </>
  );
}
