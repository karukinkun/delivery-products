'use client';

import { AuthProvider } from '@/app/providers/AuthProvider';
import { QueryProvider } from '@/app/providers/QueryProvider';
import Header from '@/components/layouts/header';
// Amplifyの初期化（クライアン側で実行するので、layout.tsxではなくここで実行）
import '@/lib/amplify';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <AuthProvider>
        <Header />
        <main>{children}</main>
      </AuthProvider>
    </QueryProvider>
  );
};

export default ClientLayout;
