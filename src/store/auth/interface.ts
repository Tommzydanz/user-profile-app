import { IResponse } from "../interface";

export interface AuthPayload {
  auth: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface OTPVerificationPayload {
  code: number;
}

export interface Auth {
  expires_in: number;
  uuid: string;
  token: string;
}

export interface AuthState {
  isLoading: boolean;
  token?: string;
  pushId?: string;
  auth?: Auth;
}

export interface AuthResponse extends Auth {
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface UsernamePayload extends AuthPayload {
  username: string;
}

export interface VerifyEmailPayload extends AuthPayload {
  token: string;
}

export interface ResendVerificationPayload {
  email: any;
}

export interface ForgotPasswordResponse extends IResponse {
  data: {
    auth: string;
  };
}

export interface VerifyCodePayload {
  type?: string;
  code: number;
  auth: string;
}

export interface ResendCodePayload {
  type?: string;
  auth: string;
}

// export interface ChangePasswordPayload {
//   code: any;
//   email: any;
//   password: any;
//   verification_id:any
// }

export interface ChangePasswordPayload {
  // code: any;
  // email: any;
  password: any;
  verification_id: any;
}

export interface EditProfilePayload {
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  phone_number: any;
}
