import { Router } from 'express';
import { taskController } from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
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
taskRouter.delete(
	'/',
	authMiddleware,
	taskValidator.deleteTask,
	taskController.deleteTask
);
