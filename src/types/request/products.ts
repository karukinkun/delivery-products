// 商品一覧取得API
// --------------------------------------
export type ProductsRequest = {
  word: string;
  limit: number;
  page: number;
};

// 商品レビュー（評価）取得API
// --------------------------------------
export type RatingRequest = {
  product_id: number;
  page: number;
  limit: number;
};
