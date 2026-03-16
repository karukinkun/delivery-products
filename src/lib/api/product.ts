import axios from 'axios';

export type DummyProduct = {
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

export type DummyProductsResponse = {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
};

export async function getProducts(search: string = ''): Promise<DummyProduct[]> {
  const url = 'https://dummyjson.com/products/search';
  const params = { q: search, limit: 25 };
  const { data } = await axios.get<DummyProductsResponse>(url, {
    params,
    timeout: 10000,
  });
  return data.products;
}
