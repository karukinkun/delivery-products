import { addressSchema } from '@/app/addressSchema';
import { validationErrorMsg } from 'constants/messages';
import { z } from 'zod';

// 姓名共通パターン
// 日本語・英字・数字は許可
// 一般的な姓名用記号（半角カタカナ・半角全角スペース・半角全角ハイフン・全角ドット）は許可
const namePattern =
  /^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Latin}0-9.\s\-・\uFF0D\u3000ー]+$/u;

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

export const signupSchema = z
  .object({
    lastName: trimmedNonEmpty('lastName'),
    firstName: trimmedNonEmpty('firstName'),
    gender: z.enum(['male', 'female', 'other'], {
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
    email: z
      .string()
      .max(254, validationErrorMsg.email.max)
      // メールアドレスの形式ではない場合はエラーとする
      .refine((val) => z.email().safeParse(val).success, {
        message: validationErrorMsg.email.invalid,
      }),
    phoneNumber: z
      .string()
      .min(1, validationErrorMsg.phoneNumber.required)
      .max(11, validationErrorMsg.phoneNumber.max)
      .refine((s) => /^[0-9]+$/.test(s), { message: validationErrorMsg.phoneNumber.invalid }),
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
    today.setHours(0, 0, 0, 0);
    if (birth > today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['year'],
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
  })
  .extend(addressSchema.shape);
