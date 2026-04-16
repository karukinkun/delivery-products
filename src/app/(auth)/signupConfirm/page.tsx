'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLegend } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { signupFormStore } from '@/lib/store/signupFormStore';
import { signUp } from 'aws-amplify/auth';
import { buttonMsg, fetchErrorMsg, pageMsg, signUpErrorMsg, words } from 'constants/messages';
import { AlertCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Cognito signUpで返りうる例外名に対応したエラーメッセージを返却
const cognitoExceptionName = (error: unknown): string | undefined => {
  if (typeof error !== 'object' || error === null) return undefined;
  const name = (error as { name?: unknown }).name;
  return typeof name === 'string' ? name : undefined;
};
const signUpErrorMessage = (error: unknown): string => {
  switch (cognitoExceptionName(error)) {
    case 'UsernameExistsException':
    case 'AliasExistsException':
      return signUpErrorMsg.usernameExists;
    case 'InvalidPasswordException':
      return signUpErrorMsg.invalidPassword;
    case 'InvalidParameterException':
      return signUpErrorMsg.invalidParameter;
    case 'TooManyRequestsException':
    case 'LimitExceededException':
      return signUpErrorMsg.limitExceeded;
    case 'CodeDeliveryFailureException':
      return signUpErrorMsg.codeDelivery;
    default:
      return signUpErrorMsg.unknown;
  }
};

const SignUpConfirm = () => {
  const router = useRouter();
  const { form } = signupFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onClick = async () => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      await signUp({
        username: form.email,
        password: form.password,
        options: {
          userAttributes: {
            email: form.email,
            // TODO: 下記DBのユーザーテーブルに登録する
            // name: `${form.lastName} ${form.firstName}`,
            // gender: form.gender,
            // birthdate: `${form.year}-${form.month.padStart(2, '0')}-${form.day.padStart(2, '0')}`,
            // postalCode: form.postalCode,
            // prefecture: form.prefecture,
            // address2: form.address2,
            // address3: form.address3,
            // address4: form.address4,
          },
        },
      });

      router.push('/authCode');
    } catch (error) {
      // eslint-disable-next-line no-console -- 例外のスタック追跡用
      console.error(error);
      setSubmitError(signUpErrorMessage(error));
    } finally {
      setIsSubmitting(false);
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
            <FieldLegend>{words.password}</FieldLegend>
            <FieldDescription>************</FieldDescription>
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
            <Button
              variant="outline"
              asChild
              form="signup-form"
              className="w-full sm:w-[200px]"
              disabled={isSubmitting}
            >
              <Link href="/signup">{buttonMsg.back}</Link>
            </Button>
            <Button
              onClick={onClick}
              form="signup-form"
              className="relative w-full sm:w-[200px]"
              disabled={!!(isSubmitting || submitError)}
            >
              <span className="px-10">{buttonMsg.register}</span>
              {isSubmitting && <Spinner className="absolute top-1/2 right-4 -translate-y-1/2" />}
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUpConfirm;
