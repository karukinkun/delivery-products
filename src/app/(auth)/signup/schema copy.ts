import { messages } from 'constants/messages';
import { z } from 'zod';

export const schema = z
  .object({
    lastName: z.string().min(1, messages.lastName.required).max(20, messages.lastName.max),
    firstName: z.string().min(1, messages.firstName.required).max(20, messages.firstName.max),
    gender: z.enum(['male', 'female'], {
      message: '性別を選択してください',
    }),
    year: z.string().min(1, '年は必須です'),
    month: z.string().min(1, '月は必須です'),
    day: z.string().min(1, '日は必須です'),
    postalCode: z.string().min(1, '郵便番号は必須です').max(8, '8文字以内で入力してください'),
    prefecture: z.string().min(1, '都道府県を選択してください'),
    address: z.string().min(1, '市区町村は必須です'),
    email: z
      .string()
      .min(1, 'メールアドレスは必須です')
      .refine((val) => z.email().safeParse(val).success, {
        message: 'メールアドレスが不正です',
      }),
    password: z
      .string()
      .min(1, 'パスワードは必須です')
      .max(20, '20文字以内で入力してください')
      .refine((val) => /[A-Z]/.test(val) && /[0-9]/.test(val), {
        message: 'パスワードには大文字と数字を含めてください',
      }),
    passwordConfirm: z
      .string()
      .min(1, 'パスワード確認は必須です')
      .max(20, '20文字以内で入力してください'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['passwordConfirm'],
        message: 'パスワードが一致しません',
      });
    }
  });
