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
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

const sexOptions = [
  { label: '男性', value: 'male' },
  { label: '女性', value: 'female' },
];

export default function SignInPage() {
  const router = useRouter();
  const { form, clearForm } = signupFormStore();
  const { control } = useForm<SignupFormType>({
    resolver: zodResolver(schema),
    defaultValues: form,
  });

  const onClick = () => {
    // ToDo: ここで会員登録APIを呼び出す

    clearForm(); // 状態管理を初期化
    router.push('/signup');
  };

  return (
    <>
      <Card className="w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>新規会員登録</CardTitle>
        </CardHeader>
        <CardContent>
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
                      disabled={true}
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
                      disabled={true}
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
                      disabled={true}
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
                    disabled={true}
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
                    disabled={true}
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
        </CardContent>
        <CardFooter className="flex">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push('/signup')}
              form="signup-form"
              className="w-full"
            >
              入力画面へ戻る
            </Button>
            <Button onClick={onClick} form="signup-form" className="w-full">
              登録する
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
