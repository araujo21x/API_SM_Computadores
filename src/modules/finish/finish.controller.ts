import { Request, Response } from 'express';
import responseError from '../../helpers/response/responseError';
import repository from './finish.repository';

class FinishController {
  public async finish (req:Request, res:Response) {
    try {
      return await repository.finish(req, res);
    } catch (err:any) {
      return responseError(res, err.message, 404);
    }
  }
}

export default new FinishController();
