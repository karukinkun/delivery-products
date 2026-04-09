'use client';
import CartProduct from '@/app/cart/CartProduct';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserInfoApi } from '@/lib/api/auth';
import { Link } from 'lucide-react';
import { useEffect, useState } from 'react';

const CartsPage = () => {
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>カート</CardTitle>
      </CardHeader>
      {userId && <CartProduct userId={userId} />}
      <CardFooter className="flex-col gap-2">
        <Button asChild variant="outline" className="w-full">
          <Link href="/">商品一覧へ戻る</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartsPage;
