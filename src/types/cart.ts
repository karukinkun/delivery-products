import { Product } from '@/types/product';

export type AddToCartResponse = {
  id: number;
  total: number;
  totalQuantity: number;
  products: Product[];
};

export type CartItemsResponse = {
  cart: CartItem[];
  products: Product[];
  total: number;
  totalQuantity: number;
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
