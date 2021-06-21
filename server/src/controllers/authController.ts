import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import authMiddleware from '../middleware/auth.middleware';
import { config } from '../config/default';

export const authValidator = {
	registration: [
		check('email', 'Incorrect email').isEmail(),
		check('password', 'Incorrect password').isLength({ min: 3, max: 12 }),
	],
};

export const authController = {
	async registration(req: Request, res: Response) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const { email, password } = req.body;

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
			console.log(user);
			if (!user) {
				return res.status(400).json({ message: 'User not found' });
			}
			const isPassValid = bcrypt.compareSync(password, user.password);
			if (!isPassValid)
				return res.status(400).json({ message: 'Invalid password' });
			const token = jwt.sign({ id: user.id }, config.secretKey, {
				expiresIn: '1h',
			});
			return res.json({
				token,
				user: {
					id: user.id,
					email: user.email,
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
		const user = req.currentUser;

		try {
			const token = jwt.sign({ id: user.id }, config.secretKey, {
				expiresIn: '1h',
			});
			return res.json({
				token,
				user: {
					id: user.id,
					email: user.email,
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
