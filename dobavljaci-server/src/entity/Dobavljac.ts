import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Katalog } from './Katalog';

@Entity('dobavljac')
export class Dobavljac {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  naziv: string;

  @Column()
  adresa: string;

  @OneToMany(type => Katalog, katalog => katalog.dobavljac)
  katalozi: Katalog[]
}

