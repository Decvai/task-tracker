import { getCurrentHours, getToday } from './helpers';

export interface ValidateValues {
	name: string;
	hoursFrom: string;
	hoursTo: string;
	dateIntervalFrom: string;
	dateIntervalTo: string;
	notes: string;
}

export type ValidateErrors = {
	[K in keyof ValidateValues]: string;
};

export const newTaskValidate = ({
	name,
	hoursFrom,
	hoursTo,
	dateIntervalFrom,
	dateIntervalTo,
}: ValidateValues) => {
	const today = getToday();
	const currentHours = getCurrentHours();

	const errors = {} as ValidateErrors;

	// Name
	if (!name) {
		errors.name = 'Required';
	} else if (name.length > 50) {
		errors.name = 'Must be 50 characters or less';
	}

	// Expected time
	if ((!hoursFrom && hoursTo) || (hoursFrom && !hoursTo)) {
		errors.hoursFrom = errors.hoursTo =
			'You must include both time dates or delete them';
	} else if (hoursFrom > hoursTo) {
		errors.hoursFrom =
			"The expected time 'from' must be less than the time 'to'";
	} else if (
		hoursFrom &&
		hoursFrom < currentHours &&
		dateIntervalFrom === today
	) {
		errors.hoursFrom = 'The time must be greater than the current one';
	}

	// Date interval
	if (!dateIntervalFrom && !dateIntervalTo) {
		errors.dateIntervalFrom = 'Required';
		errors.dateIntervalTo = 'Required';
	} else if (!dateIntervalFrom) {
		errors.dateIntervalFrom = 'Required';
		errors.dateIntervalTo = '';
	} else if (!dateIntervalTo) {
		errors.dateIntervalTo = 'Required';
		errors.dateIntervalFrom = '';
	} else if (dateIntervalFrom > dateIntervalTo) {
		errors.dateIntervalFrom =
			"The date 'from' must be less than the date 'to'";
	} else if (dateIntervalFrom < today) {
		errors.dateIntervalFrom = "The date 'from must be greater than today";
	}

	return errors;
};
