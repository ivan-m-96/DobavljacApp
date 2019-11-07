import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { StavkaKataloga } from "./StavkaKataloga";
import { Porudzbenica } from "./Porudzbenica";



@Entity()
export class StavkaPorudzbenice {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    kolicina: Number;


    @ManyToOne(type => Porudzbenica, porudzbenica => porudzbenica.stavke, { nullable: false, primary: true, onDelete: "CASCADE" })
    porudzbenica: Porudzbenica

    @ManyToOne(type => StavkaKataloga, { nullable: false, eager: true })
    @JoinColumn()
    stavkaKataloga: StavkaKataloga;
}
