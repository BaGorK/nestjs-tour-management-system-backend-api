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
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  createDate: Date;

  @ManyToOne(() => User, user => user.reviews, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Tour, tour => tour.reviews, { onDelete: 'CASCADE' })
  tour: Tour;

  @UpdateDateColumn()
  updateDate: Date;
}
