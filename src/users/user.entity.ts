import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './enums/user-role.enum';
import { Exclude } from 'class-transformer';
import { AuthProviderEnum } from './enums/auth-provider.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  password?: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  googleId?: string;

  @Column({
    nullable: true,
  })
  profilePicture?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: AuthProviderEnum,
    default: AuthProviderEnum.EMAIL,
  })
  authProvider: AuthProviderEnum;
}
