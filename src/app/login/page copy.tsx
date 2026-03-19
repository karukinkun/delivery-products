'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FieldGroup, Field } from '@/components/ui/field';
import { Input as InputType } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginApi } from '@/lib/api/auth';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type InputType = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { handleSubmit, control } = useForm<InputType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    console.log('aa');

    const response = await loginApi(data.email, data.password);
    console.log('response');
    console.log(response);
  };

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="pr-2">
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <InputType
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
                    <InputType
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                  </Field>
                )}
              />
            </FieldGroup>

            {/* <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">パスワード</Label>
                </div>
                <Input id="password" type="password" defaultValue={'emilyspass'} required />
              </div>
            </div> */}
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button className="w-full">ログイン</Button>
          <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
            パスワードを忘れた方はこちら
          </a>
        </CardFooter>
      </Card>
    </>
  );
}
