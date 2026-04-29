import { ProductRating } from '@/components/common/product-rating';
import { getProductsApi } from '@/lib/api/products';
import Image from 'next/image';
import Link from 'next/link';

type PropsType = {
  query: string;
};
const ProductList = async (props: PropsType) => {
  const { query } = props;
  const { products } = await getProductsApi(query);

  return (
    <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <li className="border-border bg-card overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md">
            <div className="bg-muted relative aspect-square w-full">
              {product.images.length > 0 && (
                <Image
                  key={product.images[0].id}
                  src={product.images[0].image_url}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover"
                />
              )}
            </div>
            <div className="p-3">
              <h3 className="text-sm font-bold">{product.name}</h3>
              <ProductRating rating={product.rating} starSizeClass="size-4" className="mb-4 py-1" />
              <p className="text-muted-foreground mt-1 text-xs">{product.description}</p>
              <p className="text-foreground mt-1 text-lg font-semibold">
                {product.price.toLocaleString()}円
              </p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default ProductList;
