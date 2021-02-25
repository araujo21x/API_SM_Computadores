import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import userRouter from './modules/user';
import partsRouter from './modules/parts';
import gridMotherRouter from './modules/gridMother';

class App {
  public app: express.Application;

  constructor () {
    this.app = express();
    this.config();
    this.routes();
  }

  private config (): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
  }

  private routes (): void {
    this.app.use(userRouter);
    this.app.use(partsRouter);
    this.app.use(gridMotherRouter);
  }
}

export default new App().app;
