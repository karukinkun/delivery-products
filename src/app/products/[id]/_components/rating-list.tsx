import RatingListClient from '@/app/products/[id]/_components/rating-list-client';
import { getRatingsApi } from '@/lib/api/products';

type PropsType = {
  productId: number;
};

const RatingList = async ({ productId }: PropsType) => {
  const { ratings, total } = await getRatingsApi({ product_id: productId, page: 1, limit: 50 });

  return <RatingListClient productId={productId} initialRatings={ratings} total={total} />;
};

export default RatingList;
