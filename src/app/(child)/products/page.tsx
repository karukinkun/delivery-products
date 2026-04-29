import ProductList from '@/app/(child)/products/_components/product-list';
import ProductsSearchForm from '@/app/(child)/products/_components/products-search-form';

const ProductsPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ProductsSearchForm />
      <ProductList />
    </div>
  );
};

export default ProductsPage;
