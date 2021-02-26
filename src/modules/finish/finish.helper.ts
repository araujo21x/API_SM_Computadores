import { Request } from 'express';
import pdf from 'html-pdf';
import path from 'path';
import ejs from 'ejs';

import { ResponseCode } from '../../helpers/response/responseCode';
import generateName from '../../helpers/generateNames';

class FinishHelper {
  public cratePDF (req: Request): Promise<string> {
    return new Promise((resolve: any, reject: any) => {
      const dir: string = path.resolve(__dirname,
        '..', '..', 'tmp', 'pdf', `${generateName()}.pdf`
      );

      this.createTemplate(req.body).then((data:string) => {
        pdf.create(data, {})
          .toFile(`${dir}`, (err) => {
            if (err) reject(new Error(ResponseCode.E_003_001));
            resolve(dir);
          });
      });
    });
  }

  private createTemplate (parts: any): Promise<string> {
    return new Promise<string>((resolve: any, reject: any) => {
      ejs.renderFile(
        path.resolve(__dirname, '..', '..', '..', 'template', 'templateFinish.ejs'),
        { parts: parts },
        (err, data) => {
          if (err) reject(new Error(ResponseCode.E_003_002));
          resolve(data);
        }
      );
    });
  }
}

export default new FinishHelper();
