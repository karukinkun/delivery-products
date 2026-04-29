export const words = {
  required: '必須',
  name: '名前',
  lastName: '姓',
  firstName: '名',
  gender: '性別',
  male: '男性',
  female: '女性',
  other: '未回答',
  year: '年',
  month: '月',
  day: '日',
  birthdate: '生年月日',
  address: '住所',
  postalCode: '郵便番号',
  prefecture: '都道府県',
  address2: '市区町村',
  address3: '番地',
  address4: '建物名・部屋番号',
  email: 'メールアドレス',
  phoneNumber: '電話番号',
  password: 'パスワード',
  passwordConfirm: 'パスワード確認',
  login: 'ログイン',
  username: 'ユーザー名',
};

export const pageMsg = {
  signup: {
    title: '新規会員登録',
  },
  signupConfirm: {
    title: '新規会員登録確認',
  },
  authCode: {
    title: '認証コード入力',
    description: 'メールアドレスに送信された認証コードを入力してください。',
    resend: 'コードの再送信',
  },
  signupComplete: {
    title: '会員登録完了',
    description: 'ご登録ありがとうございます。\nアカウントの作成が完了しました。',
  },
};

export const buttonMsg = {
  back: '前のページに戻る',
  toConfirm: '確認画面に進む',
  toSignup: '新規会員登録はこちら',
  toPasswordReset: 'パスワードを忘れた方はこちら',
  resendAuthCode: '認証コードの再送信',
  register: '登録する',
  authenticate: 'コードを認証する',
  toProducts: '商品一覧ページへ',
  toTop: 'トップページへ',
};

// バリデーションエラーのメッセージ
export const validationErrorMsg = {
  lastName: {
    required: `${words.lastName}を入力してください`,
    max: `${words.lastName}は20文字以内で入力してください`,
    notSpace: `${words.lastName}にはスペースは使用できません`,
    pattern: `${words.lastName}に使用できる記号は .(ドット)、-(ハイフン)のみです`,
    requireLetter: `${words.lastName}には文字を含めてください`,
  },
  firstName: {
    required: `${words.firstName}を入力してください`,
    max: `${words.firstName}は20文字以内で入力してください`,
    notSpace: `${words.firstName}にはスペースは使用できません`,
    pattern: `${words.firstName}に使用できる記号は .(ドット)、-(ハイフン)のみです`,
    requireLetter: `${words.firstName}には文字を含めてください`,
  },
  gender: {
    required: `${words.gender}を選択してください`,
  },
  year: {
    required: `${words.year}を選択してください`,
    invalid: `${words.year}は4桁の数字以外は無効です`,
  },
  month: {
    required: `${words.month}を選択してください`,
    invalid: `${words.month}は1〜12の数字以外は無効です`,
  },
  day: {
    required: `${words.day}を選択してください`,
    invalid: `${words.day}は1〜31の数字以外は無効です`,
  },
  birthdate: {
    invalid: '存在しない日付は無効です',
    future: '未来の日付は無効です',
  },
  postalCode: {
    required: `${words.postalCode}を入力してください`,
    max: `${words.postalCode}は7文字以内で入力してください`,
    invalid: `${words.postalCode}は数字以外は使用できません`,
  },
  prefecture: {
    required: `${words.prefecture}を選択してください`,
    invalid: `存在しない${words.prefecture}は無効です`,
  },
  address2: {
    required: `${words.address2}を入力してください`,
    max: `${words.address2}は100文字以内で入力してください`,
  },
  address3: {
    required: `${words.address3}を入力してください`,
    max: `${words.address3}は100文字以内で入力してください`,
  },
  address4: {
    max: `${words.address4}は100文字以内で入力してください`,
  },
  email: {
    required: `${words.email}を入力してください`,
    max: `${words.email}は254文字以内で入力してください`,
    invalid: `${words.email}の形式が正しくありません`,
  },
  phoneNumber: {
    required: `${words.phoneNumber}を入力してください`,
    max: `${words.phoneNumber}は11文字以内で入力してください`,
    invalid: `${words.phoneNumber}は数字以外は使用できません`,
  },
  password: {
    required: `${words.password}を入力してください`,
    min: `${words.password}は8文字以上で入力してください`,
    max: `${words.password}は128文字以内で入力してください`,
    uppercase: `${words.password}には英大文字を1文字以上含めてください`,
    lowercase: `${words.password}には英小文字を1文字以上含めてください`,
    numeric: `${words.password}には数字を1文字以上含めてください`,
    specialChar: `${words.password}には記号を1文字以上含めてください`,
    asciiOnly: `${words.password}に使用できるのは英数字と記号のみです`,
  },
  passwordConfirm: {
    required: `${words.passwordConfirm}を入力してください`,
    max: `${words.passwordConfirm}は128文字以内で入力してください`,
    mismatch: `${words.password}と${words.passwordConfirm}が不一致です`,
  },
} as const;

// フェッチエラーのメッセージ
export const fetchErrorMsg = {
  title: 'エラーが発生しました。',
  postalCode: {
    failure: '郵便番号から住所情報の取得に失敗しました',
  },
} as const;

export const authErrorMsg = {
  usernameExists: 'このメールアドレスは既に登録されています。',
  invalidPassword: 'パスワードがポリシーを満たしていません。条件を確認して再度お試しください。',
  invalidParameter: '入力内容に問題があります。内容を確認して再度お試しください。',
  limitExceeded: '試行回数が多すぎます。しばらく時間をおいて再度お試しください。',
  codeDelivery: '確認コードの送信に失敗しました。時間をおいて再度お試しください。',
  userNotConfirmed:
    '認証コードの入力が完了していません。会員情報登録を始めからやり直してください。',
  codeMismatch: '認証コードが誤っています。入力内容を確認して再度お試しください。',
  expiredCode: '認証コードの有効期限が切れています。コードを再送してお試しください。',
  userNotFound: 'ユーザー情報が見つかりませんでした。最初からやり直してください。',
  notMailAddress: '送信先のメールアドレスが見つかりませんでした。最初からやり直してください。',
  notAuthorized: '認証に失敗しました。入力内容を確認して再度お試しください。',
  alreadyAuthenticated: '既にログインしているユーザーです。',
  passwordResetRequired: 'パスワードをリセットする必要があります。',
  InternalError: '現在この認証方法は利用できません。時間をおいて再度お試しください。',
  authenticationRequired: '追加の認証が必要です。5秒後に認証コード確認画面へ遷移します。',
  unknown: '登録に失敗しました。通信状況を確認のうえ、時間をおいて再度お試しください。',
} as const;
