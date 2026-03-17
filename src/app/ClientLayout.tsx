'use client';

import Header from '@/components/Header/header';
import { Spinner } from '@/components/ui/spinner';
import loadingStore from '@/lib/store/loadingStore';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = loadingStore();

  return (
    <>
      <Header />

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
}
