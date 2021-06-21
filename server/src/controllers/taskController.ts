import { Request, Response } from 'express';
import { check } from 'express-validator';
import { ITask, Task } from '../models/taskModel';

export const taskController = {
	async getTasks(req: Request, res: Response) {
		const day = req.query.day as string;
		if (!day) {
			return res.status(400).json({ message: 'Day is not specified' });
		}

		try {
			const tasks: ITask[] = await Task.find({ day }); // Todo: user: req.user.id
			// console.log(tasks);

			res.json(tasks);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: 'Can not get tasks' });
		}
	},

	async postTask(req: Request, res: Response) {
		const { task } = req.body;
		if (!task) {
			return res.status(400).json({ message: 'Task is not specified' });
		}

		try {
			const newTask = await Task.create({
				name: task.name,
				status: task.status,
				hours: task.hours,
				dateInterval: task.dateInterval,
				notes: task.notes,
				day: req.query.day,
				// owner: req.user.id
				owner: '60c300b06040c51df4ea218a',
			});
			// await newTask.save();

			res.json(newTask);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: err });
		}
	},
};
