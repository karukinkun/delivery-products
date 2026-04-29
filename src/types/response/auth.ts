import type {
  ConfirmSignUpOutput,
  GetCurrentUserOutput,
  ResendSignUpCodeOutput,
  SignInOutput,
  SignUpOutput,
} from 'aws-amplify/auth';

// ユーザー登録API
// --------------------------------------
export type SignUpResponse = SignUpOutput;

// 認証コード再送信API
// --------------------------------------
export type ResendSignUpCodeResponse = ResendSignUpCodeOutput;
// --------------------------------------

// ユーザー登録確認API
// --------------------------------------
export type ConfirmSignUpResponse = ConfirmSignUpOutput;

// ユーザー認証API
// --------------------------------------
export type SignInResponse = SignInOutput;

// 自動サインインAPI
// --------------------------------------
export type AutoSignInApiResponse = SignInOutput;

// 現在のユーザー情報取得API
// --------------------------------------
export type GetCurrentUserResponse = GetCurrentUserOutput;

// アクセストークン取得API
// --------------------------------------
export type GetAccessTokenResponse = string | undefined;
