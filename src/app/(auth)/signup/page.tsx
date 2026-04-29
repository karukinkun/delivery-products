'use client';

import AddressForm from '@/components/forms/address-form';
import { NumericTextField } from '@/components/forms/fields/numeric-text-field';
import { RadioField } from '@/components/forms/fields/radio-field';
import { SelectField } from '@/components/forms/fields/select-field';
import { TextField } from '@/components/forms/fields/text-field';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { buttonMsg, pageMsg, words } from '@/constants/messages';
import { SignupFormType } from '@/forms/signup/signup-form';
import { signupSchema } from '@/forms/signup/signup-schema';
import { signupFormStore } from '@/lib/store/signupFormStore';
import { dayList, genderOptions, monthList, yearList } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const currentYear = new Date().getFullYear();

const SignUpPage = () => {
  const router = useRouter();
  const { form, setForm, clearForm } = signupFormStore();
  const methods = useForm<SignupFormType>({
    defaultValues: form,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(signupSchema),
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(form);
  }, [form, reset]);

  const onSubmit: SubmitHandler<SignupFormType> = (data) => {
    setForm(data); // Zustand にフォーム情報を保存

    // 会員登録確認ページへ遷移
    router.push('/signupConfirm');
  };

  const onClickPageBack = () => {
    clearForm(); // Zustand からフォーム情報をクリア
    router.push('/login');
  };

  return (
    <FormProvider {...methods}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>
            <h1>{pageMsg.signup.title}</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form noValidate id="signup-form" onSubmit={handleSubmit(onSubmit)}>
            <FieldSet className="flex gap-6">
              <FieldGroup role="group" className="flex flex-row gap-5">
                <TextField name="lastName" label={words.lastName} required placeholder="山田" />
                <TextField name="firstName" label={words.firstName} required placeholder="太郎" />
              </FieldGroup>
              <RadioField name="gender" label={words.gender} required options={genderOptions} />
              <FieldGroup role="group" className="flex flex-row">
                <SelectField
                  name="year"
                  options={yearList(currentYear)}
                  label={words.birthdate}
                  required
                  endLabel={words.year}
                />
                <SelectField name="month" options={monthList} endLabel={words.month} required />
                <SelectField name="day" options={dayList} endLabel={words.day} required />
              </FieldGroup>
              <AddressForm />
              <NumericTextField name="phoneNumber" label={words.phoneNumber} maxLength={11} />
              <TextField
                name="email"
                label={words.email}
                required
                placeholder="name@example.com"
                type="email"
                autoComplete="email"
              />
              <TextField
                name="password"
                label={words.password}
                required
                type="password"
                autoComplete="new-password"
              />
              <TextField
                name="passwordConfirm"
                label={words.passwordConfirm}
                required
                type="password"
                autoComplete="new-password"
              />
            </FieldSet>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={onClickPageBack}
              className="w-full sm:mr-3 sm:w-[180px]"
              variant="outline"
            >
              {buttonMsg.back}
            </Button>
            <Button type="submit" form="signup-form" className="w-full sm:w-[180px]">
              {buttonMsg.toConfirm}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </FormProvider>
  );
};

export default SignUpPage;
