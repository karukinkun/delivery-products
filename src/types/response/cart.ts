import { ProductType } from '@/types/response/products';

export type AddToCartResponse = {
  id: number;
  total: number;
  totalQuantity: number;
  products: ProductType[];
};

export type CartItemProduct = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  thumbnail: string;
};

export type CartItem = {
  id: number;
  products: CartItemProduct[];
  total: number;
  totalProducts: number;
  totalQuantity: number;
};

export type CartItemsResponse = {
  cart: CartItem[];
  products: ProductType[];
  total: number;
  totalQuantity: number;
};
