const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex max-w-[1024px] justify-center px-3 sm:px-5 lg:px-4">
      {children}
    </div>
  );
};

export default Container;
