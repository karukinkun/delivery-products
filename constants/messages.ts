export const words = {
  required: '必須',
  lastName: '姓',
  firstName: '名',
  gender: '性別',
  male: '男性',
  female: '女性',
  year: '年',
  month: '月',
  day: '日',
  birthdate: '生年月日',
  postalCode: '郵便番号',
  prefecture: '都道府県',
  city: '市区町村',
  address1: '番地',
  address2: '建物名・部屋番号',
  email: 'メールアドレス',
  password: 'パスワード',
  passwordConfirm: 'パスワード確認',
  signup: '新規会員登録',
};

export const buttonMsg = {
  back: '前の画面に戻る',
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
  city: {
    required: `${words.city}を入力してください`,
    max: `${words.city}は100文字以内で入力してください`,
  },
  address1: {
    required: `${words.address1}を入力してください`,
    max: `${words.address1}は100文字以内で入力してください`,
  },
  address2: {
    max: `${words.address2}は100文字以内で入力してください`,
  },
  email: {
    required: `${words.email}を入力してください`,
    max: `${words.email}は254文字以内で入力してください`,
    invalid: `${words.email}の形式が正しくありません`,
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
};

// フェッチエラーのメッセージ
export const fetchErrorMsg = {
  postalCode: {
    failure: '郵便番号から住所情報の取得に失敗しました',
  },
};
