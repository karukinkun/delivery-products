// ユーザー登録API
// --------------------------------------
export type SignUpRequest = {
  email: string;
  password: string;
};

// 認証コード再送信API
// --------------------------------------
export type ResendSignUpCodeRequest = {
  email: string;
};

// ユーザー登録確認API
// --------------------------------------
export type ConfirmSignUpRequest = {
  email: string;
  confirmationCode: string;
};

// ユーザー認証API
// --------------------------------------
export type SignInRequest = {
  email: string;
  password: string;
};
