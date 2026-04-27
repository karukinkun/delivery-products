'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLegend } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { resendSignUpCodeApi, signUpApi } from '@/lib/api/auth';
import { loadingStore } from '@/lib/store/loadingStore';
import { signupFormStore } from '@/lib/store/signupFormStore';
import { authErrorMessage, cn, formatPhoneNumber, isAuthError } from '@/lib/utils';
import { buttonMsg, fetchErrorMsg, pageMsg, words } from 'constants/messages';
import { AlertCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SignUpConfirm = () => {
  const router = useRouter();
  const { form } = signupFormStore();
  const isLoading = loadingStore((state) => state.isLoading);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!form.email || !form.password) {
      router.replace('/signup');
    }
  }, [form.email, form.password, router]);

  const onClick = async () => {
    setSubmitError(null);
    try {
      await signUpApi({ email: form.email, password: form.password });

      router.push('/authCode');
    } catch (error) {
      // eslint-disable-next-line no-console -- 例外のスタック追跡用
      console.error(error);
      // メールアドレス登録済みかつ認証コード未認証のユーザーの場合
      // 認証コード再送信して認証コード入力画面に遷移する
      if (isAuthError(error, 'UsernameExistsException')) {
        try {
          await resendSignUpCodeApi({ email: form.email });

          router.push('/authCode?resent=1');
          return;
        } catch (resendError) {
          // eslint-disable-next-line no-console -- 例外のスタック追跡用
          console.error(resendError);
          setSubmitError(authErrorMessage(resendError));
          return;
        }
      } else {
        setSubmitError(authErrorMessage(error));
      }
    }
  };

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle>{pageMsg.signupConfirm.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLegend>{words.name}</FieldLegend>
            <FieldDescription>
              {form.lastName} {form.firstName}
            </FieldDescription>
          </Field>
          <Field>
            <FieldLegend>{words.gender}</FieldLegend>
            <FieldDescription>{words[form.gender]}</FieldDescription>
          </Field>
          <Field>
            <FieldLegend>{words.birthdate}</FieldLegend>
            <FieldDescription>{`${form.year}${words.year}${form.month}${words.month}${form.day}${words.day}`}</FieldDescription>
          </Field>
          <Field>
            <FieldLegend>{words.address}</FieldLegend>
            <FieldDescription>
              {/* TODO: 郵便番号にハイフンを挿入 */}
              <span className="mb-1 block">〒{form.postalCode}</span>
              <span className="mb-1 block">
                {form.prefecture}
                {form.address2}
                {form.address3}
              </span>
              <span className="block">{form.address4}</span>
            </FieldDescription>
          </Field>
          <Field>
            <FieldLegend>{words.email}</FieldLegend>
            <FieldDescription>{form.email}</FieldDescription>
          </Field>
          <Field>
            <FieldLegend>{words.phoneNumber}</FieldLegend>
            <FieldDescription>{formatPhoneNumber(form.phoneNumber)}</FieldDescription>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
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
                href="/signup"
                aria-disabled={isLoading}
                className={cn(isLoading && 'pointer-events-none opacity-50')}
              >
                {buttonMsg.back}
              </Link>
            </Button>
            <Button type="button" onClick={onClick} className="relative" disabled={isLoading}>
              <span className="px-10">{buttonMsg.register}</span>
              {isLoading && <Spinner className="absolute top-1/2 right-4 -translate-y-1/2" />}
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUpConfirm;
