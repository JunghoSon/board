import express from 'express';
import board from './board';

const router = express.Router();

router.use('/board', board);

export default router;

