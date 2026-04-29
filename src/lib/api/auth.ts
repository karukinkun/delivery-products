import { apiClient } from '@/lib/api/client';
import {
  ConfirmSignUpRequest,
  ResendSignUpCodeRequest,
  SignInRequest,
  SignUpRequest,
} from '@/types/request/auth';
import {
  AutoSignInApiResponse,
  ConfirmSignUpResponse,
  GetAccessTokenResponse,
  GetCurrentUserResponse,
  ResendSignUpCodeResponse,
  SignInResponse,
  SignUpResponse,
} from '@/types/response/auth';
import {
  associateWebAuthnCredential,
  autoSignIn,
  confirmSignUp,
  deleteWebAuthnCredential,
  fetchAuthSession,
  getCurrentUser,
  listWebAuthnCredentials,
  resendSignUpCode,
  signIn,
  signOut,
  signUp,
} from 'aws-amplify/auth';

// サインアップAPI
export function signUpApi({ email, password }: SignUpRequest): Promise<SignUpResponse> {
  return apiClient(
    async () =>
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
          },
          autoSignIn: true,
        },
      }),
  );
}

// 認証コード再送信API
export function resendSignUpCodeApi({
  email,
}: ResendSignUpCodeRequest): Promise<ResendSignUpCodeResponse> {
  return apiClient(() =>
    resendSignUpCode({
      username: email,
    }),
  );
}

// ユーザー登録確認API
export function confirmSignUpApi({
  email,
  confirmationCode,
}: ConfirmSignUpRequest): Promise<ConfirmSignUpResponse> {
  return apiClient(() =>
    confirmSignUp({
      username: email,
      confirmationCode,
    }),
  );
}

// サインインAPI
export function signInApi({ email, password }: SignInRequest): Promise<SignInResponse> {
  return apiClient(() =>
    signIn({
      username: email,
      password,
    }),
  );
}

// 自動サインインAPI
export function autoSignInApi(): Promise<AutoSignInApiResponse> {
  return apiClient(() => autoSignIn());
}

// サインアウトAPI
export function signOutApi(): Promise<void> {
  return apiClient(() => signOut());
}

// 現在のユーザー情報取得API
export function getCurrentUserApi(): Promise<GetCurrentUserResponse> {
  return apiClient(() => getCurrentUser(), {
    globalLoading: false,
  });
}

// アクセストークン取得API
export function getAccessTokenApi(): Promise<GetAccessTokenResponse> {
  return apiClient(
    async () => {
      const session = await fetchAuthSession();
      return session.tokens?.accessToken?.toString();
    },
    {
      globalLoading: false,
    },
  );
}

// TODO: 型定義を別ファイルに移す
export type PasskeyCredential = {
  credentialId: string;
  friendlyCredentialName?: string;
  relyingPartyId?: string;
  createdAt?: Date;
};

export type PasskeyCredentialResponse = PasskeyCredential[];

// TODO: 実装コードが正しいか確認
export function getPasskeysClientApi(): Promise<PasskeyCredentialResponse> {
  return apiClient(
    async () => {
      const result = await listWebAuthnCredentials();
      const out: PasskeyCredential[] = [];
      for (const credential of result.credentials ?? []) {
        const credentialId = credential.credentialId;
        if (credentialId === undefined || credentialId === '') {
          continue;
        }
        out.push({
          credentialId,
          friendlyCredentialName: credential.friendlyCredentialName,
          relyingPartyId: credential.relyingPartyId,
          createdAt: credential.createdAt,
        });
      }
      return out;
    },
    {
      globalLoading: false,
    },
  );
}

export async function registerPasskeyClientApi(): Promise<void> {
  await associateWebAuthnCredential();
}

export async function removePasskeyClientApi(credentialId: string): Promise<void> {
  await deleteWebAuthnCredential({
    credentialId,
  });
}
