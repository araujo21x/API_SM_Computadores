import { Router } from 'express';
import controller from './gridMother.controller';
const router = Router();

router.route('/v1/gridMother/mother/:id')
  .get(controller.show);

export default router;
