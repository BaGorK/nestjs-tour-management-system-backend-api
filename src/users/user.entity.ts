import { Exclude } from 'class-transformer';
import { Booking } from 'src/bookings/booking.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthProviderEnum } from './enums/auth-provider.enum';
import { UserRole } from './enums/user-role.enum';

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

  @OneToMany(() => Booking, booking => booking.user, { cascade: true })
  bookings: Booking[];

  @Column({
    default: true,
    nullable: false,
  })
  isActive: boolean;

  @CreateDateColumn()
  @Exclude()
  createDate: Date;

  @UpdateDateColumn()
  @Exclude()
  updateDate: Date;
}
