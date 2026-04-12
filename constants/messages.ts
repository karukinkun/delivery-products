export const words = {
  required: '必須',
  lastName: '姓',
  firstName: '名',
};

// src/app/(auth)/signup/schema.ts で使用するメッセージを定義
export const messages = {
  lastName: {
    required: `${words.lastName}を入力してください`,
    max: `${words.lastName}は20文字以内で入力してください`,
    space: `${words.lastName}にはスペースは使用できません`,
    pattern: `${words.lastName}の記号は .(ドット)、-(ハイフン)のみ使用できます`,
    number: `${words.lastName}には数字のみは使用できません`,
    letter: `${words.lastName}には文字を含めてください`,
  },
  firstName: {
    required: `${words.firstName}を入力してください`,
    max: `${words.firstName}は20文字以内で入力してください`,
    space: `${words.firstName}にはスペースは使用できません`,
    pattern: `${words.firstName}の記号は .(ドット)、-(ハイフン)のみ使用できます`,
    number: `${words.firstName}には数字のみは使用できません`,
    letter: `${words.firstName}には文字を含めてください`,
  },
  gender: {
    required: '性別を選択してください',
  },
  birthdate: {
    yearRequired: '年は必須です',
    monthRequired: '月は必須です',
    dayRequired: '日は必須です',
    monthRange: '月は1〜12で選択してください',
    dayRange: '日は1〜31で選択してください',
    invalid: '存在しない日付です',
    future: '未来の日付は指定できません',
    tooOld: '生年月日をご確認ください',
  },
  postalCode: {
    required: '郵便番号は必須です',
    format: '郵便番号はハイフンなしの7桁の数字で入力してください',
  },
  prefecture: {
    required: '都道府県を選択してください',
    invalid: '都道府県を正しく選択してください',
  },
  address: {
    required: '市区町村は必須です',
    max: '100文字以内で入力してください',
  },
  email: {
    required: 'メールアドレスは必須です',
    invalid: 'メールアドレスの形式が正しくありません',
    max: 'メールアドレスは254文字以内で入力してください',
  },
  password: {
    required: 'パスワードは必須です',
    min: 'パスワードは8文字以上で入力してください',
    max: 'パスワードは128文字以内で入力してください',
    upper: 'パスワードには英大文字を1文字以上含めてください',
    lower: 'パスワードには英小文字を1文字以上含めてください',
    number: 'パスワードには数字を1文字以上含めてください',
    special: 'パスワードには記号を1文字以上含めてください',
    mismatch: 'パスワードが一致しません',
    ascii: 'パスワードに使用できるのは英数字と記号のみです',
  },
  passwordConfirm: {
    required: 'パスワード確認は必須です',
    max: 'パスワード確認は128文字以内で入力してください',
  },
};
