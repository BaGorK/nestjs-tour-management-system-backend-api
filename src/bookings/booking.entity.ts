import { Tour } from 'src/tours/entities/tour.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tour, tour => tour.bookings, {
    onDelete: 'CASCADE',
  })
  tour: Tour;

  @ManyToOne(() => User, user => user.bookings, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  price: number;

  @Column({
    default: true,
    nullable: false,
  })
  isPaid: boolean;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
