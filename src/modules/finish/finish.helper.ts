import { Request } from 'express';
import pdf from 'html-pdf';
import path from 'path';
import ejs from 'ejs';

import generateName from '../../helpers/generateNames';
import { ResponseCode } from '../../helpers/response/responseCode';

class FinishHelper {
  partsTypes: string[] = [
    'motherBoard',
    'cpu',
    'cooler',
    'ram',
    'rom',
    'm2',
    'pciExpress',
    'powerSupply',
    'recorder'
  ];

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
    if (!parts.cable.cooler) throw new Error(ResponseCode.E_003_008);
    if (!parts.cable.powerSupply) throw new Error(ResponseCode.E_003_009);
    if (parts.recorder) { if (!parts.cable.record) throw new Error(ResponseCode.E_003_010); }

    parts.rom.forEach((element:any) => {
      const attributes = element.div === 'rom_1' ? 'rom1' : 'rom2';
      if (!parts.cable[attributes]) {
        if (attributes === 'rom1') {
          throw new Error(ResponseCode.E_003_011);
        }
        if (attributes === 'rom2') {
          throw new Error(ResponseCode.E_003_012);
        }
      }
    });

    if (!this.verifySata(parts)) throw new Error(ResponseCode.E_003_013);
  }

  public errorReport (body:any): any {
    // const { motherBoard, cpu, cooler, powerSupply } = body;
    // const answer: any = { ...error };

    return 'answer';
  }

  private verifySata (parts:any):boolean {
    const { recorder, rom } = parts;
    let undSata:number = 0;
    let undPartsSata:number = 0;

    for (let x = 1; x < 5; x++) {
      if (parts[`sata${x}`]) undSata = undSata++;
    }
    if (recorder)undPartsSata = undPartsSata++;
    undPartsSata = undPartsSata + rom.length;

    return undSata < undPartsSata;
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
