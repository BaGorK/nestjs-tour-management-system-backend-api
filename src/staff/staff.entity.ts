import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StaffRole } from './enum/staff-role.enum';

@Entity()
export class Staff {
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
  profilePicture?: string;

  @Column({
    type: 'enum',
    enum: StaffRole,
    default: StaffRole.GUIDE,
  })
  role: StaffRole;

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
