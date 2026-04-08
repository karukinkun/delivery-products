'use client';
import { Button } from '@/components/ui/button';
import { getUserInfoApi } from '@/lib/api/auth';
import { addToCartApi } from '@/lib/api/cart';
import { ReactNode, useEffect, useState } from 'react';

type PropsType = {
  id: number;
  children: ReactNode;
};

export function AddToCartButton(props: PropsType) {
  const { id, children } = props;
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('カート利用にはログインする必要があります。');
        }
        const userInfo = await getUserInfoApi(accessToken);
        if (!userInfo?.id) {
          throw new Error('カート利用にはログインする必要があります。');
        }

        setUserId(userInfo.id);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUserInfo();
  }, []);

  // カートに商品を追加
  const addToCart = async () => {
    try {
      if (!userId) {
        throw new Error('カートに追加するにはログインする必要があります');
      }
      const cartInfo = await addToCartApi(id, 1, userId);
      console.log(cartInfo);

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
