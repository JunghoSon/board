import express from 'express';
import controller from './controller';

const router = express.Router();

router.post('/register', controller.register);

router.post('/checkId', controller.checkId);

router.post('/checkEmail', controller.checkEmail);

router.get('/checkToken', controller.checkToken);

router.post('/login', controller.login);

router.post('/modify', controller.modify);

router.get('/profile', controller.profile);
router.post('/profile', controller.profileModify);

export default router;
