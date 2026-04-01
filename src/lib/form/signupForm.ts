import { schema } from '@/app/(auth)/signup/schema';
import { z } from 'zod';

export type SignupFormType = z.infer<typeof schema>;

export const signupDefaultValues: SignupFormType = {
  firstName: '',
  lastName: '',
  email: '',
  gender: 'male',
  year: '',
  month: '',
  day: '',
};
