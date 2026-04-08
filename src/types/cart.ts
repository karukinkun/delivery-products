import { Product } from '@/types/product';

export type AddToCartResponse = {
  id: number;
  total: number;
  totalQuantity: number;
  products: Product[];
};
