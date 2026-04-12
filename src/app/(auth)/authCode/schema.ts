import { z } from 'zod';

export const schema = z.object({
  confirmationCode: z
    .string()
    .min(1, '認証コードは必須です')
    .max(20, '20文字以内で入力してください'),
});
