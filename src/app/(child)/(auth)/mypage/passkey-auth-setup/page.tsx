'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonMsg, pageMsg } from '@/constants/messages';
import { routes } from '@/constants/routes';
import {
  getPasskeysClientApi,
  registerPasskeyClientApi,
  removePasskeyClientApi,
} from '@/lib/api/auth';
import { authErrorMessage } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

const passkeyQueryKey = ['passkeys'] as const;

const PasskeyAuthSetupPage = () => {
  const queryClient = useQueryClient();
  const [fetchError, setFetchError] = useState<string | null>(null);

  const {
    data: passkeys = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: passkeyQueryKey,
    queryFn: getPasskeysClientApi,
    staleTime: 30_000,
  });

  const isPasskeyRegistered = passkeys.length > 0;
  const firstPasskey = passkeys[0];

  const registerMutation = useMutation({
    mutationFn: registerPasskeyClientApi,
    onMutate: () => {
      setFetchError(null);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: passkeyQueryKey });
    },
    onError: (error) => {
      setFetchError(authErrorMessage(error));
    },
  });

  const removeMutation = useMutation({
    mutationFn: removePasskeyClientApi,
    onMutate: () => {
      setFetchError(null);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: passkeyQueryKey });
    },
    onError: (error) => {
      setFetchError(authErrorMessage(error));
    },
  });

  const isProcessing = registerMutation.isPending || removeMutation.isPending;

  const handleRegisterPasskey = () => {
    registerMutation.mutate();
  };

  const handleRemovePasskey = () => {
    if (!firstPasskey) return;

    removeMutation.mutate(firstPasskey.credentialId);
  };

  if (isPending) {
    return <div className="w-full max-w-lg text-center text-sm">読み込み中...</div>;
  }

  if (isError) {
    return (
      <div className="w-full max-w-lg">
        <Alert variant="destructive">
          <AlertDescription>パスキー情報の取得に失敗しました。</AlertDescription>
        </Alert>
        <Button variant="outline" className="mt-4 w-full" asChild>
          <Link href={routes.mypage}>{buttonMsg.backToMypage}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg">
      <h1 className="mb-6 text-center text-2xl font-bold">{pageMsg.passkeyAuthSetup.title}</h1>

      <div className="flex flex-col gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-base">
              {pageMsg.passkeyAuthSetup.whatIsPasskeyTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-muted-foreground text-sm">{pageMsg.passkeyAuthSetup.intro}</p>
            <Alert variant="default">
              <AlertDescription className="whitespace-pre-line">
                {pageMsg.passkeyAuthSetup.whatIsPasskeyBody}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-base">
              {pageMsg.passkeyAuthSetup.currentStatusLabel}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <p
              className={
                isPasskeyRegistered
                  ? 'text-foreground text-sm font-medium'
                  : 'text-muted-foreground text-sm'
              }
            >
              {isPasskeyRegistered
                ? pageMsg.passkeyAuthSetup.statusRegistered
                : pageMsg.passkeyAuthSetup.statusNotRegistered}
            </p>

            {isPasskeyRegistered && firstPasskey && (
              <div className="bg-muted text-muted-foreground rounded-md p-3 text-xs">
                <p>登録名：{firstPasskey.friendlyCredentialName ?? 'パスキー'}</p>
                <p>作成日：{firstPasskey.createdAt?.toLocaleDateString('ja-JP') ?? '-'}</p>
              </div>
            )}

            {fetchError && (
              <Alert variant="destructive">
                <AlertDescription>{fetchError}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col gap-2">
              <Button
                type="button"
                className="w-full"
                onClick={handleRegisterPasskey}
                disabled={isProcessing}
              >
                {registerMutation.isPending ? '登録中...' : buttonMsg.registerPasskey}
              </Button>

              <Button
                type="button"
                variant="destructive"
                className="w-full"
                disabled={!isPasskeyRegistered || isProcessing}
                onClick={handleRemovePasskey}
              >
                {removeMutation.isPending ? '解除中...' : buttonMsg.removePasskey}
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2 border-t pt-4">
            <Button variant="outline" className="w-full" asChild>
              <Link href={routes.mypage}>{buttonMsg.backToMypage}</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PasskeyAuthSetupPage;
