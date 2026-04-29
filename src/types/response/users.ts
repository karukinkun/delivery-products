export type UserResponse = {
  id: string;
  cognito_sub: string;
  last_name: string;
  first_name: string;
  gender: string;
  birthday: string;
  postal_code: string;
  prefecture: string;
  address1: string;
  address2: string;
  address3: string | null;
  email: string;
  phone_number: string | null;
  points: number;
  rank: {
    code: string;
    name: string;
    image_url: string;
    point_rate: number;
  };
  default_payment_method: {
    code: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
};
