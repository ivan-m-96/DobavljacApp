import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('dobavljac')
export class Dobavljac {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  naziv: string;

  @Column()
  adresa: string;
}
