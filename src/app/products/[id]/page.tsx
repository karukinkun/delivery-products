import Loading from '@/app/loading';
import { AddToCartButton } from '@/app/products/[id]/_components/AddToCartButton';
import RatingList from '@/app/products/[id]/_components/rating-list';
import { ProductRating } from '@/components/common/product-rating';
import ImageSwiper from '@/components/common/swiper/image-swiper';
import { Button } from '@/components/ui/button';
import { getProductDetailApi } from '@/lib/api/products';
import { ProductType } from '@/types/products';
import Link from 'next/link';
import { Suspense } from 'react';

type PropsType = {
  params: Promise<{ id: number }>;
};

const ProductDetailPage = async ({ params }: PropsType) => {
  const { id } = await params;
  let product: ProductType;
  try {
    product = await getProductDetailApi(id);
  } catch (e) {
    return <div>商品取得に失敗しました</div>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="mx-auto w-full max-w-5xl px-4 py-6">
        <div className="flex w-full min-w-0 flex-col justify-center gap-4 sm:flex-row">
          <div className="mx-auto w-[80%] max-w-full min-w-0 overflow-hidden md:w-[50%]">
            <ImageSwiper images={product.images} />
          </div>
          <div className="relative w-full min-w-0 md:w-[50%]">
            <p className="mb-2 text-sm font-semibold">{`ブランド：${product.brand}`}</p>
            <h1 className="text-md mb-2 font-bold">{product.name}</h1>
            <ProductRating rating={product.rating} starSizeClass="size-4" className="mb-4 py-1" />
            <div className="flex flex-col gap-2">
              <div className="text-sm">
                <p className="mb-2 border-b pb-2">商品説明</p>
                <p>{product.description}</p>
              </div>
              <p className="text-mb mb-4 font-semibold">{product.price}円（税込）</p>
              <div className="flex flex-col gap-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/">商品一覧へ戻る</Link>
                </Button>
                <AddToCartButton id={Number(id)}>カートに入れる</AddToCartButton>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 border-b" />
        <RatingList productId={Number(id)} />
      </div>
    </Suspense>
  );
};

export default ProductDetailPage;
