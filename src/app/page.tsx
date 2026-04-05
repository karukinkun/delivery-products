import ProductList from '@/app/ProductList';
import { getProductsApi } from '@/lib/api/product';

const Home = async () => {
  const products = await getProductsApi();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ProductList initialProducts={products} />
    </div>
  );
};

export default Home;
