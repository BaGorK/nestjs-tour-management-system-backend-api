import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/enums/user-role.enum';
import { ROLES_KEY } from '../constants/role.constants';

export const Role = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
