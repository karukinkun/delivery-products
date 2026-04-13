import { prefectureList } from '@/lib/utils';
import { validationErrorMsg } from 'constants/messages';
import { z } from 'zod';

// 都道府県の値を取得
const prefectureValues = prefectureList.map((p) => p.value);

// 姓名共通パターン
// 日本語・英字・数字は許可
// 一般的な姓名用記号（半角カタカナ・半角全角スペース・半角全角ハイフン・全角ドット）は許可
const namePattern =
  /^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Latin}0-9.\s\-・\uFF0D\u3000]+$/u;

const trimmedNonEmpty = (
  label: Extract<keyof typeof validationErrorMsg, 'lastName' | 'firstName'>,
) =>
  z.string().pipe(
    z
      .string()
      .min(1, validationErrorMsg[label].required)
      .max(20, validationErrorMsg[label].max)
      .regex(namePattern, validationErrorMsg[label].pattern)
      // 全角スペース、半角スペース、改行、タブの入力はエラーとする
      .refine((s) => !/\s|\n|\t/.test(s), {
        message: validationErrorMsg[label].notSpace,
      })
      // 文字列が含まれていない場合はエラーとする
      .refine((s) => /\p{L}/u.test(s), { message: validationErrorMsg[label].requireLetter }),
  );

// 年・月・日が数値であるかどうかをチェック
// 年・月・日が数値である場合は、日付の妥当性をチェック
function isValidCalendarDate(year: number, month: number, day: number): boolean {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return false;
  const d = new Date(year, month - 1, day);
  return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
}

export const schema = z
  .object({
    lastName: trimmedNonEmpty('lastName'),
    firstName: trimmedNonEmpty('firstName'),
    gender: z.enum(['male', 'female'], {
      message: validationErrorMsg.gender.required,
    }),
    year: z
      .string()
      .min(1, validationErrorMsg.year.required)
      // 4桁の数字以外はエラーとする
      .regex(/^\d{4}$/, validationErrorMsg.year.invalid),
    month: z
      .string()
      .min(1, validationErrorMsg.month.required)
      // 1〜12の数字以外はエラーとする
      .regex(/^(?:[1-9]|1[0-2])$/, validationErrorMsg.month.invalid),
    day: z
      .string()
      .min(1, validationErrorMsg.day.required)
      // 1〜31の数字以外はエラーとする
      .regex(/^(?:[1-9]|[12]\d|3[01])$/, validationErrorMsg.day.invalid),
    postalCode: z
      .string()
      .min(1, validationErrorMsg.postalCode.required)
      .max(7, validationErrorMsg.postalCode.max)
      .refine((s) => /^[0-9]+$/.test(s), { message: validationErrorMsg.postalCode.invalid }),
    prefecture: z
      .string()
      .min(1, validationErrorMsg.prefecture.required)
      // 都道府県リストにない値が入力された場合はエラーとする
      // TODO: 都道府県リストの型を修正する
      .refine((v) => prefectureValues.includes(v as (typeof prefectureValues)[number]), {
        message: validationErrorMsg.prefecture.invalid,
      }),
    city: z.string().min(1, validationErrorMsg.city.required).max(100, validationErrorMsg.city.max),
    address1: z
      .string()
      .min(1, validationErrorMsg.address1.required)
      .max(100, validationErrorMsg.address1.max),
    address2: z.string().max(100, validationErrorMsg.address2.max),
    email: z
      .string()
      .max(254, validationErrorMsg.email.max)
      // メールアドレスの形式ではない場合はエラーとする
      .refine((val) => z.email().safeParse(val).success, {
        message: validationErrorMsg.email.invalid,
      }),
    password: z
      .string()
      .min(1, validationErrorMsg.password.required)
      .max(128, validationErrorMsg.password.max)
      .refine((val) => val.length >= 8, { message: validationErrorMsg.password.min })
      .refine((val) => /^[\x20-\x7E]+$/.test(val), {
        message: validationErrorMsg.password.asciiOnly,
      })
      .refine((val) => /[A-Z]/.test(val), { message: validationErrorMsg.password.uppercase })
      .refine((val) => /[a-z]/.test(val), { message: validationErrorMsg.password.lowercase })
      .refine((val) => /[0-9]/.test(val), { message: validationErrorMsg.password.numeric })
      .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: validationErrorMsg.password.specialChar,
      }),
    passwordConfirm: z
      .string()
      .min(1, validationErrorMsg.passwordConfirm.required)
      .max(128, validationErrorMsg.passwordConfirm.max),
  })
  .superRefine((data, ctx) => {
    const y = Number(data.year);
    const m = Number(data.month);
    const d = Number(data.day);

    if (!isValidCalendarDate(y, m, d)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['day'],
        message: validationErrorMsg.birthdate.invalid,
      });
      return;
    }

    const birth = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (birth > today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['day'],
        message: validationErrorMsg.birthdate.future,
      });
    }

    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['passwordConfirm'],
        message: validationErrorMsg.passwordConfirm.mismatch,
      });
    }
  });
