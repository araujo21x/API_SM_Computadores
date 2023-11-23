import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import compression from 'compression';
import partsRouter from './modules/parts';
import gridMotherRouter from './modules/gridMother';
import finishRouter from './modules/finish';
import fs from 'fs';
import path from 'path';
class App {
  public app: express.Application;

  constructor () {
    this.app = express();
    this.config();
    this.routes();
  }

  private config (): void {
    this.configFolder();
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
  }

  private routes (): void {
    this.app.use(partsRouter);
    this.app.use(gridMotherRouter);
    this.app.use(finishRouter);
  }

  private configFolder ():void {
    const dir = path.resolve(__dirname, '..', 'tmp', 'pdf');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

export default new App().app;
