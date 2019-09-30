import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { Dobavljac } from "./Dobavljac";
import { StavkaKataloga } from "./StavkaKataloga"
import { Prenociste } from "./Prenociste";
import { StavkaPorudzbenice } from "./StavkaPorudzbenice";

@Entity()
export class Porudzbenica {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    datum: Date;

    @OneToOne(type => Dobavljac, { primary: true })
    @JoinColumn()
    dobavljac: Dobavljac;


    @OneToOne(type => Prenociste, { primary: true })
    @JoinColumn()
    prenociste: Prenociste;


    @OneToMany(type => StavkaPorudzbenice, stavkaPorudzbenice => stavkaPorudzbenice.porudzbenica)
    stavke: StavkaPorudzbenice[]
}
