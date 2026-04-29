/** 商品一覧の URL クエリ（word / page / limit）の共通パース・上限 */
export const DEFAULT_PRODUCTS_LIMIT = 30;
export const DEFAULT_PRODUCTS_PAGE = 1;

const MAX_LIMIT = 100;
const MAX_PAGE = 10_000;

function clampPositiveInt(n: number, fallback: number, max: number): number {
  if (!Number.isFinite(n) || n < 1) {
    return fallback;
  }

  return Math.min(max, Math.floor(n));
}

type SearchParamsGet = Pick<URLSearchParams, 'get'>;

export function parseProductsQuery(sp: SearchParamsGet) {
  const word = sp.get('word') ?? '';
  const page = clampPositiveInt(
    Number.parseInt(sp.get('page') ?? '', 10),
    DEFAULT_PRODUCTS_PAGE,
    MAX_PAGE,
  );
  const limit = clampPositiveInt(
    Number.parseInt(sp.get('limit') ?? '', 10),
    DEFAULT_PRODUCTS_LIMIT,
    MAX_LIMIT,
  );

  return { word, page, limit };
}
