import { Request, Response } from 'express';
import { ResponseCode } from '../../helpers/response/responseCode';
import helper from './parts.helper';
import typesValid from '../../helpers/typePieceIsValid';

class PartsRepository {
  public async indexPartsByType (req: Request, res: Response): Promise<Response> {
    return res.jsonp(await this.indexByType(req));
  }

  public async filterByType (req: Request, res: Response): Promise<Response> {
    return res.jsonp(await this.partsFilter(req));
  }

  private async indexByType (req: Request): Promise<any> {
    const { type } = req.query;

    if (!type) throw new Error(ResponseCode.E_001_001);
    if (!typesValid(String(type))) throw new Error(ResponseCode.E_001_002);

    return await helper.findParts(String(type));
  }

  private async partsFilter (req: Request): Promise<any> {
    const { type } = req.query;
    if (!type) throw new Error(ResponseCode.E_001_001);
    if (!typesValid(String(type))) throw new Error(ResponseCode.E_001_002);
    helper.validateTypeVariable(req.query);
    return 'foi';
  }
}

export default new PartsRepository();
