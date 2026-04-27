'use client';

import { schema } from '@/app/(auth)/authCode/schema';
import { TextField } from '@/components/common/text-field';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldSet } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { confirmSignUpApi, resendSignUpCodeApi } from '@/lib/api/auth';
import { AuthCodeFormType } from '@/lib/form/auth-code-form';
import { loadingStore } from '@/lib/store/loadingStore';
import { signupFormStore } from '@/lib/store/signupFormStore';
import { authErrorMessage, cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { buttonMsg, fetchErrorMsg, pageMsg } from 'constants/messages';
import { AlertCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const AuthCodePage = () => {
  const isLoading = loadingStore((state) => state.isLoading);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();
  const { form, clearForm } = signupFormStore();
  const methods = useForm<AuthCodeFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      confirmationCode: '',
    },
    mode: 'onSubmit',
  });
  const {
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<AuthCodeFormType> = async (data) => {
    setSubmitError(null);
    try {
      await confirmSignUpApi({ email: form.email, confirmationCode: data.confirmationCode });

      // ユーザーフォームのZustand（状態管理） 完全にクリア
      clearForm();
      router.push('/signupComplete');
    } catch (error) {
      // eslint-disable-next-line no-console -- 例外のスタック追跡用
      console.error(error);
      setSubmitError(authErrorMessage(error));
    }
  };

  // コードの再送信
  const onResendCode = async () => {
    setSubmitError(null);
    try {
      await resendSignUpCodeApi({ email: form.email });
    } catch (error) {
      // eslint-disable-next-line no-console -- 例外のスタック追跡用
      console.error(error);
      setSubmitError(authErrorMessage(error));
    }
  };

  return (
    <FormProvider {...methods}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{pageMsg.authCode.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{pageMsg.authCode.description}</p>
          <form noValidate id="authCode-form" onSubmit={methods.handleSubmit(onSubmit)}>
            <FieldSet className="flex flex-row items-center gap-2">
              <Field>
                <TextField
                  name="confirmationCode"
                  inputMode="numeric"
                  maxLength={7}
                  onChange={(e) => {
                    // 数字以外除去
                    const value = e.target.value.replace(/\D/g, '').slice(0, 7);
                    setValue('confirmationCode', value);
                  }}
                />
              </Field>
              <Field className="w-[290px]">
                <Button type="button" variant="primary" onClick={onResendCode} className="w-full">
                  {pageMsg.authCode.resend}
                </Button>
              </Field>
            </FieldSet>
          </form>
        </CardContent>
        <CardFooter className="flex">
          <div className="flex w-full flex-col gap-2">
            {submitError && (
              <div className="text-destructive flex gap-2">
                <AlertCircleIcon />
                <div>
                  <p role="alert">{fetchErrorMsg.title}</p>
                  <p role="alert">{submitError}</p>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" type="button" asChild disabled={isLoading}>
                <Link
                  href="/signupConfirm"
                  aria-disabled={isLoading}
                  className={cn(isLoading && 'pointer-events-none opacity-50')}
                >
                  {buttonMsg.back}
                </Link>
              </Button>
              <Button type="submit" form="authCode-form" className="relative" disabled={isLoading}>
                <span className="px-10">{buttonMsg.authenticate}</span>
                {isLoading && isSubmitting && (
                  <Spinner className="absolute top-1/2 right-4 -translate-y-1/2" />
                )}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </FormProvider>
  );
};

export default AuthCodePage;
