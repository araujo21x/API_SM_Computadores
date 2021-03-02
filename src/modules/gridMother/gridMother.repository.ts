import { Request, Response } from 'express';
import { ResponseCode } from '../../helpers/response/responseCode';
import helper from './gridMother.helper';

class GridMotherRepository {
  public async show (req: Request, res: Response): Promise<Response> {
    return res.jsonp(await this.findAllGrids(req));
  }

  private async findAllGrids (req: Request): Promise<any> {
    const { id } = req.params;
    if (!Number(id) || !id) throw new Error(ResponseCode.E_002_001);
    const response = await helper.getGrids(Number(id));
    if (!response) throw new Error(ResponseCode.E_002_002);

    return response;
  }
}

export default new GridMotherRepository();
