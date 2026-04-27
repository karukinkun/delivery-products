'use client';

import { AuthProvider } from '@/app/AuthProvider';
import Header from '@/components/common/header';
import '@/lib/amplify';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <Header />
      <main className="mx-auto flex max-w-[1024px] justify-center px-3 sm:px-5 lg:px-0">
        {children}
      </main>
    </AuthProvider>
  );
};

export default ClientLayout;
