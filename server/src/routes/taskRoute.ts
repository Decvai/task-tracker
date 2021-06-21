import { Router } from 'express';
import { taskController } from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { taskValidator } from '../utils/validators';

export const taskRouter = Router();

taskRouter.get(
	'/',
	authMiddleware,
	taskValidator.getTasks,
	taskController.getTasks
);
taskRouter.post(
	'/',
	authMiddleware,
	taskValidator.newTask,
	taskController.postTask
);
