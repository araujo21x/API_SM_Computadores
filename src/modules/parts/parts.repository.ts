import { Request, Response } from 'express';
import { ResponseCode } from '../../helpers/response/responseCode';
import helper from './parts.helper';
import typesValid from '../../helpers/typePieceIsValid';

class PartsRepository {
  public async showPartsByType (req: Request, res: Response): Promise<Response> {
    return res.jsonp(await this.showByType(req));
  }

  private async showByType (req: Request): Promise<any> {
    const { type } = req.query;

    if (!type) throw new Error(ResponseCode.E_001_001);
    if (typeof type !== 'string') throw new Error(ResponseCode.E_001_002);
    if (!typesValid(type)) throw new Error(ResponseCode.E_001_003);

    return await helper.findParts(type);
  }
}

export default new PartsRepository();
