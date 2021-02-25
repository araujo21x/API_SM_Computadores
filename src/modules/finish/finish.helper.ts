import { Request } from 'express';
import pdf from 'html-pdf';
import path from 'path';
import fs from 'fs';

import generateName from '../../helpers/generateNames';

class FinishHelper {
  public async cratePDF (req: Request): Promise<string> {
    const dir: string = path.resolve(__dirname,
      '..', '..', 'tmp', 'pdf', `${generateName()}.pdf`
    );

    pdf.create(JSON.stringify(req.body), {})
      .toFile(`${dir}`, (err) => {
        if (err) throw new Error();
      });

    setTimeout(() => {
      fs.unlinkSync(dir);
    }, 8000);

    return dir;
  }
}

export default new FinishHelper();
