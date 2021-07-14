import { Request, Response } from 'express';
import fs from 'fs';
import helper from './finish.helper';

import { ResponseCode } from '../../helpers/response/responseCode';

class FinishRepository {
  public async finish (req: Request, res: Response): Promise<void> {
    res.contentType('application/pdf');
    return res.sendFile(await this.sendPDV(req));
  }

  private async sendPDV (req: Request): Promise<string> {
    let errorReport: any;

    if (req.body.evaluativeMode) {
      errorReport = helper.errorReport(req.body);
    } else {
      helper.isValidParts(req.body);
    }

    console.log(errorReport);

    try {
      const dir: string = await helper.cratePDF(req);

      setTimeout(() => {
        fs.unlinkSync(dir);
      }, 8000);

      return dir;
    } catch (err) {
      if (err.message === 'E_003_002') { throw new Error(ResponseCode.E_003_002); }
      throw new Error(ResponseCode.E_003_001);
    }
  }
}

export default new FinishRepository();
