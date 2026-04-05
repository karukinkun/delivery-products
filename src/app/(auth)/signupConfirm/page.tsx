'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLegend } from '@/components/ui/field';
import { signupFormStore } from '@/lib/store/signupFormStore';
import { useRouter } from 'next/navigation';

const SignUpConfirm = () => {
  const router = useRouter();
  const { form, clearForm } = signupFormStore();

  const onClick = () => {
    // ToDo: ここで会員登録APIを呼び出す

    clearForm(); // 状態管理を初期化
    router.push('/signup');
  };

  return (
    <>
      <Card className="w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>新規会員登録</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLegend>名前</FieldLegend>
              <FieldDescription>
                {form.lastName} {form.firstName}
              </FieldDescription>
            </Field>
            <Field>
              <FieldLegend>メールアドレス</FieldLegend>
              <FieldDescription>{form.email}</FieldDescription>
            </Field>
            <Field>
              <FieldLegend>性別</FieldLegend>
              <FieldDescription>{form.gender === 'male' ? '男性' : '女性'}</FieldDescription>
            </Field>
            <Field>
              <FieldLegend>生年月日</FieldLegend>
              <FieldDescription>{`${form.year}年${form.month}月${form.day}日`}</FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push('/signup')}
              form="signup-form"
              className="w-full"
            >
              入力画面へ戻る
            </Button>
            <Button onClick={onClick} form="signup-form" className="w-full">
              登録する
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default SignUpConfirm;
