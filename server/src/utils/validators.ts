import { check, CustomValidator, query } from 'express-validator';
import { ITimeInterval } from '../shared/interfaces';
import { getCurrentHours, getToday } from './helpers';

export const authValidator = {
	registration: [
		check('email', 'Incorrect email').isEmail(),
		check('password', 'Incorrect password').isLength({ min: 3, max: 12 }),
	],
};

const isValidHours: CustomValidator = (
	{ from, to }: ITimeInterval,
	{ req }
) => {
	const today = getToday();
	const currentHours = getCurrentHours();
	const dateIntervalFrom = req.body.task.dateInterval.from;

	if ((!from && to) || (from && !to)) {
		throw new Error('You must include both time dates or delete them');
	} else if (from > to) {
		throw new Error(
			"The expected time 'from' must be less than the time 'to'"
		);
	} else if (from && from < currentHours && dateIntervalFrom === today) {
		throw new Error('The time must be greater than the current one');
	}

	return true;
};

const isValidDateInterval: CustomValidator = ({ from, to }: ITimeInterval) => {
	const today = getToday();

	if (!from || !to) {
		throw new Error('Required');
	} else if (from > to) {
		throw new Error("The date 'from' must be less than the date 'to'");
	} else if (from < today) {
		throw new Error("The date 'from' must be greater than today");
	}

	return true;
};

const isValidSelectedDay: CustomValidator = (value: string) => {
	if (value < getToday()) {
		throw new Error('The day must be equal or greater than today');
	}

	return true;
};

export const taskValidator = {
	getTasks: [
		query('day', 'Incorrect selected day')
			.notEmpty()
			.custom(isValidSelectedDay),
	],
	newTask: [
		check('task').notEmpty(),
		check('task.name', 'Incorrect name').isLength({ max: 50 }),
		check('task.hours', 'Incorrect hours').custom(isValidHours),
		check('task.dateInterval', 'Incorrect date interval').custom(
			isValidDateInterval
		),
		query('day', 'Incorrect selected day')
			.notEmpty()
			.custom(isValidSelectedDay),
	],
};
