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

  public cratePDF (req: Request, errorsReported:any): Promise<string> {
    return new Promise((resolve: any, reject: any) => {
      const dir: string = path.resolve(__dirname,
        '..', '..', 'tmp', 'pdf', `${generateName()}.pdf`
      );

      this.createTemplate(req.body, errorsReported).then((data: string) => {
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

    parts.rom.forEach((element: any) => {
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

  public errorReport (body: any): any {
    const answer: any = { cableRom: [] };
    const { cable, error } = body;

    if (!body.motherBoard) {
      answer.motherBoard = { error: 'Não tem placa-mãe!', situation: 'Não funciona' };
    };

    if (!body.cpu) {
      answer.cpu = { error: 'Não tem processador!', situation: 'Não funciona' };
    } else {
      if (error.cpu) answer.cpu = error.cpu;
    };

    if (!body.cooler) {
      answer.cooler = { error: 'Não tem cooler!', situation: 'Não funciona' };
    } else {
      if (error.cooler) answer.cooler = error.cooler;
      if (!cable.cooler) answer.cableCooler = { error: 'Cooler não foi conectado a placa mãe!', situation: 'Não funciona' };
    };

    if (body.ram.length === 0) {
      answer.ram = [{ error: 'Não tem memória RAM!', situation: 'Não funciona' }];
    } else {
      if (error.ram.length > 0) answer.ram = error.ram;
    };

    if (!body.powerSupply) {
      answer.powerSupply = { error: 'Não tem fonte de energia!', situation: 'Não funciona' };
    } else {
      if (error.powerSupply) answer.powerSupply = error.powerSupply;
      if (!cable.powerSupply) answer.cablePowerSupply = { error: 'Fonte não foi conectada a placa mãe!', situation: 'Não funciona' };
    };

    if (body.rom.length === 0) {
      answer.rom = [{ error: 'Não tem Memoria ROM!', situation: 'Mau funcionamento' }];
    } else {
      body.rom.forEach((element: any) => {
        const attributes = element.div === 'rom_1' ? 'rom1' : 'rom2';
        if (!cable[attributes]) {
          answer.cableRom.push(
            { error: 'Fonte não foi conectada a memória ROM!', situation: 'Não funciona', div: element.div });
        }
      });
    };

    if (body.recorder) {
      if (!cable.record) answer.cableRecorder = { error: 'Fonte não foi conectada ao leitor de DVD!', situation: 'Não funciona' };
    }

    if (!this.verifySata(body)) {
      answer.cableSata = { error: 'Faltou conectar o leitor de DVD ou alguma memória ROM na placa-mãe.', situation: 'Não funciona' };
    }

    return answer;
  }

  private verifySata (parts: any): boolean {
    const { recorder, rom, cable } = parts;
    if (recorder || rom.length > 0) {
      let undSata: number = 0;
      let undPartsSata: number = 0;

      for (let x = 1; x < 5; x++) {
        if (cable[`sata${x}`]) undSata++;
      }
      if (recorder) undPartsSata++;
      undPartsSata = undPartsSata + rom.length;

      return undSata === undPartsSata;
    } else {
      return true;
    }
  }

  private createTemplate (parts: any, errorsReported:any): Promise<string> {
    return new Promise<string>((resolve: any, reject: any) => {
      ejs.renderFile(
        path.resolve(__dirname, '..', '..', '..', 'template', 'templateFinish.ejs'),
        { parts: parts, errors: errorsReported },
        (err, data) => {
          if (err) reject(new Error('E_003_002'));
          resolve(data);
        }
      );
    });
  }
}

export default new FinishHelper();
