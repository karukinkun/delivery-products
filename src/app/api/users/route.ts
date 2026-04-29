import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const apiOrigin = process.env.API_ORIGIN;

  if (!apiOrigin) {
    return NextResponse.json({ message: 'API_ORIGIN が設定されていません。' }, { status: 500 });
  }

  const authorization = request.headers.get('authorization');

  if (!authorization) {
    return NextResponse.json({ message: '認証情報がありません。' }, { status: 401 });
  }

  const body = await request.json();

  const res = await fetch(`${apiOrigin}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    return NextResponse.json(data ?? { message: 'ユーザー情報の登録に失敗しました。' }, {
      status: res.status,
    });
  }

  return NextResponse.json(data, { status: res.status });
}
