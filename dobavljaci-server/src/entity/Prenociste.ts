import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Prenociste {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    naziv: string;

    @Column()
    adresa: string;

}

