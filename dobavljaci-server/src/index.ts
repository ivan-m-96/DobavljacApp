import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import DobavljaciRoutesKontroler from './routes/DobavljacRoutesKontroler';
var cors = require('cors');

createConnection()
  .then(connection => {
    // create express app
    const app = express();

    // set middlewares
    app.use(cors());
    app.use(bodyParser.json());

    // add routers
    app.use('/dobavljaci', DobavljaciRoutesKontroler);

    // start express server
    app.listen(3001, () => console.log('Listening on 3001...'));
  })
  .catch(error => console.log(error));
