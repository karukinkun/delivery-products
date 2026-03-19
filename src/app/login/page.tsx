'use client';

import { TextField } from '@/components/TextField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup, Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { loginApi } from '@/lib/api/auth';
import { EyeOffIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type InputType = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { handleSubmit, control } = useForm<InputType>({
    defaultValues: {
      username: 'emilys',
      password: 'emilyspass',
    },
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    console.log(data);
    const res = await loginApi(data.username, data.password);
    localStorage.setItem('accessToken', res.accessToken);

    router.push('/');
  };

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <Controller
                  name="username"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      field={field}
                      fieldState={fieldState}
                      name="username"
                      label="username"
                      placeholder="emilys"
                    />
                  )}
                />
              </Field>
              <Field>
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      field={field}
                      fieldState={fieldState}
                      name="password"
                      placeholder="emilyspass"
                      autoComplete="off"
                      label="password"
                      icon={<EyeOffIcon />}
                      iconAlign="inline-end"
                    />
                  )}
                />
              </Field>
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
