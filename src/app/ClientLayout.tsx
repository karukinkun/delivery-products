'use client';
import Header from '@/components/Header/header';
import '@/lib/amplify';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-[1024px] justify-center px-3 sm:px-5 lg:px-0">
        {children}
      </main>
    </>
  );
};

export default ClientLayout;
