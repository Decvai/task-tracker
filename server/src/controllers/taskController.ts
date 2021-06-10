import { Request, Response } from 'express';
import { ITask, Task } from '../models/taskModel';

export const taskController = {
	async getTasks(req: Request, res: Response) {
		const day = req.query.day as string;
		if (!day) {
			return res.status(400).json({ message: 'Day is not specified' });
		}

		try {
			const tasks: ITask[] = await Task.find({ day }); // Todo: user: req.user.id
			console.log(tasks);

			res.json(tasks);
		} catch (e) {
			console.log(e);
			return res.status(500).json({ message: 'Can not get tasks' });
		}
	},

	async postTask(req: Request, res: Response) {
		const { task } = req.body;

		if (!task) {
			return res.status(400).json({ message: 'Task is not specified' });
		}

		console.log(task);

		res.json({ message: 'Post task is not implemented' });
	},
};
