import { CreateUserRequest } from '@/types/request/users';
import { UserResponse } from '@/types/response/users';
import { fetchAuthSession } from 'aws-amplify/auth';

const getIdToken = async () => {
  const session = await fetchAuthSession();
  const idToken = session.tokens?.idToken?.toString();

  if (!idToken) {
    throw new Error('認証トークンを取得できませんでした。');
  }

  return idToken;
};

export async function createUserClientApi(body: CreateUserRequest) {
  const idToken = await getIdToken();

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

export async function getUserClientApi(): Promise<UserResponse> {
  const idToken = await getIdToken();

  const res = await fetch('/api/users', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('ユーザー情報の取得に失敗しました。');
  }

  return res.json();
}
