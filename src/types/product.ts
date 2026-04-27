export type ImageType = {
  id: number;
  image_url: string;
};

// 商品一覧取得API
// --------------------------------------
export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  brand_id: number;
  brand: string;
  category_id: number;
  category: string;
  images: ImageType[];
};

export type ProductsResponse = {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
};
