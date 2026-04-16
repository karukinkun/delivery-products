import { schema } from '@/app/(auth)/authCode/schema';
import { z } from 'zod';

export type AuthCodeFormType = z.infer<typeof schema>;

export const signupDefaultValues: AuthCodeFormType = {
  confirmationCode: '',
};
