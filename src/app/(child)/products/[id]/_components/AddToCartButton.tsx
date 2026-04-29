'use client';
import { Button } from '@/components/ui/button';
import { addToCartApi } from '@/lib/api/cart';
import { ReactNode, useState } from 'react';

type PropsType = {
  id: number;
  children: ReactNode;
};

export function AddToCartButton(props: PropsType) {
  const { id, children } = props;
  const [userId, setUserId] = useState<number | null>(null);

  // カートに商品を追加
  const addToCart = async () => {
    try {
      if (!userId) {
        throw new Error('カートに追加するにはログインする必要があります');
      }
      await addToCartApi(id, 1, userId);

      // TODO: カートに商品が追加されたことを通知
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Button className="w-full" size="lg" onClick={addToCart}>
      {children}
    </Button>
  );
}
