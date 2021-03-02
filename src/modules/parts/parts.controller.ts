import { Request, Response } from 'express';
import responseError from '../../helpers/response/responseError';
import repository from './parts.repository';

class PartsController {
  public async indexPartsByType (req: Request, res: Response): Promise<Response> {
    try {
      return await repository.indexPartsByType(req, res);
    } catch (err) {
      return responseError(res, err.message, 404);
    }
  }

  public async filterByType (req: Request, res: Response): Promise<Response> {
    try {
      return await repository.filterByType(req, res);
    } catch (err) {
      return responseError(res, err.message, 404);
    }
  }
}

export default new PartsController();
