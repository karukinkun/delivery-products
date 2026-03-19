import { apiClient } from '@/lib/api/client';
import axios from 'axios';

export type LoginResponse = {
  accessToken: string;
  email: string;
  firstName: string;
  gender: string;
  id: number;
  image: string;
  lastName: string;
  refreshToken: string;
  username: string;
};

export async function loginApi(username: string, password: string): Promise<LoginResponse> {
  return apiClient(async () => {
    try {
      const { data } = await axios.post<LoginResponse>('https://dummyjson.com/auth/login', {
        username: username,
        password: password,
      });

      return data;
    } catch (error) {
      // Axiosエラーか判定
      if (axios.isAxiosError(error)) {
        console.error('API Error:', error);
        throw new Error('ログインに失敗しました');
      }

      // 予期しないエラー
      console.error('Unexpected Error:', error);
      throw new Error('予期しないエラーが発生しました');
    }
  });
}
