import { AddToCartResponse } from '@/types/cart';

export async function addToCartApi(
  id: number,
  quantity: number,
  userId: number,
): Promise<AddToCartResponse> {
  const res = await fetch('https://dummyjson.com/carts/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      products: [
        {
          id,
          quantity,
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error('カート追加に失敗しました');
  }

  const data = await res.json();
  return data;
}
