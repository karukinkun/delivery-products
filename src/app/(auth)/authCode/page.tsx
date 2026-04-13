'use client';

import { schema } from '@/app/(auth)/authCode/schema';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { AuthCodeFormType } from '@/lib/form/authCodeForm';
import { signupFormStore } from '@/lib/store/signupFormStore';
import { zodResolver } from '@hookform/resolvers/zod';

import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const AuthCodePage = () => {
  const router = useRouter();
  const { form, clearForm } = signupFormStore();
  const methods = useForm<AuthCodeFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      confirmationCode: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const onSubmit: SubmitHandler<AuthCodeFormType> = async (data) => {
    console.log('data');
    console.log(data);

    await confirmSignUp({
      username: form.email,
      confirmationCode: data.confirmationCode,
    }); // Zustand にフォーム情報を保存

    // Zustand のフォーム情報をクリア
    clearForm();
    // 会員登録完了ページへ遷移
    router.push('/login');
  };

  const onResendCode = async () => {
    try {
      await resendSignUpCode({
        username: form.email,
      });

      alert('認証コードを再送しました');
    } catch (e: any) {
      console.error(e);

      if (e.name === 'LimitExceededException') {
        alert('送信回数が多すぎます。しばらく待ってください');
      } else {
        alert('再送に失敗しました');
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>コードを認証してください</CardTitle>
        </CardHeader>
        <CardContent>
          <p>メールアドレスに送信された認証コードを入力してください。</p>
          <form noValidate id="authCode-form" onSubmit={methods.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <TextField name="confirmationCode" />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex">
          <div className="flex gap-2">
            <Button type="submit" form="authCode-form" className="w-full">
              コードを認証する
            </Button>
            <Button type="button" variant="outline" onClick={onResendCode} className="w-full">
              コードを再送する
            </Button>
          </div>
        </CardFooter>
      </Card>
    </FormProvider>
  );
};

export default AuthCodePage;
