import express from 'express';
import controller from './controller';

const router = express.Router();

router.pos('/register', controller.register);

export default router;
