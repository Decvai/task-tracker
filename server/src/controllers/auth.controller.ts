import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/default';

export const authController = {
	async registration(req: Request, res: Response) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res
					.status(400)
					.json({ message: 'Incorrect request', errors });
			}

			const { email, nickname, password } = req.body;

			const candidate = await User.findOne({ email });
			if (candidate) {
				return res.status(400).json({
					message: `User with email ${email} already exist`,
				});
			}
			const hashPassword = await bcrypt.hash(password, 7);
			const currentTime = Date.now();

			await User.create({
				email,
				nickname,
				password: hashPassword,
				registeredAt: currentTime,
			});

			return res.json({ message: 'User was created' });
		} catch (err) {
			console.log(err);
			res.send({ message: err });
		}
	},

	async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ message: 'User not found' });
			}

			const isPassValid = bcrypt.compareSync(password, user.password);
			if (!isPassValid) {
				return res.status(400).json({ message: 'Invalid password' });
			}

			const token = jwt.sign({ id: user.id }, config.secretKey, {
				// expiresIn: '1h', // Todo: uncomment
			});

			return res.json({
				token,
				user: {
					id: user.id,
					email: user.email,
					nickname: user.nickname,
					registeredAt: user.registeredAt,
					avatar: user.avatar,
				},
			});
		} catch (err) {
			console.log(err);
			res.send({ message: 'Server error!' });
		}
	},

	async auth(req: Request, res: Response) {
		try {
			const user = req.currentUser;

			const token = jwt.sign({ id: user.id }, config.secretKey, {
				expiresIn: '1h',
			});

			return res.json({
				token,
				user: {
					id: user.id,
					email: user.email,
					nickname: user.nickname,
					registeredAt: user.registeredAt,
					avatar: user.avatar,
				},
			});
		} catch (err) {
			console.log(err);
			res.send({ message: 'Server error!' });
		}
	},
};
