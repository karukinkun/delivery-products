'use client';

import { schema } from '@/app/(auth)/signup/schema';
import { RadioField } from '@/components/RadioField';
import { SelectField } from '@/components/SelectField';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { SignupFormType } from '@/lib/form/signupForm';
import { signupFormStore } from '@/lib/store/signupFormStore';
import { dayList, monthList, yearList } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const sexOptions = [
  { label: '男性', value: 'male' },
  { label: '女性', value: 'female' },
];

export default function SignInPage() {
  const router = useRouter();
  const { form, setForm, clearForm } = signupFormStore();
  const { handleSubmit, control } = useForm<SignupFormType>({
    resolver: zodResolver(schema),
    defaultValues: form,
  });

  const onSubmit: SubmitHandler<SignupFormType> = (data) => {
    setForm(data); // Zustand に保管

    router.push('/signupConfirm');
  };

  const onClickPageBack = () => {
    clearForm();
    router.push('/login');
  };

  return (
    <>
      <Card className="w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>新規会員登録</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="signup-form" noValidate onSubmit={handleSubmit(onSubmit)}>
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
                      Grouplabel="性別"
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
        <CardFooter className="flex">
          <div className="flex gap-2">
            <Button onClick={onClickPageBack} className="w-full" variant="outline">
              <Link href="/login">戻る</Link>
            </Button>
            <Button type="submit" form="signup-form" className="w-full">
              確認画面へ進む
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
