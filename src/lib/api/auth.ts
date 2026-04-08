import { LoginResponse, UserInfoResponse } from '@/types/auth';

export async function loginApi(username: string, password: string): Promise<LoginResponse> {
  try {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 60, // 60分後にトークンが失効する
      }),
    });

    if (!res.ok) {
      throw new Error('ログインに失敗しました');
    }

    const data = await res.json();
    return data;
  } catch (e) {
    // 予期しないエラー
    throw new Error('予期しないエラーが発生しました');
  }
}

export async function getUserInfoApi(accessToken: string): Promise<UserInfoResponse> {
  const res = await fetch('https://dummyjson.com/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('ユーザーの取得に失敗しました');
  }
  const data = await res.json();
  return data;
}
