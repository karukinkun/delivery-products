import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCartsApi } from '@/lib/api/cart';
import { CartItemsResponse } from '@/types/cart';
import { Link } from 'lucide-react';

const CartProduct = async ({ userId }: { userId: number }) => {
  let carts: CartItemsResponse | null = null;

  try {
    carts = await getCartsApi(userId);

    if (!carts) {
      throw new Error('カート情報の取得に失敗しました。');
    }
  } catch (e) {
    console.log(e);
  }

  if (!carts || carts.products.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>カート</CardTitle>
        </CardHeader>

        <CardContent>
          <p>カートは空です。</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {carts.products.map((cart) => (
        <Link href={`/products/${cart.id}`} key={cart.id}>
          <li className="border-border bg-card overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md">
            <div className="bg-muted relative aspect-square w-full"></div>
            <div className="p-3">
              <h2 className="line-clamp-2 text-sm leading-tight font-medium">{cart.title}</h2>
              <p className="text-foreground mt-1 text-lg font-semibold">
                ¥{cart.price.toLocaleString()}
              </p>
              {cart.discountPercentage > 0 && (
                <p className="text-muted-foreground text-xs">{cart.discountPercentage}% OFF</p>
              )}
              <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">{cart.description}</p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default CartProduct;
