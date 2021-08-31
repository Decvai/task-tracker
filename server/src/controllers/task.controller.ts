import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ITask, Task } from '../models/task.model';

export const taskController = {
	async getTasks(req: Request, res: Response) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res
					.status(400)
					.send({ message: 'Incorrect request', ...errors });
			}

			const day = req.query.day as string;
			const tasks: ITask[] = await Task.find({
				day,
				owner: req.currentUser.id,
			});

			res.json(tasks);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: 'Can not get tasks' });
		}
	},

	async postTask(req: Request, res: Response) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res
					.status(400)
					.json({ message: 'Incorrect request', ...errors });
			}

			const task: ITask = req.body.task;
			const newTask = await Task.create({
				name: task.name,
				status: task.status,
				hours: task.hours,
				dateInterval: task.dateInterval,
				notes: task.notes,
				day: req.query.day,
				owner: req.currentUser.id,
			});
			await newTask.save();

			res.json(newTask);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: err });
		}
	},

	async deleteTask(req: Request, res: Response) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res
					.status(400)
					.json({ message: 'Incorrect request', ...errors });
			}

			const taskId = req.query.id;
			const task: ITask | null = await Task.findById(taskId);

			if (!task) {
				return res.status(404).json({ message: 'Task not found' });
			}

			await Task.findByIdAndDelete(taskId);

			res.json(task);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: err });
		}
	},
};
