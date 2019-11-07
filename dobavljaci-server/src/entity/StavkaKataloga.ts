import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn, Unique } from "typeorm";
import { Katalog } from "./Katalog";
import { Proizvod } from "./Proizvod";



@Entity()
@Unique(['katalog', 'proizvod'])
export class StavkaKataloga {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    naziv: String;

    @ManyToOne(type => Katalog, katalog => katalog.stavke, { nullable: false, primary: true, eager: true })
    katalog: Katalog

    @ManyToOne(type => Proizvod, { nullable: false, eager: true })
    @JoinColumn()
    proizvod: Proizvod;
}
