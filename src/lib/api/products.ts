import { ProductType, ProductsResponse, RatingRequest, RatingsResponse } from '@/types/products';

const apiOrigin = process.env.API_ORIGIN ?? '';

// 商品一覧取得API （!!サーバーサイド用）
export async function getProductsApi(
  word: string = '',
  limit: number = 30,
  page: number = 1,
): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams({
    word,
    limit: String(limit),
    page: String(page),
  }).toString();
  const res = await fetch(`${apiOrigin}/products?${searchParams}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('商品の取得に失敗しました');
  }

  return res.json();
}

// 商品一覧取得API （!!クライアントサイド用）
export async function getProductsApiClient(
  word: string = '',
  limit: number = 30,
  page: number = 1,
): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams({
    word,
    limit: String(limit),
    page: String(page),
  }).toString();
  const res = await fetch(`/api/products?${searchParams}`);

  if (!res.ok) {
    throw new Error('商品の取得に失敗しました');
  }

  return res.json();
}

// 商品詳細取得API （!!サーバーサイド用）
export async function getProductDetailApi(id: number): Promise<ProductType> {
  const res = await fetch(`${apiOrigin}/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('商品の取得に失敗しました');
  }

  return res.json();
}

// 商品レビュー（評価）取得API （!!サーバーサイド用）
export async function getRatingsApi({
  product_id,
  page = 1,
  limit = 50,
}: RatingRequest): Promise<RatingsResponse> {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  }).toString();
  const res = await fetch(`${apiOrigin}/products/${product_id}/ratings?${searchParams}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('レビューの取得に失敗しました');
  }

  return res.json();
}

// 商品レビュー（評価）取得API （!!クライアントサイド用）
export async function getRatingsClientApi({
  product_id,
  page = 1,
  limit = 50,
}: RatingRequest): Promise<RatingsResponse> {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  }).toString();
  const res = await fetch(`/api/products/${product_id}/ratings?${searchParams}`);

  if (!res.ok) {
    throw new Error('レビューの取得に失敗しました');
  }

  return res.json();
}
