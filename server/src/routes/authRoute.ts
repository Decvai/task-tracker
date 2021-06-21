import { Router } from 'express';
import { authController, authValidator } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

export const authRouter = Router();

authRouter.post(
	'/registration',
	authValidator.registration,
	authController.registration
);
authRouter.post('/login', authController.login);
authRouter.get('/auth', authMiddleware, authController.login);
