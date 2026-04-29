import { authCodeSchema } from '@/forms/auth-code/auth-code-schema';
import { z } from 'zod';

export type AuthCodeFormType = z.infer<typeof authCodeSchema>;

export const signupDefaultValues: AuthCodeFormType = {
  confirmationCode: '',
};
