import express from 'express';
import controller from './controller';
import authMiddleware from '../../middlewares/auth';

const router = express.Router();

router.post('/register', controller.register);

router.post('/checkId', controller.checkId);

router.post('/checkEmail', controller.checkEmail);

router.use('/checkToken', authMiddleware);
router.get('/checkToken', controller.checkToken);

router.use('/account', authMiddleware);
router.get('/account', controller.account);

router.post('/login', controller.login);

router.use('/modify', authMiddleware);
router.post('/modify', controller.modify);

router.use('/profile', authMiddleware);
router.get('/profile', controller.profile);
router.post('/profile', controller.profileModify);

export default router;
