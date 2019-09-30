import { Router, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { createConnection, getRepository } from 'typeorm';
import { Katalog } from '../entity/Katalog';
import { StavkaKataloga } from '../entity/StavkaKataloga';


const app = Router();

app.get('/', async function (req: Request, res: Response) {
    try {
        const katalozi = await getRepository(Katalog).find();
        res.json(katalozi);
    } catch (e) {
        res.json({ error: e.message });
    }
});

app.get('/:id', async function (req: Request, res: Response) {
    try {
        const katalog = await getRepository(Katalog).findOne(req.params.id);
        const stavkeKataloga = await getRepository(StavkaKataloga)
            .createQueryBuilder("stavka")
            .where("stavka.katalogId = :id", { id: req.params.id }).getMany();
        katalog.stavke = stavkeKataloga;
        res.json(katalog);
    } catch (e) {
        res.json({ error: e.message });
    }
});

export default app;