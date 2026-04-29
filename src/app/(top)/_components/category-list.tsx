import { CategoryType } from '@/types/products';
import Image from 'next/image';
import Link from 'next/link';

type PropsType = {
  categories: CategoryType[];
};
const CategoryList = ({ categories }: PropsType) => {
  return (
    <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
      {categories.map((category) => (
        <Link href={`/products`} key={category.id}>
          <li className="border-border bg-card overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md">
            <div className="bg-muted relative aspect-3/4 w-full overflow-hidden">
              <Image
                src={category.image_url}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/40 transition-all duration-300 hover:bg-black/50" />
              <h3 className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-bold text-white">
                {category.name}
              </h3>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default CategoryList;
