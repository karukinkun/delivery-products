import { signupSchema } from '@/app/(auth)/signup/schema';
import { z } from 'zod';

export type SignupFormType = z.infer<typeof signupSchema>;

export const signupDefaultValues: SignupFormType = {
  firstName: '',
  lastName: '',
  gender: 'male',
  year: '',
  month: '',
  day: '',
  email: '',
  password: '',
  passwordConfirm: '',
};
