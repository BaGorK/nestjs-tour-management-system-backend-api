import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tour } from './tour.entity';

@Entity()
export class TourImages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => Tour, tour => tour.additionalImages, { onDelete: 'CASCADE' })
  tour: Tour;

  @CreateDateColumn()
  createDate: Date;
}

/*
export enum TourImageType {
  COVER_IMAGE,
  SUPPORTING_IMAGE,
  LOGO,
}
*/
