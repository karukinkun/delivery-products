import { Product } from '@/types/product';

export async function getProductsApi(fullKeyword: string): Promise<Product[]> {
  // 検索ワードに含まれている半角 or 全角スペースで分割して、それぞれの単語をリストで取得
  const keywords = fullKeyword.toLowerCase().trim().split(/\s+/);

  // 1つ目のキーワードを含む商品を取得
  const res = await fetch(`https://dummyjson.com/products/search?q=${keywords[0]}&limit=40`, {
    cache: 'force-cache', // パフォーマンスのため取得したデータをキャッシュする
    next: { revalidate: 60 }, // 60秒後にデータを再取得してキャッシュを更新する
  });

  if (!res.ok) {
    throw new Error('商品の取得に失敗しました');
  }

  const data = await res.json();

  // それぞれのキーワードで商品をさらにフィルタリングして取得
  const filteredData = data.products.filter((product: Product) =>
    keywords.every((keyword) => product.title.toLowerCase().includes(keyword)),
  );

  return filteredData;
}

export async function getProductDetailApi(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: 'no-store', // キャッシュせず常に最新のデータを取得
  });

  if (!res.ok) {
    throw new Error('商品の取得に失敗しました');
  }

  const data = await res.json();
  return data;
}
