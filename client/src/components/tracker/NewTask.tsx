import {
	ErrorMessage,
	Field,
	Form,
	Formik,
	FormikHelpers,
	useFormik,
} from 'formik';
import { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react';
import { fakePostFetch, statusList, Task, TimeInterval } from '../../api/tasks';
import { newTaskValidate, ValidateValues } from '../../utils/validators';

interface NewTaskProps {
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>>;
}

export const NewTask: FC<NewTaskProps> = ({ active, setActive }) => {
	const today = new Date().toISOString().slice(0, 10);

	const initialValues: ValidateValues = {
		name: '',
		hoursFrom: '',
		hoursTo: '',
		dateIntervalFrom: today,
		dateIntervalTo: today,
		notes: '',
	};

	const onSubmit = async (
		{
			name,
			hoursFrom,
			hoursTo,
			dateIntervalFrom,
			dateIntervalTo,
			notes,
		}: ValidateValues,
		{ resetForm }: FormikHelpers<ValidateValues>
	) => {
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

		//TODO send to server

		const response: Task = await fakePostFetch(newTask);
		if (!response) {
			alert('Response is not ok'); //TODO create a submit button effect
			return;
		}

		resetForm();
		setActive(false);
	};

	return (
		<div
			className={active ? 'new-task active' : 'new-task'}
			onClick={() => setActive(false)}
		>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validate={newTaskValidate}
			>
				{({ isSubmitting, values, errors, touched }) => (
					<Form
						className={
							active
								? 'new-task__content active'
								: 'new-task__content'
						}
						onClick={e => e.stopPropagation()}
					>
						<div className='new-task__input-wrapper'>
							<label htmlFor='name'>Name: </label>
							<Field
								id='name'
								className={
									errors.name && touched.name
										? 'new-task__name error'
										: 'new-task__name'
								}
								name='name'
								type='text'
							/>
							<ErrorMessage
								className='new-task__error'
								component='div'
								name='name'
							/>
						</div>

						<div className='new-task__input-wrapper'>
							<label
								htmlFor={
									values.hoursFrom ? 'hoursTo' : 'hoursFrom'
								}
							>
								Expected time:{' '}
							</label>
							<div>
								<Field
									id='hoursFrom'
									className={
										errors.hoursFrom &&
										(touched.hoursFrom || touched.hoursTo)
											? 'new-task__time error'
											: 'new-task__time'
									}
									name='hoursFrom'
									type='time'
								/>
								<span className='new-task__separator'>—</span>
								<Field
									id='hoursTo'
									className={
										errors.hoursTo &&
										(touched.hoursFrom || touched.hoursTo)
											? 'new-task__time error'
											: 'new-task__time'
									}
									name='hoursTo'
									type='time'
								/>
								<ErrorMessage
									className='new-task__error'
									component='div'
									name='hoursFrom'
								/>
								{!errors.hoursFrom && (
									<ErrorMessage
										className='new-task__error'
										component='div'
										name='hoursTo'
									/>
								)}
							</div>
						</div>

						<div className='new-task__input-wrapper'>
							<label
								htmlFor={
									values.hoursFrom
										? 'dateIntervalTo'
										: 'dateIntervalFrom'
								}
							>
								Date interval:{' '}
							</label>
							<div>
								<Field
									id='dateIntervalFrom'
									className={
										errors.dateIntervalFrom &&
										touched.dateIntervalFrom
											? 'new-task__time error'
											: 'new-task__time'
									}
									name='dateIntervalFrom'
									type='date'
									min={today}
								/>
								<span className='new-task__separator'>—</span>
								<Field
									id='dateIntervalTo'
									className={
										errors.dateIntervalTo &&
										touched.dateIntervalTo
											? 'new-task__time error'
											: 'new-task__time'
									}
									name='dateIntervalTo'
									type='date'
									min={today}
								/>
								<ErrorMessage
									className='new-task__error'
									component='div'
									name={
										errors.dateIntervalTo
											? 'dateIntervalTo'
											: 'dateIntervalFrom'
									}
								/>
							</div>
						</div>

						<div className='new-task__input-wrapper'>
							<label htmlFor='notes'>Notes:</label>
							<Field
								id='notes'
								className='new-task__notes'
								name='notes'
								as='textarea'
								rows={10}
								cols={70}
								maxLength={3000}
							></Field>
						</div>

						<div className='new-task__confirm'>
							<input
								className={
									isSubmitting ? 'submit loading' : 'submit'
								}
								type='submit'
								value='Submit'
								disabled={isSubmitting}
							/>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
