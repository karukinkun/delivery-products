export type CreateUserRequest = {
  last_name: string;
  first_name: string;
  gender: string;
  postal_code: string;
  prefecture: string;
  address1: string;
  address2: string;
  address3?: string | null;
  email: string;
  phone_number?: string | null;
  birthday: string;
};
