'use client';

import { AuthProvider } from '@/app/providers/AuthProvider';
import { QueryProvider } from '@/app/providers/QueryProvider';
import Header from '@/components/layouts/header/header';
// Amplifyの初期化（クライアン側で実行するので、layout.tsxではなくここで実行）
import '@/lib/amplify';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <AuthProvider>
        <Header />
        <main className="mx-auto flex max-w-[1024px] justify-center px-3 sm:px-5 lg:px-0">
          {children}
        </main>
      </AuthProvider>
    </QueryProvider>
  );
};

export default ClientLayout;
