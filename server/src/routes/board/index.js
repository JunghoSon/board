import express from 'express';
import controller from './controller';

const router = express.Router();

router.post('/write', controller.create);

router.get('/list', controller.list);
router.get('/list/:page', controller.list);

router.get('/detail/:id', controller.detail);

export default router;
