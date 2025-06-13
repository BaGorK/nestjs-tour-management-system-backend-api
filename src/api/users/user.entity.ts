import { Exclude } from 'class-transformer';
import { Booking } from 'src/api/bookings/booking.entity';
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
import { Review } from 'src/api/reviews/review.entity';

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
    unique: true,
  })
  phoneNumber: string;

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

  @OneToMany(() => Review, review => review.user, { cascade: true })
  reviews: Review[];

  @Column({
    default: true,
    nullable: false,
  })
  isActive: boolean;

  @Column({
    nullable: true,
  })
  resetPasswordToken: string;

  @Column({
    nullable: true,
  })
  resetPasswordTokenExpiresAt: Date;

  @CreateDateColumn()
  @Exclude()
  createDate: Date;

  @UpdateDateColumn()
  @Exclude()
  updateDate: Date;
}
