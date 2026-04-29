import { addressDefaultValues, AddressFormType } from '@/forms/address/address-form';
import { signupSchema } from '@/forms/signup/signup-schema';
import { z } from 'zod';

export type SignupFormType = z.infer<typeof signupSchema> & AddressFormType;

export const signupDefaultValues: SignupFormType = {
  firstName: '',
  lastName: '',
  gender: 'male',
  year: '',
  month: '',
  day: '',
  email: '',
  phoneNumber: '',
  password: '',
  passwordConfirm: '',
  ...addressDefaultValues,
};
