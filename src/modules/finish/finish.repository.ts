import { Request, Response } from 'express';
import fs from 'fs';
import helper from './finish.helper';

class FinishRepository {
  public async finish (req: Request, res: Response):Promise<void> {
    const dir: string = await this.sendPDV(req);
    res.contentType('application/pdf');
    return res.sendFile(dir);
  }

  private async sendPDV (req: Request): Promise<string> {
    const dir:string = await helper.cratePDF(req);

    setTimeout(() => {
      fs.unlinkSync(dir);
    }, 5000);

    return dir;
  }
}

export default new FinishRepository();
