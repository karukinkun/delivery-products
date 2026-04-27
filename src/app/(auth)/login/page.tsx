'use client';

import { TextField } from '@/components/common/text-field';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldSet } from '@/components/ui/field';
import { InputGroupButton } from '@/components/ui/input-group';
import { signInApi } from '@/lib/api/auth';
import { loadingStore } from '@/lib/store/loadingStore';
import { authErrorMessage } from '@/lib/utils';
import { EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type FormType = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const isLoading = loadingStore((state) => state.isLoading);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isShownPassword, setIsShownPassword] = useState<boolean>(false);
  const methods = useForm<FormType>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    setSubmitError(null);
    try {
      await signInApi({ email: data.username, password: data.password });

      router.push('/');
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
          <CardTitle>ログイン</CardTitle>
        </CardHeader>
        <CardContent>
          <form noValidate id="login-form" onSubmit={handleSubmit(onSubmit)}>
            <FieldSet className="flex gap-6">
              <TextField name="username" label="ユーザー名" />
              <TextField
                name="password"
                type={isShownPassword ? 'text' : 'password'}
                label="パスワード"
                autoComplete="off"
                icon={
                  <InputGroupButton
                    size="icon-xs"
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
          <Button type="submit" form="login-form" className="w-full">
            ログイン
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/signup">新規登録はこちら</Link>
          </Button>
          <Link href="#" className="ml-auto inline-block text-sm underline-offset-4">
            パスワードを忘れた方はこちら
          </Link>
        </CardFooter>
      </Card>
    </FormProvider>
  );
};

export default LoginPage;
