import { ProductType, ProductsResponse } from '@/types/product';

export async function getProductsApi(
  word: string = '',
  limit: number = 30,
  page: number = 1,
): Promise<ProductsResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ORIGIN}/products?word=${word}&limit=${limit}&page=${page}`,
    {
      next: word ? undefined : { revalidate: 60 }, // 60秒ごとにデータのキャッシュを更新
      cache: word ? 'no-store' : 'force-cache', // 検索でのデータ取得の場合はキャッシュを最新情報に更新
    },
  );

  if (!res.ok) {
    throw new Error('商品の取得に失敗しました');
  }

  const data = await res.json();

  return data;
}

export async function getProductDetailApi(id: number): Promise<ProductType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/products/${id}`, {
    next: { revalidate: 60 }, // 60秒ごとにキャッシュを更新
  });

  if (!res.ok) {
    throw new Error('商品の取得に失敗しました');
  }

  const data = await res.json();

  return data;
}
