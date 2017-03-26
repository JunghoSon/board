import express from 'express';
import controller from './controller';

const router = express.Router();

router.post('/register', controller.register);
router.post('/checkId', controller.checkId);
router.post('/checkEmail', controller.checkEmail);
router.get('/checkToken', controller.checkToken);
router.post('/login', controller.login);

export default router;
