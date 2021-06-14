import { Router } from 'express';
import PartsController from './parts.controller';
const router = Router();

router.route('/v1/piece')
  .get(PartsController.indexPartsByType);

router.route('/v1/piece/filter')
  .get(PartsController.filterByType);

router.route('/v1/piece/getFieldsFilter')
  .get(PartsController.getFieldsFilterByType);
export default router;
