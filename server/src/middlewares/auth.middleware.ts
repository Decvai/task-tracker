import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/default';
import { User } from '../models/user.model';

export interface JwtAuthPayload {
	id: string;
}

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.method === 'OPTIONS') return next();

	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) throw new Error('Auth error: no token specified');

		const decoded = jwt.verify(token, config.secretKey) as JwtAuthPayload;

		const user = await User.findOne({ _id: decoded.id });
		if (!user) throw new Error('Auth error: user not found');

		req.currentUser = user;
		next();
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
};
