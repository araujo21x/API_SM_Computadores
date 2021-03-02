import { Request } from 'express';
import pdf from 'html-pdf';
import path from 'path';
import ejs from 'ejs';

import generateName from '../../helpers/generateNames';
import { ResponseCode } from '../../helpers/response/responseCode';

class FinishHelper {
  public cratePDF (req: Request): Promise<string> {
    return new Promise((resolve: any, reject: any) => {
      const dir: string = path.resolve(__dirname,
        '..', '..', 'tmp', 'pdf', `${generateName()}.pdf`
      );

      this.createTemplate(req.body).then((data: string) => {
        pdf.create(data, {})
          .toFile(`${dir}`, (err) => {
            if (err) reject(new Error('E_003_001'));
            resolve(dir);
          });
      }).catch(err => {
        reject(err);
      });
    });
  }

  public isValidParts (parts: any): void {
    if (!parts.motherBoard) throw new Error(ResponseCode.E_003_003);
    if (!parts.cpu) throw new Error(ResponseCode.E_003_004);
    if (!parts.cooler) throw new Error(ResponseCode.E_003_005);
    if (parts.ram.length === 0) throw new Error(ResponseCode.E_003_006);
    if (!parts.powerSupply) throw new Error(ResponseCode.E_003_007);
  }

  private createTemplate (parts: any): Promise<string> {
    return new Promise<string>((resolve: any, reject: any) => {
      ejs.renderFile(
        path.resolve(__dirname, '..', '..', '..', 'template', 'templateFinish.ejs'),
        { parts: parts },
        (err, data) => {
          if (err) reject(new Error('E_003_002'));
          resolve(data);
        }
      );
    });
  }
}

export default new FinishHelper();
