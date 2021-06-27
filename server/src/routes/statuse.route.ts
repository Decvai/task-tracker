import { Response, Router } from 'express';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { IStatus } from '../shared/interfaces';

export const statusRouter = Router();

statusRouter.get('/', (_, res: Response) => {
	try {
		const path = resolve(__dirname, '../data/statuses.json');
		const statusList: IStatus[] = JSON.parse(readFileSync(path).toString());

		res.json(statusList);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: err });
	}
});
