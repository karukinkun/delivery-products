import { ProductsRequest, RatingRequest } from '@/types/request/products';
import {
  CategoriesResponse,
  ProductsResponse,
  ProductType,
  RatingsResponse,
} from '@/types/response/products';

const apiOrigin = process.env.API_ORIGIN ?? '';

//カテゴリー一覧取得API （!!サーバーサイド用）
export async function getCategoriesApi(): Promise<CategoriesResponse> {
  const res = await fetch(`${apiOrigin}/categories`, {
    cache: 'force-cache', // キャッシュを強制
  });

  if (!res.ok) {
    throw new Error('カテゴリーの取得に失敗しました');
  }

  return res.json();
}

// 商品一覧取得API （!!サーバーサイド用）
export async function getProductsApi({
  word = '',
  limit = 30,
  page = 1,
}: ProductsRequest): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams({
    word,
    limit: String(limit),
    page: String(page),
  }).toString();
  const res = await fetch(`${apiOrigin}/products?${searchParams}`, {
    next: { revalidate: 60 * 5 }, // 5分後に再検証
  });

  if (!res.ok) {
    throw new Error('商品の取得に失敗しました');
  }

  return res.json();
}

export async function getProductDetailApi(id: number): Promise<ProductType> {
  const res = await fetch(`${apiOrigin}/products/${id}`, {
    next: { revalidate: 60 * 5 }, // 5分後に再検証
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
    next: { revalidate: 60 * 5 }, // 5分後に再検証
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
