import { getProductsApi } from '@/lib/api/product';
import Image from 'next/image';

type PropsType = {
  query: string;
};
const ProductList = async (props: PropsType) => {
  const { query } = props;
  const products = await getProductsApi(query);

  return (
    <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-6">
      {products.map((product) => (
        <li
          key={product.id}
          className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="relative aspect-square w-full bg-muted">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover"
            />
          </div>
          <div className="p-3">
            <h2 className="line-clamp-2 text-sm font-medium leading-tight">{product.title}</h2>
            <p className="mt-1 text-lg font-semibold text-foreground">
              ¥{product.price.toLocaleString()}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs text-muted-foreground">{product.discountPercentage}% OFF</p>
            )}
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{product.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
