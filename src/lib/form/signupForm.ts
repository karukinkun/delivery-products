import { schema } from '@/app/(auth)/signup/schema';
import { z } from 'zod';

export type SignupFormType = z.infer<typeof schema>;

export const signupDefaultValues: SignupFormType = {
  firstName: '',
  lastName: '',
  gender: 'male',
  year: '',
  month: '',
  day: '',
  postalCode: '',
  prefecture: '',
  city: '',
  address1: '',
  address2: '',
  email: '',
  password: '',
  passwordConfirm: '',
};
