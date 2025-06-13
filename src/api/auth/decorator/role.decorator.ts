import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/common/enum/Roles.enum';
import { ROLES_KEY } from '../constants/role.constants';

export const Role = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
