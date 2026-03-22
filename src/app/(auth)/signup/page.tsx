'use client';

import { RadioField } from '@/components/RadioField';
import { SelectField } from '@/components/SelectField';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { dayList, monthList, yearList } from '@/lib/utils';
import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type InputType = {
  firstName: string;
  lastName: string;
  gender: string;
  year: string;
  month: string;
  day: string;
};

const sexOptions = [
  { label: '男性', value: 'male' },
  { label: '女性', value: 'female' },
];

export default function SignInPage() {
  const { handleSubmit, control } = useForm<InputType>({
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: 'male',
      year: '',
      month: '',
      day: '',
    },
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Card className="w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>新規会員登録</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        field={field}
                        fieldState={fieldState}
                        name="firstName"
                        label="firstName"
                        placeholder="emilys"
                      />
                    )}
                  />
                </Field>
                <Field>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        field={field}
                        fieldState={fieldState}
                        name="lastName"
                        label="lastName"
                        placeholder="emilys"
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
                      selectBoxLabel="生年月日"
                      options={yearList}
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
