'use client';

import Header from '@/components/Header/header';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-[1024px] px-3 sm:px-5 lg:px-0">{children}</main>
    </>
  );
};

export default ClientLayout;
