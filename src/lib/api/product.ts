import { apiClient } from '@/lib/api/client';
import axios from 'axios';

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export async function getProductsApi(search: string = ''): Promise<Product[]> {
  return apiClient(async () => {
    try {
      const { data } = await axios.get<ProductsResponse>('https://dummyjson.com/products/search', {
        params: { q: search, limit: 25 },
      });

      return data.products;
    } catch (error) {
      // Axiosエラーか判定
      if (axios.isAxiosError(error)) {
        console.error('API Error:', error.response?.data);
        throw new Error('商品の取得に失敗しました');
      }

      // 予期しないエラー
      console.error('Unexpected Error:', error);
      throw new Error('予期しないエラーが発生しました');
    }
  });
}
