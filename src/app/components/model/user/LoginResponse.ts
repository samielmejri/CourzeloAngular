export interface LoginResponse {
  id?: string;
  email?: string;
  name?: string;
  lastname?: string;
  roles?: string[];
  photoID?: string;
  institution?: string;
  institutionClass?: string;
  twoFactorAuthEnabled?: boolean;
}
