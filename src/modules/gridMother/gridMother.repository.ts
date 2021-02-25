import { Request, Response } from 'express';
import { ResponseCode } from '../../helpers/response/responseCode';
import helper from './gridMother.helper';

class GridMotherRepository {
  public async show (req: Request, res: Response): Promise<Response> {
    return res.jsonp(await this.findAllGrids(req));
  }

  private async findAllGrids (req: Request): Promise<any> {
    const id = Number(req.params.id);
    if (!id) throw new Error(ResponseCode.E_002_001);
    return await helper.getGrids(id);
  }
}

export default new GridMotherRepository();
