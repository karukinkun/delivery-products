import { validationErrorMsg } from '@/constants/messages';
import { prefectureList } from '@/lib/utils';
import { z } from 'zod';

// 都道府県の値を取得
const prefectureValues = prefectureList.map((p) => p.value);

export const addressSchema = z.object({
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
  address2: z
    .string()
    .min(1, validationErrorMsg.address2.required)
    .max(100, validationErrorMsg.address2.max),
  address3: z
    .string()
    .min(1, validationErrorMsg.address3.required)
    .max(100, validationErrorMsg.address3.max),
  address4: z.string().max(100, validationErrorMsg.address4.max),
});
