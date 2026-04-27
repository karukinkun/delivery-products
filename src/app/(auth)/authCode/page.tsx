'use client';

import { schema } from '@/app/(auth)/authCode/schema';
import { ErrorAlert } from '@/components/common/error-alert';
import { TextField } from '@/components/common/text-field';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldSet } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { autoSignInApi, confirmSignUpApi, resendSignUpCodeApi } from '@/lib/api/auth';
import { AuthCodeFormType } from '@/lib/form/auth-code-form';
import { loadingStore } from '@/lib/store/loadingStore';
import { signupFormStore } from '@/lib/store/signupFormStore';
import { authErrorMessage, cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { buttonMsg, pageMsg } from 'constants/messages';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const AuthCodePage = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const isLoading = loadingStore((state) => state.isLoading);
  const [fetchError, setFetchError] = useState<string | null>(null);
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
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<AuthCodeFormType> = async (data) => {
    setFetchError(null);
    try {
      const result = await confirmSignUpApi({
        email: form.email,
        confirmationCode: data.confirmationCode,
      });

      // ユーザーフォームのZustand（状態管理） 完全にクリア
      clearForm();

      // 認証コードの確認が完了したら自動サインインを行う
      if (result.nextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
        const signInResult = await autoSignInApi();
        if (signInResult.nextStep.signInStep !== 'DONE') {
          router.replace('/login');
          return;
        }
      }
      router.replace('/signupComplete');
      return;
    } catch (error) {
      // eslint-disable-next-line no-console -- 例外のスタック追跡用
      console.error(error);
      setFetchError(authErrorMessage(error));
    }
  };

  // コードの再送信
  const onResendCode = async () => {
    setFetchError(null);
    try {
      await resendSignUpCodeApi({ email: form.email });
    } catch (error) {
      // eslint-disable-next-line no-console -- 例外のスタック追跡用
      console.error(error);
      setFetchError(authErrorMessage(error));
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
          <form noValidate id="authCode-form" onSubmit={handleSubmit(onSubmit)}>
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
                <Button
                  type="button"
                  variant="primary"
                  onClick={onResendCode}
                  className="w-full"
                  disabled={isLoading}
                >
                  {pageMsg.authCode.resend}
                </Button>
              </Field>
            </FieldSet>
          </form>
        </CardContent>
        <CardFooter className="flex">
          <div className="flex w-full flex-col gap-2">
            {fetchError && <ErrorAlert fetchErrorMessage={fetchError} />}
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" type="button" asChild disabled={isLoading}>
                <Link
                  href={from === 'login' ? '/signupConfirm' : '/login'}
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
