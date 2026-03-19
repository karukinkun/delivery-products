import { apiClient } from '@/lib/api/client';
import axios from 'axios';

export async function loginApi(email: string, password: string) {
  return apiClient(async () => {
    try {
      const { data } = await axios.post('https://jsonplaceholder.typicode.com/users', {
        email: email,
        password: password,
      });

      return data;
    } catch (error) {
      // Axiosエラーか判定
      if (axios.isAxiosError(error)) {
        console.error('API Error:', error.response?.data);
        throw new Error('ログインに失敗しました');
      }

      // 予期しないエラー
      console.error('Unexpected Error:', error);
      throw new Error('予期しないエラーが発生しました');
    }
  });
}
