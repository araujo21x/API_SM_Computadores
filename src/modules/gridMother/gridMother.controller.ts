import { Request, Response } from 'express';
import responseError from '../../helpers/response/responseError';
import repository from './gridMother.repository';

class GridMotherController {
  public async show (req:Request, res:Response): Promise<Response> {
    try {
      return await repository.show(req, res);
    } catch (err) {
      return responseError(res, err.message);
    }
  }
}

export default new GridMotherController();
