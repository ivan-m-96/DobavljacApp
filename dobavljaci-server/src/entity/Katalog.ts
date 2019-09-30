import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Dobavljac } from "./Dobavljac";
import { StavkaKataloga } from "./StavkaKataloga"

@Entity()
export class Katalog {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    datum: Date;

    @ManyToOne(type => Dobavljac, dobavljac => dobavljac.katalozi, { nullable: false })
    dobavljac: Dobavljac;

    @OneToMany(type => StavkaKataloga, stavkaKataloga => stavkaKataloga.katalog)
    stavke: StavkaKataloga[]
}
