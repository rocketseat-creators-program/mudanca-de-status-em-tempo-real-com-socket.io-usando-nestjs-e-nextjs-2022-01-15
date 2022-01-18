import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Streamer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  name: string;

  @Column()
  status: boolean;
}
