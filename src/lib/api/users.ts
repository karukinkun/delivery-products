// src/lib/api/users.ts

import { fetchAuthSession } from 'aws-amplify/auth';

type CreateUserRequest = {
  lastName: string;
  firstName: string;
  gender: string;
  postalCode: string;
  prefecture: string;
  address2: string;
  address3: string;
  address4: string;
  email: string;
  phoneNumber?: string;
  birthdate: string;
};

export async function createUserClientApi(body: CreateUserRequest) {
  const session = await fetchAuthSession();
  const idToken = session.tokens?.idToken?.toString();

  if (!idToken) {
    throw new Error('認証トークンを取得できませんでした。');
  }

  const res = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error('ユーザー情報の登録に失敗しました。');
  }

  return res.json();
}
