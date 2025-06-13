import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tour } from './tour.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class TourImages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => Tour, tour => tour.additionalImages, { onDelete: 'CASCADE' })
  tour: Tour;

  @CreateDateColumn()
  @Exclude()
  createDate: Date;
}

/*
export enum TourImageType {
  COVER_IMAGE,
  SUPPORTING_IMAGE,
  LOGO,
}
*/
