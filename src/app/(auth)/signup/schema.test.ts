import { describe, expect, it } from 'vitest';
import { signupSchema } from './schema';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

const validData = {
  lastName: '山田-yamada.01ーカナ・ｶﾅ',
  firstName: '太郎-taro.01ーカナ・ｶﾅ',
  gender: 'male',
  year: String(currentYear),
  month: String(currentMonth),
  day: String(currentDay),
  email: 'test@example.com',
  password: '12345aA@',
  passwordConfirm: '12345aA@',
  postalCode: '1234567',
  prefecture: '東京都',
  address2: '渋谷区',
  address3: '1-1-1',
  address4: '',
};

describe('サインアップフォームのバリデーションテスト', () => {
  // =========================
  // 正常系
  // =========================
  it('正常なデータでバリデーションが通る', () => {
    const result = signupSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  // =========================
  // 姓
  // =========================
  it('入力欄（性）が空だとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      lastName: '',
    });
    expect(result.success).toBe(false);
  });

  it('入力欄（性）に半角スペースが含まれるとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      lastName: '山田 太郎',
    });
    expect(result.success).toBe(false);
  });

  it('入力欄（性）に全角スペースが含まれるとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      lastName: '山田　太郎',
    });
    expect(result.success).toBe(false);
  });

  // =========================
  // 名
  // =========================
  it('入力欄（名）が20文字超でエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      firstName: 'あ'.repeat(21),
    });
    expect(result.success).toBe(false);
  });

  it('入力欄（名）に半角スペースが含まれるとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      firstName: '山田 太郎',
    });
    expect(result.success).toBe(false);
  });

  it('入力欄（名）に全角スペースが含まれるとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      firstName: '山田　太郎',
    });
    expect(result.success).toBe(false);
  });

  // =========================
  // 性別
  // =========================
  it('genderが未選択だとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      gender: undefined,
    });
    expect(result.success).toBe(false);
  });

  it('genderが選択肢にない値だとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      gender: 'hoge',
    });
    expect(result.success).toBe(false);
  });

  // // =========================
  // // 生年月日
  // // =========================

  it('入力欄（年）が空だとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      year: undefined,
    });
    expect(result.success).toBe(false);
  });

  it('入力欄（月）が空だとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      month: undefined,
    });
    expect(result.success).toBe(false);
  });

  it('入力欄（日）が空だとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      day: undefined,
    });
    expect(result.success).toBe(false);
  });

  it('入力欄（年）が選択肢にない値だとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      year: '２０００',
    });
    expect(result.success).toBe(false);
  });

  it('入力欄（月）が選択肢にない値だとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      month: '１',
    });
    expect(result.success).toBe(false);
  });

  it('入力欄（日）が選択肢にない値だとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      day: '１',
    });
    expect(result.success).toBe(false);
  });

  it('存在しない日付（2/30）はエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      year: '2020',
      month: '2',
      day: '30',
    });
    expect(result.success).toBe(false);
  });

  it('未来日付はエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      year: String(currentYear),
      month: String(currentMonth),
      day: String(currentDay + 1),
    });
    expect(result.success).toBe(false);
  });

  // =========================
  // email
  // =========================
  it('email形式が不正だとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      email: 'testexample.com',
    });
    expect(result.success).toBe(false);
  });

  it('email形式が不正だとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      email: 'test@examplecom',
    });
    expect(result.success).toBe(false);
  });

  // =========================
  // password
  // =========================
  it('パスワードが8文字未満だとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      password: '1234aA@',
      passwordConfirm: '1234aA@',
    });
    expect(result.success).toBe(false);
  });

  it('大文字がないとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      password: '12345aa@',
      passwordConfirm: '12345aa@',
    });
    expect(result.success).toBe(false);
  });

  it('小文字がないとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      password: '12345AA@',
      passwordConfirm: '12345AA@',
    });
    expect(result.success).toBe(false);
  });

  it('数字がないとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      password: 'aaaaaaA@',
      passwordConfirm: 'aaaaaaA@',
    });
    expect(result.success).toBe(false);
  });

  it('記号がないとエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      password: '12345aAB',
      passwordConfirm: '12345aAB',
    });
    expect(result.success).toBe(false);
  });

  it('passwordとpasswordConfirmが不一致でエラー', () => {
    const result = signupSchema.safeParse({
      ...validData,
      passwordConfirm: '12346aA@',
    });
    expect(result.success).toBe(false);
  });
});
