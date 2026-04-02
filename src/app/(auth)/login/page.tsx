'use client';

import { TextField } from '@/components/TextField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { InputGroupButton } from '@/components/ui/input-group';
import { loginApi } from '@/lib/api/auth';
import { EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type FormType = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [isShownPassword, setIsShownPassword] = useState<boolean>(false);
  const methods = useForm<FormType>({
    defaultValues: {
      username: 'emilys',
      password: 'emilyspass',
    },
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    const res = await loginApi(data.username, data.password);
    localStorage.setItem('accessToken', res.accessToken);

    router.push('/');
  };

  return (
    <FormProvider {...methods}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
        </CardHeader>
        <CardContent>
          <form noValidate id="login-form" onSubmit={methods.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <TextField name="username" label="ユーザー名" />
              </Field>
              <Field>
                <TextField
                  name="password"
                  type={isShownPassword ? 'text' : 'password'}
                  label="パスワード"
                  autoComplete="off"
                  icon={
                    <InputGroupButton
                      size="icon-xs"
                      onClick={() => {
                        console.log('isShownPassword');
                        setIsShownPassword(!isShownPassword);
                      }}
                    >
                      <EyeOffIcon />
                    </InputGroupButton>
                  }
                  iconAlign="inline-end"
                />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="login-form" className="w-full">
            ログイン
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/signup">新規登録はこちら</Link>
          </Button>
          <Link href="#" className="ml-auto inline-block text-sm underline-offset-4 ">
            パスワードを忘れた方はこちら
          </Link>
        </CardFooter>
      </Card>
    </FormProvider>
  );
}
