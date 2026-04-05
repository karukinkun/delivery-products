'use client';

import { schema } from '@/app/(auth)/signup/schema';
import { RadioField } from '@/components/RadioField';
import { SelectField } from '@/components/SelectField';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { getAddressApi } from '@/lib/api/address';
import { SignupFormType } from '@/lib/form/signupForm';
import { signupFormStore } from '@/lib/store/signupFormStore';
import { dayList, monthList, prefectureList, yearList } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const sexOptions = [
  { label: '男性', value: 'male' },
  { label: '女性', value: 'female' },
];

const SignUpPage = () => {
  const router = useRouter();
  const { form, setForm, clearForm } = signupFormStore();
  const methods = useForm<SignupFormType>({
    resolver: zodResolver(schema),
    defaultValues: form,
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });
  const { setValue, setError, resetField, watch } = methods;

  // 郵便番号が七桁入力されたらAPIから住所情報を取得するため、watchで郵便番号を毎入力取得する
  const postalCode = watch('postalCode');

  const onSubmit: SubmitHandler<SignupFormType> = (data) => {
    setForm(data); // Zustand に保管

    // 会員登録確認画面へ遷移
    router.push('/signupConfirm');
  };

  const onClickPageBack = () => {
    clearForm();
    router.push('/login');
  };

  useEffect(() => {
    if (!postalCode || postalCode.length !== 7) return;

    const getAddress = async () => {
      try {
        const response = await getAddressApi(postalCode);
        if (!response) return;

        setValue('prefecture', response.address1, {
          shouldValidate: true,
          shouldDirty: true,
        });
        setValue('address', response.address2 + response.address3, {
          shouldValidate: true,
          shouldDirty: true,
        });
      } catch (e) {
        setError('postalCode', {
          type: 'manual',
          message: e instanceof Error ? e.message : '住所情報の取得に失敗しました',
        });
        resetField('prefecture');
        resetField('address');
      }
    };

    getAddress();
  }, [postalCode, setValue, setError, resetField]);

  return (
    <FormProvider {...methods}>
      <Card className="w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>新規会員登録</CardTitle>
        </CardHeader>
        <CardContent>
          <form noValidate id="signup-form" onSubmit={methods.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-8">
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <TextField name="lastName" label="姓" required placeholder="山田" />
                </Field>
                <Field>
                  <TextField name="firstName" label="名" required placeholder="太郎" />
                </Field>
              </div>
              <Field>
                <TextField
                  name="email"
                  label="メールアドレス"
                  required
                  placeholder="name@example.com"
                  type="email"
                  autoComplete="email"
                />
              </Field>
              <Field>
                <RadioField name="gender" label="性別" required options={sexOptions} />
              </Field>
              <Field orientation="horizontal">
                <SelectField
                  name="year"
                  options={yearList}
                  label="生年月日"
                  required
                  endLabel="年"
                />
                <SelectField name="month" options={monthList} endLabel="月" required />
                <SelectField name="day" options={dayList} endLabel="日" required />
              </Field>
              <Field>
                <TextField
                  name="postalCode"
                  label="郵便番号"
                  required
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={7}
                  onChange={(e) => {
                    // 数字以外除去
                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 7);
                    methods.setValue('postalCode', e.target.value);
                  }}
                />
              </Field>
              <Field>
                <SelectField name="prefecture" options={prefectureList} label="都道府県" required />
              </Field>
              <Field>
                <TextField name="address" label="市区町村" required type="text" maxLength={100} />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex">
          <div className="flex gap-2">
            <Button type="button" onClick={onClickPageBack} className="w-full" variant="outline">
              戻る
            </Button>
            <Button type="submit" form="signup-form" className="w-full">
              確認画面へ進む
            </Button>
          </div>
        </CardFooter>
      </Card>
    </FormProvider>
  );
};

export default SignUpPage;
