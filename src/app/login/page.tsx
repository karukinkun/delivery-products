'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup, Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { loginApi } from '@/lib/api/auth';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type InputType = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { handleSubmit, control } = useForm<InputType>({
    defaultValues: {
      username: 'emilys',
      password: 'emilyspass',
    },
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const res = await loginApi(data.username, data.password);
    localStorage.setItem('accessToken', res.accessToken);
  };

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="pr-2">
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="login-form" className="w-full">
            ログイン
          </Button>
          <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
            パスワードを忘れた方はこちら
          </a>
        </CardFooter>
      </Card>
    </>
  );
}
