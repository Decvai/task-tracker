import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authValidator } from '../utils/validators';

export const authRouter = Router();

authRouter.post(
	'/registration',
	authValidator.registration,
	authController.registration
);
authRouter.post('/login', authController.login);
authRouter.get('/auth', authMiddleware, authController.auth);
