import { getProductsApi } from '@/lib/api/product';
import Image from 'next/image';
import Link from 'next/link';

type PropsType = {
  query: string;
};
const ProductList = async (props: PropsType) => {
  const { query } = props;
  const products = await getProductsApi(query);

  return (
    <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <li className="border-border bg-card overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md">
            <div className="bg-muted relative aspect-square w-full">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <h2 className="line-clamp-2 text-sm leading-tight font-medium">{product.title}</h2>
              <p className="text-foreground mt-1 text-lg font-semibold">
                ¥{product.price.toLocaleString()}
              </p>
              {product.discountPercentage > 0 && (
                <p className="text-muted-foreground text-xs">{product.discountPercentage}% OFF</p>
              )}
              <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
                {product.description}
              </p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default ProductList;
