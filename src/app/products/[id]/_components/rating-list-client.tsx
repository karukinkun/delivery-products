'use client';

import { ProductRating } from '@/components/common/product-rating';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRatingsClientApi } from '@/lib/api/products';
import { RatingType } from '@/types/products';
import { useInfiniteQuery } from '@tanstack/react-query';

type PropsType = {
  productId: number;
  initialRatings: RatingType[];
  total: number;
};

export default function RatingListClient({ productId, initialRatings, total }: PropsType) {
  const limit = 50;
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isPending, isError } =
    useInfiniteQuery({
      queryKey: ['productRatings', productId, limit],
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        getRatingsClientApi({ product_id: productId, page: pageParam, limit }),
      getNextPageParam: (lastPage, allPages) => {
        const loaded = allPages.reduce((sum, p) => sum + p.ratings.length, 0);
        return loaded < lastPage.total ? allPages.length + 1 : undefined;
      },
      staleTime: 60_000,
      initialData: {
        pages: [{ ratings: initialRatings, total }],
        pageParams: [1],
      },
    });

  const ratings = data.pages.flatMap((p) => p.ratings);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-lg font-bold">カスタマーレビュー</h1>
        <p className="text-muted-foreground text-sm">{total}件</p>
      </div>

      {isError && (
        <div className="text-muted-foreground mb-4 rounded-lg border p-4 text-sm">
          レビューの取得に失敗しました。
        </div>
      )}

      {ratings.length === 0 ? (
        <div className="text-muted-foreground rounded-lg border p-6 text-sm">
          まだレビューがありません。
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {ratings.map((rating) => (
            <Card key={rating.id}>
              <CardHeader className="border-b">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="flex items-center gap-2">
                    <ProductRating rating={rating.rating} starSizeClass="size-4" />
                  </CardTitle>
                  <span className="text-muted-foreground text-xs tabular-nums">
                    {`投稿日：${new Date(rating.created_at).toLocaleDateString('ja-JP')}`}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed whitespace-pre-wrap">{rating.comment}</p>
              </CardContent>
            </Card>
          ))}
          {hasNextPage && (
            <Button
              variant="link"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage || isPending}
              className="mx-auto"
            >
              {isFetchingNextPage || isPending ? '読み込み中...' : 'もっと見る'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
