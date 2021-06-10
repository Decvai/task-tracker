import { Router } from 'express';
import { taskController } from '../controllers/taskController';

export const taskRouter = Router();

taskRouter.get('/', taskController.getTasks);
taskRouter.post('/', taskController.postTask);
