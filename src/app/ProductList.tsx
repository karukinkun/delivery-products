'use client';

import { TextField } from '@/components/TextField';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { getProductsApi, Product } from '@/lib/api/product';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type FormType = {
  keyword: string;
};

type PropsType = {
  initialProducts: Product[];
};
export default function ProductList({ initialProducts }: PropsType) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const { handleSubmit, control } = useForm<FormType>({
    defaultValues: {
      keyword: '',
    },
  });

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    const response = await getProductsApi(data.keyword);
    setProducts(response);
  };

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">商品一覧</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Field orientation="horizontal">
              <Controller
                name="keyword"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    name="keyword"
                    field={field}
                    fieldState={fieldState}
                    placeholder="検索"
                    autoComplete="off"
                    icon={<SearchIcon />}
                    iconAlign="inline-end"
                  />
                )}
              />
              <Button>検索</Button>
            </Field>
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
    </>
  );
}
