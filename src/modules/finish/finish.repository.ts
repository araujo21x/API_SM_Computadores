import { Request, Response } from 'express';
import fs from 'fs';
import helper from './finish.helper';

import { ResponseCode } from '../../helpers/response/responseCode';

class FinishRepository {
  public async finish (req: Request, res: Response): Promise<void> {
    const dir: string = await this.sendPDV(req);
    res.contentType('application/pdf');
    return res.sendFile(dir);
  }

  private async sendPDV (req: Request): Promise<string> {
    let dir:string = '';

    try {
      dir = await helper.cratePDF(req);
      setTimeout(() => {
        fs.unlinkSync(dir);
      }, 5000);

      return dir;
    } catch (err) {
      if (err.message === 'E_003_002') { throw new Error(ResponseCode.E_003_002); }
      throw new Error(ResponseCode.E_003_001);
    }
  }
}

export default new FinishRepository();
