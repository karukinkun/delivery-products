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
  year: z.string().min(1, '年を選択してください'),
  month: z.string().min(1, '月を選択してください'),
  day: z.string().min(1, '日を選択してください'),
});
