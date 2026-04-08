'use client';

import { TextField } from '@/components/TextField';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type FormType = {
  keyword: string;
};
const SearchForm = () => {
  const router = useRouter();
  const methods = useForm<FormType>({
    defaultValues: {
      keyword: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    router.push(`/?q=${encodeURIComponent(data.keyword)}`);
  };

  return (
    <FormProvider {...methods}>
      <h1 className="mb-6 text-2xl font-semibold">商品一覧</h1>
      <div>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div>
            <Field orientation="horizontal">
              <TextField
                name="keyword"
                aria-label="検索ワード"
                placeholder="検索"
                icon={<SearchIcon />}
                iconAlign="inline-end"
              />
              <Button type="submit">検索</Button>
            </Field>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default SearchForm;
