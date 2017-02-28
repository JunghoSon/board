import express from 'express';
import controller from './controller';

const router = express.Router();

router.post('/', controller.create);
router.get('/', controller.list);
router.get('/:page', controller.list);
router.post('/dummy', controller.dummy);

export default router;