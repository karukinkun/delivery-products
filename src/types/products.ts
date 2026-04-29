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

// 商品レビュー（評価）取得API
// --------------------------------------
export type RatingRequest = {
  product_id: number;
  page?: number;
  limit?: number;
};

export type RatingType = {
  id: number;
  product_id: number;
  user_id: number | null;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
};

export type RatingsResponse = {
  ratings: RatingType[];
  total: number;
};
