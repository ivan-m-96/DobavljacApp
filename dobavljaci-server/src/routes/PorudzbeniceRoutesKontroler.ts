import { Router, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { createConnection, getRepository } from 'typeorm';
import { Porudzbenica } from '../entity/Porudzbenica';

const app = Router();

app.get('/:id', async function (req: Request, res: Response) {
    try {
        const porudzbenice = await getRepository(Porudzbenica).createQueryBuilder("porudzbenica")
            .where("porudzbenica.id = :id", { id: req.params.id }).getOne();
        res.json(porudzbenice);
    } catch (e) {
        res.json({ error: e.message });
    }
});

export default app;