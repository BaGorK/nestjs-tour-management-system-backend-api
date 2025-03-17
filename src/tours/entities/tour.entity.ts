import { Exclude } from 'class-transformer';
import { Booking } from 'src/bookings/booking.entity';
import { Review } from 'src/reviews/review.entity';
import { Staff } from 'src/staff/staff.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TourDifficulty } from '../enums/tour-difficulty.enum';
import { TourImages } from './tour-images.entity';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column()
  maxGroupSize: number;

  @Column({
    type: 'enum',
    enum: TourDifficulty,
  })
  difficulty: TourDifficulty;

  @Column({
    type: 'decimal',
    default: 4.5,
  })
  ratingsAverage: number;

  @Column({
    default: 0,
  })
  ratingsQuantity: number;

  @Column()
  price: number;

  @Column({
    default: 0,
    nullable: true,
  })
  priceDiscount?: number;

  @Column()
  summary: string;

  @Column()
  description: string;

  @Column()
  coverImage: string;

  @OneToMany(() => TourImages, tourImage => tourImage.tour, {
    cascade: true,
    eager: true,
  })
  additionalImages: TourImages[];

  @OneToMany(() => Booking, booking => booking.tour, { cascade: true })
  bookings: Booking[];

  @OneToMany(() => Review, review => review.tour, { cascade: true })
  reviews: Review[];

  @ManyToMany(() => Staff, staff => staff.tours, { cascade: true })
  @JoinTable()
  guids: Staff[];

  // TODO:
  // startDates: Date[];
  // startLocation: string;
  // locations: string[];
  // startLocation: {
  //   description: string;
  //   type: string;
  //   coordinates: number[];
  //   address: string;
  // };
  // locations: {
  //   description: string;
  //   type: string;
  //   coordinates: number[];
  //   day: number;
  // }[];

  // guides: string[];

  @CreateDateColumn()
  @Exclude()
  createDate: Date;

  @UpdateDateColumn()
  @Exclude()
  updateDate: Date;
}
