import { Router } from 'express';
import PartsController from './parts.controller';
const router = Router();

router.route('/v1/piece')
  .get(PartsController.indexPartsByType);

export default router;
