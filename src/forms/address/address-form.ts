import { addressSchema } from '@/forms/address/address-schema';
import { z } from 'zod';

export type AddressFormType = z.infer<typeof addressSchema>;

export const addressDefaultValues: AddressFormType = {
  postalCode: '',
  prefecture: '',
  address2: '',
  address3: '',
  address4: '',
};
