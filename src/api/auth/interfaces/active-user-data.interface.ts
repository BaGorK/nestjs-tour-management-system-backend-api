import { Roles } from 'src/common/enum/Roles.enum';

export interface ActiveUserData {
  sub: string;
  email: string;
  role: Roles;
}
