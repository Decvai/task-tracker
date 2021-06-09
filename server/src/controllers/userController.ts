import { Request, Response } from 'express';

export const userController = {
	async getUsers(req: Request, res: Response) {
		const result = await new Promise(r => {
			setTimeout(() => {
				r(42);
			}, 5000);
		});

		res.send(String(result));
	},
};
