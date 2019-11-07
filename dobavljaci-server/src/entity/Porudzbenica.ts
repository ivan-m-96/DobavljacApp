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

    @ManyToOne(type => Dobavljac, { primary: true, eager: true })
    @JoinColumn()
    dobavljac: Dobavljac;


    @ManyToOne(type => Prenociste, { primary: true, eager: true })
    @JoinColumn()
    prenociste: Prenociste;


    @OneToMany(type => StavkaPorudzbenice, stavkaPorudzbenice => stavkaPorudzbenice.porudzbenica, { eager: true, onDelete: "CASCADE" })
    stavke: StavkaPorudzbenice[]
}
