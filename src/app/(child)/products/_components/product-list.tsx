'use client';

import Loading from '@/app/loading';
import { ProductRating } from '@/components/common/product-rating';
import { getProductsApiClient } from '@/lib/api/products';
import { parseProductsQuery } from '@/lib/products-search-params';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const STALE_TIME_MS = 5 * 60 * 1000;

const ProductList = () => {
  const searchParams = useSearchParams();
  const { word, page, limit } = useMemo(() => parseProductsQuery(searchParams), [searchParams]);

  const { data, isPending, isError } = useQuery({
    queryKey: ['products', 'list', word, page, limit],
    queryFn: () => getProductsApiClient({ word, page, limit }),
    staleTime: STALE_TIME_MS,
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError || !data) {
    return (
      <p className="text-destructive mt-6 text-center text-sm" role="alert">
        商品の取得に失敗しました。時間をおいて再度お試しください。
      </p>
    );
  }

  const { products } = data;

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
