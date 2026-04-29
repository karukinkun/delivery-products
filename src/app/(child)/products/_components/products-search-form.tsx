'use client';

import { TextField } from '@/components/forms/fields/text-field';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { routes } from '@/constants/routes';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type FormType = {
  keyword: string;
};

const ProductsSearchForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const wordFromUrl = searchParams.get('word') ?? '';
  const [isPending, startTransition] = useTransition();

  const methods = useForm<FormType>({
    defaultValues: {
      keyword: wordFromUrl,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset({ keyword: wordFromUrl });
  }, [wordFromUrl, reset]);

  const onSubmit: SubmitHandler<FormType> = (data) => {
    const qs = new URLSearchParams(searchParams.toString());
    qs.set('word', data.keyword);
    qs.set('page', '1');
    startTransition(() => {
      router.push(`${routes.products}?${qs.toString()}`);
    });
  };

  return (
    <FormProvider {...methods}>
      <h1 className="mb-6 text-2xl font-semibold">商品一覧</h1>
      <div>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Field orientation="horizontal">
              <TextField
                name="keyword"
                aria-label="検索ワード"
                placeholder="検索"
                icon={<SearchIcon />}
                iconAlign="inline-end"
              />
            </Field>

            <Button type="submit" disabled={isPending} className="relative">
              <span className="px-10">検索</span>
              {isPending && <Spinner className="absolute top-1/2 right-4 -translate-y-1/2" />}
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default ProductsSearchForm;
