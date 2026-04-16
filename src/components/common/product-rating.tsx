import { Star } from 'lucide-react';
import Link from 'next/link';
import { id } from 'zod/locales';

type PropsType = {
  id: string;
  rating: number;
  className?: string;
  /** 星1個の Tailwind サイズクラス（例: size-4） */
  starSizeClass?: 'size-1' | 'size-2' | 'size-3' | 'size-4' | 'size-5';
};

export const ProductRating = (props: PropsType) => {
  const { rating, className, starSizeClass = 'size-5' } = props;
  const safeMax = Math.max(1, 5);
  const clamped = Math.min(Math.max(Math.round(rating), 0), safeMax);

  return (
    <div
      className={`flex items-center gap-0.5 ${className ?? ''}`}
      role="img"
      aria-label={`評価 ${clamped.toFixed(1)} / ${safeMax}`}
    >
      <Link href={`/products/${id}/reviews`}>
        {Array.from({ length: safeMax }, (_, i) => {
          const fillRatio = Math.min(Math.max(clamped - i, 0), 1);
          return (
            <span key={i} className={`relative inline-flex shrink-0 ${starSizeClass}`}>
              <Star
                className={`${starSizeClass} text-zinc-300 dark:text-zinc-600`}
                fill="none"
                strokeWidth={1.5}
                aria-hidden
              />
              <span
                className="pointer-events-none absolute top-0 left-0 h-full overflow-hidden text-amber-400"
                style={{ width: `${fillRatio * 100}%` }}
              >
                <Star
                  className={`${starSizeClass} fill-amber-400 text-amber-400`}
                  strokeWidth={1.5}
                  aria-hidden
                />
              </span>
            </span>
          );
        })}
        <span className="text-muted-foreground ml-1 text-sm tabular-nums">
          {clamped.toFixed(1)}
        </span>
      </Link>
    </div>
  );
};
