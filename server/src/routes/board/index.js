import express from 'express';
import controller from './controller';

const router = express.Router();

router.post('/write', controller.create);

router.get('/list', controller.list);
router.get('/list/:page', controller.list);

router.post('/dummy', controller.dummy);

export default router;
