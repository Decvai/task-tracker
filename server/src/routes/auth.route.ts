import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { authValidator } from '../utils/validators';

export const authRouter = Router();

authRouter.post(
	'/registration',
	authValidator.registration,
	authController.registration
);
authRouter.post('/login', authController.login);
authRouter.get('/authorization', authMiddleware, authController.auth);
