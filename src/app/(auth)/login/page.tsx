'use client';

import { ErrorAlert } from '@/components/common/error-alert';
import { TextField } from '@/components/common/text-field';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldSet } from '@/components/ui/field';
import { InputGroupButton } from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { resendSignUpCodeApi, signInApi } from '@/lib/api/auth';
import { loadingStore } from '@/lib/store/loadingStore';
import { signupFormStore } from '@/lib/store/signupFormStore';
import { authErrorMessage, cn } from '@/lib/utils';
import { authErrorMsg, buttonMsg, words } from 'constants/messages';
import { EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type FormType = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const isLoading = loadingStore((state) => state.isLoading);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isShownPassword, setIsShownPassword] = useState<boolean>(false);
  const { setForm } = signupFormStore();
  const methods = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    setFetchError(null);
    try {
      const result = await signInApi({ email: data.email, password: data.password });
      switch (result.nextStep.signInStep) {
        case 'DONE':
          router.push('/');
          return;
        case 'CONFIRM_SIGN_UP':
          // 5秒後に認証コード再送信して認証コード確認画面へ遷移する
          loadingStore.setState({ isLoading: true });
          setForm({ email: data.email });
          setFetchError(authErrorMsg.authenticationRequired);
          setTimeout(async () => {
            try {
              await resendSignUpCodeApi({ email: data.email });
              router.push('/authCode?from=login');
              return;
            } catch (resendError) {
              // eslint-disable-next-line no-console -- 例外のスタック追跡用
              console.error(resendError);
              setFetchError(authErrorMessage(resendError));
              return;
            }
          }, 5000);
          return;
        default:
          return;
      }
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
          <CardTitle>{words.login}</CardTitle>
        </CardHeader>
        <CardContent>
          <form noValidate id="login-form" onSubmit={handleSubmit(onSubmit)}>
            <FieldSet className="flex gap-6">
              <TextField name="email" label={words.email} autoComplete="email" />
              <TextField
                name="password"
                type={isShownPassword ? 'text' : 'password'}
                label={words.password}
                autoComplete="current-password"
                icon={
                  <InputGroupButton
                    size="icon-sm"
                    onClick={() => setIsShownPassword((prev) => !prev)}
                  >
                    <EyeOffIcon />
                  </InputGroupButton>
                }
                iconAlign="inline-end"
              />
            </FieldSet>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {fetchError && <ErrorAlert fetchErrorMessage={fetchError} />}
          <Button type="submit" form="login-form" className="w-full" disabled={isLoading}>
            <span className="px-10">{words.login}</span>
            {isLoading && <Spinner className="absolute top-1/2 right-4 -translate-y-1/2" />}
          </Button>
          <Button variant="outline" type="button" className="w-full" asChild disabled={isLoading}>
            <Link
              href="/signup"
              aria-disabled={isLoading}
              className={cn(isLoading && 'pointer-events-none opacity-50')}
            >
              {buttonMsg.toSignup}
            </Link>
          </Button>
          <Button variant="link" type="button" asChild disabled={isLoading}>
            <Link
              href="/passwordReset"
              aria-disabled={isLoading}
              className={cn(isLoading && 'pointer-events-none opacity-50')}
            >
              {buttonMsg.toPasswordReset}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </FormProvider>
  );
};

export default LoginPage;
