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
      errorReport = helper.generateError();
    }

    try {
      const dir: string = await helper.cratePDF(req, errorReport);
      const newDir:string = await helper.generatingPdfPassword(dir);

      setTimeout(() => {
        fs.unlinkSync(dir);
        fs.unlinkSync(newDir);
      }, 8000);

      return newDir;
    } catch (err) {
      if (err.message === 'E_003_002') { throw new Error(ResponseCode.E_003_002); }
      throw new Error(ResponseCode.E_003_001);
    }
  }
}

export default new FinishRepository();
