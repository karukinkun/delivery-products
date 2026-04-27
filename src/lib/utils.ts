import { clsx, type ClassValue } from 'clsx';
import { authErrorMsg, words } from 'constants/messages';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const genderOptions = [
  { label: words.male, value: 'male' },
  { label: words.female, value: 'female' },
  { label: words.other, value: 'other' },
] as const;

// 年月日のリスト
const createYearList = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => {
    const year = start + i;
    return {
      label: String(year),
      value: String(year),
    };
  });
};

export const yearList = (currentYear: number) => {
  return createYearList(currentYear - 100, currentYear);
};

export const monthList = Array.from({ length: 12 }, (_, i) => ({
  label: String(i + 1),
  value: String(i + 1),
}));

export const dayList = Array.from({ length: 31 }, (_, i) => ({
  label: String(i + 1),
  value: String(i + 1),
}));

// 都道府県のリスト
export const prefectureList = [
  { label: '東京都', value: '東京都' },
  { label: '北海道', value: '北海道' },
  { label: '青森県', value: '青森県' },
  { label: '岩手県', value: '岩手県' },
  { label: '宮城県', value: '宮城県' },
  { label: '秋田県', value: '秋田県' },
  { label: '山形県', value: '山形県' },
  { label: '福島県', value: '福島県' },
  { label: '茨城県', value: '茨城県' },
  { label: '栃木県', value: '栃木県' },
  { label: '群馬県', value: '群馬県' },
  { label: '埼玉県', value: '埼玉県' },
  { label: '千葉県', value: '千葉県' },
  { label: '神奈川県', value: '神奈川県' },
  { label: '新潟県', value: '新潟県' },
  { label: '富山県', value: '富山県' },
  { label: '石川県', value: '石川県' },
  { label: '福井県', value: '福井県' },
  { label: '山梨県', value: '山梨県' },
  { label: '長野県', value: '長野県' },
  { label: '岐阜県', value: '岐阜県' },
  { label: '静岡県', value: '静岡県' },
  { label: '愛知県', value: '愛知県' },
  { label: '三重県', value: '三重県' },
  { label: '滋賀県', value: '滋賀県' },
  { label: '京都府', value: '京都府' },
  { label: '大阪府', value: '大阪府' },
  { label: '兵庫県', value: '兵庫県' },
  { label: '奈良県', value: '奈良県' },
  { label: '和歌山県', value: '和歌山県' },
  { label: '鳥取県', value: '鳥取県' },
  { label: '島根県', value: '島根県' },
  { label: '岡山県', value: '岡山県' },
  { label: '広島県', value: '広島県' },
  { label: '山口県', value: '山口県' },
  { label: '徳島県', value: '徳島県' },
  { label: '香川県', value: '香川県' },
  { label: '愛媛県', value: '愛媛県' },
  { label: '高知県', value: '高知県' },
  { label: '福岡県', value: '福岡県' },
  { label: '佐賀県', value: '佐賀県' },
  { label: '長崎県', value: '長崎県' },
  { label: '熊本県', value: '熊本県' },
  { label: '大分県', value: '大分県' },
  { label: '宮崎県', value: '宮崎県' },
  { label: '鹿児島県', value: '鹿児島県' },
  { label: '沖縄県', value: '沖縄県' },
] as const;

// Cognito 認証系のエラーかどうかを判定する
export const isAuthError = (error: unknown, name: string) => {
  return error instanceof Error && error.name === name;
};

// Cognito 認証系の処理で返りうる例外名に対応したエラーメッセージを返却
const cognitoExceptionName = (error: unknown): string | undefined => {
  if (typeof error !== 'object' || error === null) return undefined;
  const name = (error as { name?: unknown }).name;
  return typeof name === 'string' ? name : undefined;
};

export const authErrorMessage = (error: unknown): string => {
  switch (cognitoExceptionName(error)) {
    case 'UsernameExistsException':
    case 'AliasExistsException':
      return authErrorMsg.usernameExists;
    case 'InvalidPasswordException':
      return authErrorMsg.invalidPassword;
    case 'InvalidParameterException':
      return authErrorMsg.invalidParameter;
    case 'TooManyRequestsException':
    case 'LimitExceededException':
      return authErrorMsg.limitExceeded;
    case 'CodeDeliveryFailureException':
      return authErrorMsg.codeDelivery;
    case 'UserNotConfirmedException':
      return authErrorMsg.userNotConfirmed;
    case 'CodeMismatchException':
      return authErrorMsg.codeMismatch;
    case 'ExpiredCodeException':
      return authErrorMsg.expiredCode;
    case 'UserNotFoundException':
      return authErrorMsg.userNotFound;
    case 'NotAuthorizedException':
      return authErrorMsg.notAuthorized;
    case 'UserAlreadyAuthenticatedException':
      return authErrorMsg.alreadyAuthenticated;
    case 'PasswordResetRequiredException':
      return authErrorMsg.passwordResetRequired;
    case 'UnsupportedOperationException':
      return authErrorMsg.InternalError;
    default:
      return authErrorMsg.unknown;
  }
};

// 電話番号の形式をハイフンで区切って返却
export const formatPhoneNumber = (phoneNumber: string) => {
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7)}`;
};
