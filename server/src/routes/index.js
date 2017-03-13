import express from 'express';
import board from './board';
import member from './member';

const router = express.Router();

router.use('/board', board);

router.use('/member', member);

export default router;
