import { Request, Response } from 'express';
import helper from './finish.helper';

class FinishRepository {
  public async finish (req: Request, res: Response) {
    let dir:string = '';
    dir = await this.sendPDV(req);
    setTimeout(() => {
      res.contentType('application/pdf');
      res.sendFile(dir);
    }, 1000);
  }

  private async sendPDV (req: Request): Promise<string> {
    return await helper.cratePDF(req);
  }
}

export default new FinishRepository();
