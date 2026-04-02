import { apiClient } from '@/lib/api/client';
import axios from 'axios';

export type Address = {
  address1: string;
  address2: string;
  address3: string;
};

export type AddressResponse = {
  results: Address[];
};

export async function getAddressApi(postalCode: string): Promise<Address | null> {
  return apiClient(async () => {
    try {
      const { data } = await axios.get<AddressResponse>(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`,
      );

      return data.results?.[0] ?? null;
    } catch (error) {
      throw new Error('住所情報の取得に失敗しました', { cause: error });
    }
  });
}
