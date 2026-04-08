import Loading from '@/app/loading';
import { AddToCartButton } from '@/app/products/[id]/AddToCartButton';
import { ProductRating } from '@/components/ProductRating';
import { Button } from '@/components/ui/button';
import { getProductDetailApi } from '@/lib/api/product';
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

type PropsType = {
  params: Promise<{ id: string }>;
};

const ProductDetailPage = async ({ params }: PropsType) => {
  const { id } = await params;
  let product: Product;
  try {
    product = await getProductDetailApi(id);
  } catch (e) {
    return <div>商品取得に失敗しました</div>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <div className="relative mx-auto aspect-square w-[80%] sm:border md:w-[50%]">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="relative w-full md:w-[50%]">
          <p className="mb-2 text-sm font-semibold">{`ブランド：${product.brand}`}</p>
          <h1 className="text-md mb-2 font-bold">{product.title}</h1>
          <ProductRating
            id={id}
            rating={product.rating}
            starSizeClass="size-4"
            className="mb-4 py-1"
          />
          <div className="flex flex-col gap-2">
            <div className="text-sm">
              <p className="mb-2 border-b pb-2">商品説明</p>
              <p>{product.description}</p>
            </div>
            <p className="text-mb mb-4 font-semibold">
              {Math.floor(product.price * 110).toLocaleString()}円（税込）
            </p>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" className="w-full">
                <Link href="/">商品一覧へ戻る</Link>
              </Button>
              <AddToCartButton id={Number(id)}>カートに入れる</AddToCartButton>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ProductDetailPage;
