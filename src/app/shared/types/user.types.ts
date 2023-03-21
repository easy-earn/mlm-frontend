export interface User {
  access_token?: string;
  userDoc: UserObject
}

export interface UserObject {
  user_id: string;
  name: string;
  email: string;
  phone_number: string;
  referral_code: string;
  status: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  countryCode?: string | number;
  zipcode?: number;
  is_terms_accepted: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}


export interface SignupForm {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  package?: any;
  parent_code?: string;
  is_terms_accepted: boolean;
}

export interface UpdatePasswordForm {
  email: string;
  otp: string | number;
  password: string;
}
