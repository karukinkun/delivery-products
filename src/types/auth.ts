import type {
  ConfirmSignUpOutput,
  GetCurrentUserOutput,
  ResendSignUpCodeOutput,
  SignInOutput,
  SignUpOutput,
} from 'aws-amplify/auth';

// ユーザー登録API
// --------------------------------------
export type SignUpRequest = {
  email: string;
  password: string;
};

export type SignUpResponse = SignUpOutput;
// --------------------------------------

// 認証コード再送信API
// --------------------------------------
export type ResendSignUpCodeRequest = {
  email: string;
};

export type ResendSignUpCodeResponse = ResendSignUpCodeOutput;
// --------------------------------------

// ユーザー登録確認API
// --------------------------------------
export type ConfirmSignUpRequest = {
  email: string;
  confirmationCode: string;
};

export type ConfirmSignUpResponse = ConfirmSignUpOutput;
// --------------------------------------

// ユーザー登録API
// --------------------------------------
export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = SignInOutput;
// --------------------------------------

export type GetCurrentUserResponse = GetCurrentUserOutput;

export type GetAccessTokenResponse = string | undefined;
