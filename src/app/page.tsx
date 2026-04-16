import Loading from '@/app/loading';
import ProductList from '@/app/products/ProductList';
import SearchForm from '@/app/SearchForm';
import { Suspense } from 'react';

type SearchParams = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
const Home = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  const query = Array.isArray(params.q) ? params.q[0] : (params.q ?? '');

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <SearchForm />
      <Suspense fallback={<Loading />}>
        <ProductList query={query} />
      </Suspense>
    </div>
  );
};

export default Home;
