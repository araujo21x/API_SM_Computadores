import { Request, Response } from 'express';
import fs from 'fs';
import helper from './finish.helper';
import mailer, { emailMessage } from '../../helpers/mailer';

import { ResponseCode } from '../../helpers/response/responseCode';

class FinishRepository {
  public async finish (req: Request, res: Response): Promise<void> {
    res.contentType('application/pdf');
    return res.sendFile(await this.sendPDV(req));
  }

  private async sendPDV (req: Request): Promise<string> {
    let errorReport: any;
    let sketchDir: string | undefined;

    if (req.body.evaluativeMode) {
      errorReport = helper.errorReport(req.body);
    } else {
      helper.isValidParts(req.body);
      errorReport = helper.generateError();
    }

    try {
      const dir: string = await helper.cratePDF(req, errorReport);

      if (req.body.evaluativeMode) {
        await mailer.sendMail(emailMessage(dir, req.body.studentName));
        errorReport = helper.generateError();
        sketchDir = await helper.cratePDF(req, errorReport);
      }

      setTimeout(() => {
        fs.unlinkSync(dir);
        if (sketchDir) fs.unlinkSync(sketchDir);
      }, 8000);
      return sketchDir ?? dir;
    } catch (err) {
      if (err.message === 'E_003_002') { throw new Error(ResponseCode.E_003_002); }
      throw new Error(ResponseCode.E_003_001);
    }
  }
}

export default new FinishRepository();
