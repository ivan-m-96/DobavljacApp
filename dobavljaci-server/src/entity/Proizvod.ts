import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { StavkaKataloga } from "./StavkaKataloga";




@Entity()
export class Proizvod {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cena: Number;

    @Column()
    naziv: String;


}
