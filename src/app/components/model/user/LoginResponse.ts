export interface LoginResponse {
  id?: number;
  email?: string;
  name?: string;
  lastname?: string;
  roles?: string[];
  photoID?: string;
  twoFactorAuthEnabled?: boolean;
}
