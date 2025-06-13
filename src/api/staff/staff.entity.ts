import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StaffRole } from './enum/staff-role.enum';
import { Tour } from '../tours/entities/tour.entity';

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

  @ManyToMany(() => Tour, tour => tour.guides, { onDelete: 'CASCADE' })
  tours: Tour[];

  @CreateDateColumn()
  @Exclude()
  createDate: Date;

  @UpdateDateColumn()
  @Exclude()
  updateDate: Date;
}
