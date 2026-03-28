'use client';

import { schema } from '@/app/(auth)/signup/schema';
import { RadioField } from '@/components/RadioField';
import { SelectField } from '@/components/SelectField';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { dayList, monthList, yearList } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type FormType = z.infer<typeof schema>;

const sexOptions = [
  { label: '男性', value: 'male' },
  { label: '女性', value: 'female' },
];

export default function SignInPage() {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      gender: 'male',
      year: '',
      month: '',
      day: '',
    },
  });

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Card className="w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>新規会員登録</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="login-form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        field={field}
                        fieldState={fieldState}
                        name="lastName"
                        label="姓"
                        placeholder="山田"
                      />
                    )}
                  />
                </Field>
                <Field>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        field={field}
                        fieldState={fieldState}
                        name="firstName"
                        label="名"
                        placeholder="太郎"
                      />
                    )}
                  />
                </Field>
              </div>
              <div className="grid grid-cols-1">
                <Field>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        field={field}
                        fieldState={fieldState}
                        name="email"
                        label="メールアドレス"
                        placeholder="メールアドレス"
                        type="email"
                      />
                    )}
                  />
                </Field>
              </div>
              <Field>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field, fieldState }) => (
                    <RadioField
                      field={field}
                      fieldState={fieldState}
                      radioGrouplabel="性別"
                      options={sexOptions}
                    />
                  )}
                />
              </Field>

              <Field orientation="horizontal">
                <Controller
                  name="year"
                  control={control}
                  render={({ field, fieldState }) => (
                    <SelectField
                      field={field}
                      fieldState={fieldState}
                      placeholder="年"
                      options={yearList}
                      selectBoxLabel="生年月日"
                    />
                  )}
                />
                <Controller
                  name="month"
                  control={control}
                  render={({ field, fieldState }) => (
                    <SelectField
                      field={field}
                      fieldState={fieldState}
                      placeholder="月"
                      options={monthList}
                      isGroupLabel={true}
                    />
                  )}
                />
                <Controller
                  name="day"
                  control={control}
                  render={({ field, fieldState }) => (
                    <SelectField
                      field={field}
                      fieldState={fieldState}
                      placeholder="日"
                      options={dayList}
                      isGroupLabel={true}
                    />
                  )}
                />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="login-form" className="w-full">
            ログイン
          </Button>
          <Button asChild className="w-full">
            <Link href="/signup">新規登録はこちら</Link>
          </Button>
          <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
            パスワードを忘れた方はこちら
          </a>
        </CardFooter>
      </Card>
    </>
  );
}
