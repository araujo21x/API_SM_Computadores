import { Router } from 'express';
import controller from './finish.controller';
const router = Router();

router.route('/finish')
  .post(controller.finish);

export default router;
