import { getCurrentHours, getToday } from '../helpers';

export interface NewTaskValidateValues {
	name: string;
	hoursFrom: string;
	hoursTo: string;
	dateIntervalFrom: string;
	dateIntervalTo: string;
	notes: string;
}

export type NewTaskValidateErrors = {
	[K in keyof NewTaskValidateValues]: string;
};

export const newTaskValidate = ({
	name,
	hoursFrom,
	hoursTo,
	dateIntervalFrom,
	dateIntervalTo,
}: NewTaskValidateValues) => {
	const errors = {} as NewTaskValidateErrors;

	nameValidate(errors, { name });
	hoursValidate(errors, { hoursFrom, hoursTo, dateIntervalFrom });
	dateIntervalValidate(errors, { dateIntervalFrom, dateIntervalTo });

	return errors;
};

type NameErrors = Pick<NewTaskValidateErrors, 'name'>;
type NameValues = Pick<NewTaskValidateValues, 'name'>;
const nameValidate = (errors: NameErrors, { name }: NameValues) => {
	if (!name) {
		errors.name = 'Required';
	} else if (name.length > 50) {
		errors.name = 'Must be 50 characters or less';
	}
};

type HoursErrors = Pick<NewTaskValidateErrors, 'hoursFrom' | 'hoursTo'>;
type HoursValues = Pick<
	NewTaskValidateValues,
	'hoursFrom' | 'hoursTo' | 'dateIntervalFrom'
>;
const hoursValidate = (
	errors: HoursErrors,
	{ hoursFrom, hoursTo, dateIntervalFrom }: HoursValues
) => {
	const today = getToday();
	const currentHours = getCurrentHours();

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
};

type DateIntervalErrors = Pick<
	NewTaskValidateErrors,
	'dateIntervalFrom' | 'dateIntervalTo'
>;
type DateIntervalValues = Pick<
	NewTaskValidateValues,
	'dateIntervalFrom' | 'dateIntervalTo'
>;
const dateIntervalValidate = (
	errors: DateIntervalErrors,
	{ dateIntervalFrom, dateIntervalTo }: DateIntervalValues
) => {
	const today = getToday();

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
};
