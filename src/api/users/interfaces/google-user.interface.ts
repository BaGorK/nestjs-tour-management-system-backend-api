import { AuthProviderEnum } from '../enums/auth-provider.enum';

export interface IGoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  googleId: string;
  profilePicture: string;
  authProvider: AuthProviderEnum.GOOGLE;
}
