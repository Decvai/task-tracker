import { useFormik } from 'formik';
import { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react';
import { fakePostFetch, statusList, Task, TimeInterval } from '../../api/tasks';

interface NewTaskProps {
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>>;
}

interface ValidateValues {
	name: string;
	hoursFrom: string;
	hoursTo: string;
	dateIntervalFrom: string;
	dateIntervalTo: string;
	notes: string;
}

type ValidateErrors = {
	[K in keyof ValidateValues]: string;
};

const today = new Date().toISOString().slice(0, 10);
const currentHours = `${new Date().getHours()}:${new Date().getMinutes()}`;
const initialValues: ValidateValues = {
	name: '',
	hoursFrom: '',
	hoursTo: '',
	dateIntervalFrom: today,
	dateIntervalTo: today,
	notes: '',
};

const validate = ({
	name,
	hoursFrom,
	hoursTo,
	dateIntervalFrom,
	dateIntervalTo,
}: ValidateValues) => {
	const errors = {} as ValidateErrors;

	if (!name) {
		errors.name = 'Required';
	} else if (name.length > 50) {
		errors.name = 'Must be 50 characters or less';
	}

	if ((!hoursFrom && hoursTo) || (hoursFrom && !hoursTo)) {
		errors.hoursFrom = 'You must include both time dates or delete them';
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

	if (!dateIntervalFrom || !dateIntervalTo) {
		errors.dateIntervalFrom = 'Both dates are required';
	} else if (dateIntervalFrom > dateIntervalTo) {
		errors.dateIntervalFrom =
			"The date 'from' must be less than the date 'to'";
	} else if (dateIntervalFrom < today) {
		errors.dateIntervalFrom = "The date 'from must be greater than today";
	}

	return errors;
};

export const NewTask: FC<NewTaskProps> = ({ active, setActive }) => {
	const formik = useFormik({
		initialValues,
		validate,
		onSubmit: async ({
			name,
			hoursFrom,
			hoursTo,
			dateIntervalFrom,
			dateIntervalTo,
			notes,
		}: ValidateValues) => {
			const id = new Date().getTime().toLocaleString();
			const newTask: Task = {
				id,
				name,
				hours: {
					from: hoursFrom,
					to: hoursTo,
				},
				dateInterval: {
					from: dateIntervalFrom,
					to: dateIntervalTo,
				},
				notes,
				status: statusList.blank,
			};

			console.log(newTask);

			//TODO: send to server

			const response: Task = await fakePostFetch(newTask);
			if (!response) {
				alert('Response is not ok'); //TODO create a submit button effect
				return;
			}

			setActive(false);
		},
	});

	return (
		<div
			className={active ? 'new-task active' : 'new-task'}
			onClick={() => setActive(false)}
		>
			<form
				className={
					active ? 'new-task__content active' : 'new-task__content'
				}
				onSubmit={formik.handleSubmit}
				onClick={e => e.stopPropagation()}
			>
				<div>
					<label htmlFor='name'>Name: </label>
					<input
						id='name'
						className='new-task__name'
						type='text'
						{...formik.getFieldProps('name')}
					/>
				</div>
				{formik.touched.name && formik.errors.name ? (
					<div>{formik.errors.name}</div>
				) : null}

				<div>
					<label htmlFor='hoursFrom'>Expected time: </label>
					<div>
						<input
							id='hoursFrom'
							type='time'
							{...formik.getFieldProps('hoursFrom')}
						/>

						<span className='new-task__separator'>—</span>
						<input
							id='hoursTo'
							type='time'
							{...formik.getFieldProps('hoursTo')}
						/>
					</div>
					{(formik.touched.hoursFrom || formik.touched.hoursTo) &&
					formik.errors.hoursFrom ? (
						<div>{formik.errors.hoursFrom}</div>
					) : null}
				</div>

				<div>
					<label htmlFor='dateIntervalFrom'>Date interval: </label>
					<div>
						<input
							id='dateIntervalFrom'
							type='date'
							{...formik.getFieldProps('dateIntervalFrom')}
						/>
						<span className='new-task__separator'>—</span>
						<input
							id='dateIntervalTo'
							type='date'
							{...formik.getFieldProps('dateIntervalTo')}
						/>
					</div>
					{(formik.touched.dateIntervalFrom ||
						formik.touched.dateIntervalTo) &&
					formik.errors.dateIntervalFrom ? (
						<div>{formik.errors.dateIntervalFrom}</div>
					) : null}
				</div>

				<div>
					<label htmlFor='notes'>Notes:</label>
					<textarea
						id='notes'
						className='new-task__notes'
						rows={10}
						cols={70}
						maxLength={3000}
						{...formik.getFieldProps('notes')}
					></textarea>
				</div>

				<hr />

				<div className='new-task__confirm'>
					<input type='submit' value='Create' />
					{/* <button type='submit'>Create</button> */}
				</div>
			</form>
		</div>
	);
};
