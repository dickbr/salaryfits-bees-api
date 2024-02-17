import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bee {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

}