import {
  Column,
  CreateDateColumn,
  Entity,
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
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
