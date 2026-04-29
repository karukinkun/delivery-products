import CategoryList from '@/app/(top)/_components/category-list';
import { getCategoriesApi } from '@/lib/api/products';
import Image from 'next/image';

const TopPage = async () => {
  const { categories } = await getCategoriesApi();

  return (
    <div className="w-full">
      <section className="relative mb-20 aspect-21/9 w-full">
        <Image
          src="/main0.jpg"
          alt="ヒーロー画像"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </section>
      <section className="mx-auto mb-20 max-w-4xl px-3 sm:px-5 lg:px-4">
        <CategoryList categories={categories} />
      </section>
      <section className="relative mb-20 aspect-21/9 w-full">
        <Image
          src="/test.jpg"
          alt="ヒーロー画像"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <h3 className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-bold text-white">
          {'ダイニングテーブル'}
        </h3>
      </section>
    </div>
  );
};

export default TopPage;
