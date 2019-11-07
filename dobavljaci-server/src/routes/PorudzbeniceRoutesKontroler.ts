import { Router, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { createConnection, getRepository, getManager, TransactionManager, getConnection, EntityManager } from 'typeorm';
import { Porudzbenica } from '../entity/Porudzbenica';
import { StavkaPorudzbenice } from '../entity/StavkaPorudzbenice';
import { StavkaKataloga } from '../entity/StavkaKataloga';
import e = require('express');
import { Dobavljac } from '../entity/Dobavljac';
import { Resolver } from 'dns';
import { Proizvod } from '../entity/Proizvod';

const app = Router();

app.get('/:id', async function (req: Request, res: Response) {
    try {
        const porudzbenica = await getRepository(Porudzbenica).createQueryBuilder("porudzbenica").leftJoinAndSelect("porudzbenica.dobavljac", "dobavljac").leftJoinAndSelect("porudzbenica.prenociste", "prenociste")
            .where("porudzbenica.id = :id", { id: req.params.id }).getOne();

        let stavke = await getRepository(StavkaPorudzbenice).createQueryBuilder("stavka").leftJoinAndSelect("stavka.stavkaKataloga", "stavkaKataloga").leftJoinAndSelect("stavkaKataloga.proizvod", "proizvod").where("stavka.porudzbenicaId = :id", { id: req.params.id }).getMany();
        let stavkeSaProiz = [];
        stavke.forEach(async stavka => {
            let novaStavka = { id: stavka.id, porId: stavka.id, kolicina: stavka.kolicina, proizvod: stavka.stavkaKataloga.proizvod }
            stavkeSaProiz.push(novaStavka);
        })

        porudzbenica.stavke = stavkeSaProiz;
        res.json(porudzbenica);
    } catch (e) {
        res.json({ error: e.message });
    }
});

app.post('/', async function (req: Request, res: Response) {
    getConnection().transaction(async (manager) => {


        console.log("server");
        console.log(req.body.porudzbenica);
        const porudzbenica = new Porudzbenica();
        let bodyPor = req.body.porudzbenica;
        porudzbenica.id = bodyPor.id;
        porudzbenica.datum = bodyPor.datum;
        porudzbenica.prenociste = bodyPor.prenociste;
        porudzbenica.dobavljac = bodyPor.dobavljac;
        // porudzbenica.stavke = bodyPor.stavke;
        var json = null;
        console.log(req.body.porudzbenica);
        await manager.insert(Porudzbenica, req.body.porudzbenica).then(result => json = { ...json, ...result });
        let stavke = [];
        // stavke.push(req.body.porudzbenica.stavke.map(async (element) => {

        //     let stavkaKataloga = await manager.findOne(StavkaKataloga, { id: element.proizvod.id });

        //     element.porudzbenica = { id: porudzbenica.id };
        //     element.stavkaKataloga = stavkaKataloga;
        //     // console.log("element");
        //     // console.log(element);
        //     // await manager.save(StavkaPorudzbenice, element).then(result => { json = (result); console.log("Proslo kako treba"); }).catch(err => { json = (err); console.log(err); console.log("Nesto ne valja u cuvanju stavke"); });

        //     return element;
        // }));
        for (let i = 0; i < req.body.porudzbenica.stavke.length; i++) {
            let element = req.body.porudzbenica.stavke[i];

            let stavkaKataloga = await manager.findOne(StavkaKataloga, { id: element.id });
            element.id = element.porId;
            element.stavkaKataloga = stavkaKataloga;
            element.porudzbenica = { id: porudzbenica.id }
            stavke.push(element);
        }
        console.log("stavke ");
        console.log(stavke);
        await manager.insert(StavkaPorudzbenice, stavke).then(results => { json = { ...json, ...results }; console.log(results); })





        res.json(json);

    }).catch(err => res.json(err))

});

app.patch("/:id", async function (req: Request, res: Response) {
    getConnection().transaction(async (manager) => {
        let porudzbenica = req.body.porudzbenica;
        let foundPorudzbenica;
        let response = {};
        console.log(req.body.porudzbenica);
        await manager.getRepository(Porudzbenica).findOne({ id: porudzbenica.id, dobavljac: porudzbenica.dobavljac.id, prenociste: porudzbenica.prenociste.id }).then(res => foundPorudzbenica = res);
        console.log(foundPorudzbenica);
        if (foundPorudzbenica) {
            await manager.getRepository(Porudzbenica).update({ id: foundPorudzbenica.id, dobavljac: foundPorudzbenica.dobavljac.id, prenociste: foundPorudzbenica.prenociste.id }, { datum: req.body.porudzbenica.datum }).then(res => response = { ...response, res });
            for (let i = 0; i < req.body.porudzbenica.stavke.length; i++) {
                let element = req.body.porudzbenica.stavke[i];
                let postojeca;
                await manager.getRepository(StavkaPorudzbenice).findOne({ id: element.porId, porudzbenica: req.body.porudzbenica.id }).then(res => postojeca = res);
                if (postojeca) {
                    await manager.getRepository(StavkaPorudzbenice).update({ id: postojeca.id, porudzbenica: foundPorudzbenica.id }, { kolicina: element.kolicina }).then(res => response = { ...response, res });
                    console.log('updated postojeca' + postojeca);
                } else {
                    let stavkaKataloga = await manager.findOne(StavkaKataloga, { id: element.id });
                    element.id = element.porId;
                    element.stavkaKataloga = stavkaKataloga;
                    element.porudzbenica = { id: foundPorudzbenica.id }

                    await manager.getRepository(StavkaPorudzbenice).insert(element).then(res => response = { ...response, res });
                    console.log('inserted new ' + element);
                }
            }

        }
        res.json(response);
    })
})


export default app;