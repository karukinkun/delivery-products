import { parseProductsQuery } from '@/lib/products-search-params';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiOrigin = process.env.API_ORIGIN;

  if (!apiOrigin) {
    return NextResponse.json({ message: 'API_ORIGIN が設定されていません。' }, { status: 500 });
  }

  const { word, page, limit } = parseProductsQuery(request.nextUrl.searchParams);
  const qs = new URLSearchParams({
    word,
    page: String(page),
    limit: String(limit),
  }).toString();

  const res = await fetch(`${apiOrigin}/products?${qs}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return NextResponse.json({ message: '商品の取得に失敗しました。' }, { status: res.status });
  }

  const data = await res.json();

  return NextResponse.json(data);
}
