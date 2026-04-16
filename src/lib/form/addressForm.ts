import { addressSchema } from '@/app/addressSchema';
import { z } from 'zod';

export type AddressFormType = z.infer<typeof addressSchema>;

export const addressDefaultValues: AddressFormType = {
  postalCode: '',
  prefecture: '',
  address2: '',
  address3: '',
};
