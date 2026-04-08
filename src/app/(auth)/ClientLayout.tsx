'use client';

import Header from '@/components/Header/header';
import { Spinner } from '@/components/ui/spinner';
import loadingStore from '@/lib/store/loadingStore';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = loadingStore();

  return (
    <>
      <Header />
      <main className="flex justify-center">{children}</main>

      {
        // API実行中など時間かかる場合に、ローディングのみを表示する
        isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <Spinner />
          </div>
        )
      }
    </>
  );
};

export default ClientLayout;
