import { apiClient } from '@/lib/api/client';
import type {
  AutoSignInApiResponse,
  ConfirmSignUpRequest,
  ConfirmSignUpResponse,
  GetAccessTokenResponse,
  GetCurrentUserResponse,
  ResendSignUpCodeRequest,
  ResendSignUpCodeResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '@/types/auth';
import {
  autoSignIn,
  confirmSignUp,
  fetchAuthSession,
  getCurrentUser,
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
