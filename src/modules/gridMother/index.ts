import { Router } from 'express';

const router = Router();
router.route('/v1/gridMother/mother/:id')
  .get();

export default router;
