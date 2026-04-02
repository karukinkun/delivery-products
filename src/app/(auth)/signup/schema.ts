import { z } from 'zod';

export const schema = z.object({
  firstName: z.string().min(1, '名は必須です').max(20, '20文字以内で入力してください'),
  lastName: z.string().min(1, '姓は必須です').max(20, '20文字以内で入力してください'),
  email: z
    .string()
    .min(1, 'メールアドレスは必須です')
    .refine((val) => z.email().safeParse(val).success, {
      message: 'メールアドレスが不正です',
    }),
  gender: z.enum(['male', 'female'], {
    message: '性別を選択してください',
  }),
  year: z.string().min(1, '年は必須です'),
  month: z.string().min(1, '月は必須です'),
  day: z.string().min(1, '日は必須です'),
  postalCode: z.string().min(1, '郵便番号は必須です').max(8, '8文字以内で入力してください'),
  prefecture: z.string().min(1, '都道府県を選択してください'),
  address: z.string().min(1, '市区町村は必須です'),
});
