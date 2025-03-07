import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
