'use client';

import Image from 'next/image';
import { getProducts, DummyProduct } from '@/lib/api/product';
import { Button } from '@/components/ui/button';
import { FieldGroup, Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

type Inputs = {
  keyword: string;
};

export default function Home() {
  const [products, setProducts] = useState<DummyProduct[]>([]);
  const { handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      keyword: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await getProducts(data.keyword);
    setProducts(response);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts('red');

        // データをセットする処理
        setProducts(response);
      } catch (error) {
        console.log('エラーが発生しました');
        console.log(error);
      }
    };

    // 非同期関数を呼び出す
    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">商品一覧</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center mr-5">
            {/* <input
            {...register('example')}
            type="text"
            placeholder="検索"
            className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 outline-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          /> */}
            <FieldGroup className="w-[300px] pr-2">
              <Controller
                name="keyword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="検索"
                      autoComplete="off"
                    />
                  </Field>
                )}
              />
            </FieldGroup>
            <Button>検索</Button>
          </div>
        </form>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {products.map((product) => (
          <li
            key={product.id}
            className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-square w-full bg-muted">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <h2 className="line-clamp-2 text-sm font-medium leading-tight">{product.title}</h2>
              <p className="mt-1 text-lg font-semibold text-foreground">
                ¥{product.price.toLocaleString()}
              </p>
              {product.discountPercentage > 0 && (
                <p className="text-xs text-muted-foreground">{product.discountPercentage}% OFF</p>
              )}
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {product.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
