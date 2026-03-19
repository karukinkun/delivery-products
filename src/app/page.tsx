import { getProductsApi, Product } from '@/lib/api/product';
import ProductList from '@/app/ProductList';

export default async function Home() {
  const products = await getProductsApi();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ProductList initialProducts={products} />
    </div>
  );
}
