import { Router, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { createConnection, getRepository } from 'typeorm';
import { Dobavljac } from '../entity/Dobavljac';
import { Katalog } from '../entity/Katalog';
import { Porudzbenica } from '../entity/Porudzbenica';

const app = Router();

app.get('/', async function (req: Request, res: Response) {
  try {
    const dobavljaci = await getRepository(Dobavljac).find();
    res.json(dobavljaci);
  } catch (e) {
    res.json({ error: e.message });
  }
});

app.get('/:id', async function (req: Request, res: Response) {
  try {
    let dobavljac = await getRepository(Dobavljac).findOne(req.params.id);
    if (dobavljac) {
      res.json(dobavljac);
    } else {
      res.json({ error: `Dobavljac id ${req.params.id} ne postoji.` });
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});
app.get('/:id/katalozi', async function (req: Request, res: Response) {
  try {
    const dobavljac = await getRepository(Katalog)
      .createQueryBuilder("katalog").where('katalog.dobavljacId = :id', { id: req.params.id })
      .getMany();
    if (dobavljac) {
      res.json(dobavljac);
    } else {
      res.json({ error: `Dobavljac id ${req.params.id} ne postoji.` });
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});
app.get('/:id/porudzbenice', async function (req: Request, res: Response) {
  try {
    const porudzbenica = await getRepository(Porudzbenica)
      .createQueryBuilder("porudzbenica").leftJoinAndSelect("porudzbenica.dobavljac", "dobavljac").where('porudzbenica.dobavljacId = :id', { id: req.params.id })
      .getMany();
    if (porudzbenica) {
      res.json(porudzbenica);
    } else {
      res.json({ error: `Dobavljac id ${req.params.id} ne postoji.` });
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});
app.post('/', async function (req: Request, res: Response) {
  try {
    const dobavljacJson = req.body;
    let result = null;
    if (dobavljacJson.naziv && dobavljacJson.adresa) {
      result = await getRepository(Dobavljac).insert({ ...dobavljacJson });
      console.log('erryting rite');
    } else {
      result.json({ error: 'Ne valja nes' });
      console.log('suttin rong');
    }
    res.send(result);
    console.log('stigo');
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.patch('/:id', async (req: Request, res: Response) => {
  try {
    await getRepository(Dobavljac).update(req.params.id, req.body);
    let dobavljac = await getRepository(Dobavljac).findOne(req.params.id);
    if (dobavljac) {
      res.json(dobavljac);
    } else {
      res.json({ error: `Dobavljac id ${req.params.id} ne postoji.` });
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});

app.delete('/:id', async function (req: Request, res: Response) {
  try {
    let dobavljac = await getRepository(Dobavljac).findOne(req.params.id);
    if (dobavljac) {
      console.log('removing one ' + req.params.id);
      await getRepository(Dobavljac).delete(req.params.id);
      res.sendStatus(200);
    } else {
      res.json({ error: `Dobavljac sa id = ${req.params.id} ne postoji.` });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export default app;
