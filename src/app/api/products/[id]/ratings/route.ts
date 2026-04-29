import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  const apiOrigin = process.env.API_ORIGIN;

  if (!apiOrigin) {
    return NextResponse.json({ message: 'API_ORIGIN が設定されていません。' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);

  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '5';

  const res = await fetch(`${apiOrigin}/products/${id}/ratings?page=${page}&limit=${limit}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return NextResponse.json({ message: 'レビューの取得に失敗しました。' }, { status: res.status });
  }

  const data = await res.json();

  return NextResponse.json(data);
}
