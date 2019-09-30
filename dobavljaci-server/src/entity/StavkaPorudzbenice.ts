import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { StavkaKataloga } from "./StavkaKataloga";
import { Porudzbenica } from "./Porudzbenica";



@Entity()
export class StavkaPorudzbenice {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    kolicina: Number;


    @ManyToOne(type => Porudzbenica, porudzbenica => porudzbenica.stavke, { nullable: false, primary: true })
    porudzbenica: Porudzbenica

    @OneToOne(type => StavkaKataloga, { nullable: false })
    @JoinColumn()
    stavkaKataloga: StavkaKataloga;
}
