import { prefectureList } from '@/lib/utils';
import { messages } from 'constants/messages';
import { z } from 'zod';

const prefectureValues = prefectureList.map((p) => p.value) as [string, ...string[]];

// このschema以外でも使用するため共通ファイルに移動予定

// 姓名共通パターン
// 日本語・英字・数字は許可
// 一般的な姓名用記号（半角カタカナ・半角全角スペース・半角全角ハイフン・全角ドット）は許可
const namePattern =
  /^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Latin}0-9.\s\-・\uFF0D\u3000]+$/u;

// const trimmedNonEmpty = (label: string) =>
// z
//   .pipe(z.string().min(1, messages.required));

// 年・月・日が数値であるかどうかをチェック
// 年・月・日が数値である場合は、日付の妥当性をチェック
function isValidCalendarDate(year: number, month: number, day: number): boolean {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return false;
  const d = new Date(year, month - 1, day);
  return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
}

export const schema = z
  .object({
    lastName: z
      .string()
      .min(1, messages.lastName.required)
      .max(20, messages.lastName.max)
      .regex(namePattern, messages.lastName.pattern)
      // 全角スペース、半角スペース、改行、タブの入力はエラーとする
      .refine((s) => !/\s|\n|\t/.test(s), {
        message: messages.lastName.space,
      })
      // 全角数字も含む数字のみの入力はエラーとする
      .refine((s) => !/^\d+$/.test(s), { message: messages.lastName.number })
      .refine((s) => /\p{L}/u.test(s), { message: messages.lastName.letter }),
    firstName: z
      .string()
      .min(1, messages.firstName.required)
      .max(20, messages.firstName.max)
      .regex(namePattern, messages.firstName.pattern)
      // 全角スペース、半角スペース、改行、タブの入力はエラーとする
      .refine((s) => !/\s|\n|\t/.test(s), {
        message: messages.firstName.space,
      })
      // 全角数字も含む数字のみの入力はエラーとする
      .refine((s) => !/^\d+$/.test(s), { message: messages.firstName.number })
      .refine((s) => /\p{L}/u.test(s), { message: messages.firstName.letter }),
    gender: z.enum(['male', 'female'], {
      message: messages.gender.required,
    }),
    year: z
      .string()
      .min(1, messages.birthdate.yearRequired)
      .regex(/^\d{4}$/, '年は4桁の数字で選択してください'),
    month: z
      .string()
      .min(1, messages.birthdate.monthRequired)
      .regex(/^(?:[1-9]|1[0-2])$/, messages.birthdate.monthRange),
    day: z
      .string()
      .min(1, messages.birthdate.dayRequired)
      .regex(/^(?:[1-9]|[12]\d|3[01])$/, messages.birthdate.dayRange),
    postalCode: trimmedNonEmpty(messages.postalCode.required).pipe(
      z.string().regex(/^\d{7}$/, messages.postalCode.format),
    ),
    prefecture: z
      .string()
      .min(1, messages.prefecture.required)
      .refine((v) => (prefectureValues as readonly string[]).includes(v), {
        message: messages.prefecture.invalid,
      }),
    address: trimmedNonEmpty(messages.address.required).pipe(
      z.string().max(100, messages.address.max),
    ),
    email: trimmedNonEmpty(messages.email.required).pipe(
      z
        .string()
        .max(254, messages.email.max)
        .refine((val) => z.email().safeParse(val).success, {
          message: messages.email.invalid,
        }),
    ),
    password: z
      .string()
      .min(1, messages.password.required)
      .max(128, messages.password.max)
      .refine((val) => val.length >= 8, { message: messages.password.min })
      .refine((val) => /^[\x20-\x7E]+$/.test(val), { message: messages.password.ascii })
      .refine((val) => /[A-Z]/.test(val), { message: messages.password.upper })
      .refine((val) => /[a-z]/.test(val), { message: messages.password.lower })
      .refine((val) => /[0-9]/.test(val), { message: messages.password.number })
      .refine((val) => /[^A-Za-z0-9]/.test(val), { message: messages.password.special }),
    passwordConfirm: z
      .string()
      .min(1, messages.passwordConfirm.required)
      .max(128, messages.passwordConfirm.max),
  })
  .superRefine((data, ctx) => {
    const y = Number(data.year);
    const m = Number(data.month);
    const d = Number(data.day);

    if (!isValidCalendarDate(y, m, d)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['day'],
        message: messages.birthdate.invalid,
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
        message: messages.birthdate.future,
      });
    }

    const oldest = new Date();
    oldest.setFullYear(oldest.getFullYear() - 120);
    oldest.setHours(0, 0, 0, 0);
    if (birth < oldest) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['year'],
        message: messages.birthdate.tooOld,
      });
    }

    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['passwordConfirm'],
        message: messages.password.mismatch,
      });
    }
  });
