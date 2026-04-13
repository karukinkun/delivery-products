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
import { buttonMsg, fetchErrorMsg, words } from 'constants/messages';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const genderOptions = [
  { label: words.male, value: 'male' },
  { label: words.female, value: 'female' },
];

const SignUpPage = () => {
  const router = useRouter();
  const { form, setForm, clearForm } = signupFormStore();
  const methods = useForm<SignupFormType>({
    resolver: zodResolver(schema),
    defaultValues: form,
    mode: 'onChange',
  });
  const { setValue, setError, resetField, watch } = methods;

  // 郵便番号が七桁入力されたらAPIから住所情報を取得するため、watchで郵便番号を毎入力取得する
  const postalCode = watch('postalCode');

  const onSubmit: SubmitHandler<SignupFormType> = (data) => {
    setForm(data); // Zustand にフォーム情報を保存

    // 会員登録確認ページへ遷移
    router.push('/signupConfirm');
  };

  const onClickPageBack = () => {
    clearForm(); // Zustand からフォーム情報をクリア
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
        setValue('city', response.address2 + response.address3, {
          shouldValidate: true,
          shouldDirty: true,
        });
      } catch (e) {
        setError('postalCode', {
          type: 'manual',
          message: e instanceof Error ? e.message : fetchErrorMsg.postalCode.failure,
        });
        resetField('prefecture');
        resetField('city');
        resetField('address1');
        resetField('address2');
      }
    };

    getAddress();
  }, [postalCode, setValue, setError, resetField]);

  return (
    <FormProvider {...methods}>
      <Card className="w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>{words.signup}</CardTitle>
        </CardHeader>
        <CardContent>
          <form noValidate id="signup-form" onSubmit={methods.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-8">
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <TextField
                    name="lastName"
                    label={words.lastName}
                    required
                    placeholder="山田"
                    maxLength={20}
                  />
                </Field>
                <Field>
                  <TextField
                    name="firstName"
                    label={words.firstName}
                    required
                    placeholder="太郎"
                    maxLength={20}
                  />
                </Field>
              </div>
              <Field>
                <RadioField name="gender" label={words.gender} required options={genderOptions} />
              </Field>
              <Field orientation="horizontal">
                <SelectField
                  name="year"
                  options={yearList}
                  label={words.birthdate}
                  required
                  endLabel={words.year}
                />
                <SelectField name="month" options={monthList} endLabel={words.month} required />
                <SelectField name="day" options={dayList} endLabel={words.day} required />
              </Field>
              <Field>
                <TextField
                  name="postalCode"
                  label={words.postalCode}
                  required
                  type="text"
                  inputMode="numeric"
                  maxLength={7}
                  autoComplete="postal-code"
                  onChange={(e) => {
                    // 数字以外除去
                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 7);
                    methods.setValue('postalCode', e.target.value);
                    // 郵便番号のバリデーションを実行
                    methods.trigger('postalCode');
                  }}
                />
              </Field>
              <Field>
                <SelectField
                  name="prefecture"
                  options={prefectureList}
                  label={words.prefecture}
                  required
                />
              </Field>
              <Field>
                <TextField
                  name="city"
                  label={words.city}
                  required
                  type="text"
                  maxLength={100}
                  autoComplete="address-level2"
                />
              </Field>
              <Field>
                <TextField
                  name="address1"
                  label={words.address1}
                  required
                  type="text"
                  maxLength={100}
                  autoComplete="address-line1"
                />
              </Field>
              <Field>
                <TextField
                  name="address2"
                  label={words.address2}
                  type="text"
                  maxLength={100}
                  autoComplete="address-line2"
                />
              </Field>
              <Field>
                <TextField
                  name="email"
                  label={words.email}
                  required
                  placeholder="name@example.com"
                  type="email"
                  autoComplete="email"
                />
              </Field>
              <Field>
                <TextField
                  name="password"
                  label={words.password}
                  required
                  type="password"
                  autoComplete="new-password"
                />
              </Field>
              <Field>
                <TextField
                  name="passwordConfirm"
                  label={words.passwordConfirm}
                  required
                  type="password"
                  autoComplete="new-password"
                />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex">
          <div className="flex gap-2">
            <Button type="button" onClick={onClickPageBack} className="w-full" variant="outline">
              {buttonMsg.back}
            </Button>
            <Button type="submit" form="signup-form" className="w-full">
              確認画面に進む
            </Button>
          </div>
        </CardFooter>
      </Card>
    </FormProvider>
  );
};

export default SignUpPage;
