import { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react';
import { fakePostFetch, statusList, Task, TimeInterval } from '../../api/tasks';

interface ValidatorStatus {
	code: string;
	error?: string;
}

interface NewTaskProps {
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>>;
}

export const NewTask: FC<NewTaskProps> = ({ active, setActive }) => {
	const today = new Date().toISOString().slice(0, 10);

	const [name, setName] = useState('');
	const [time, setTime] = useState({
		from: '',
		to: '',
	});
	const [timeline, setTimeline] = useState({
		from: today,
		to: today,
	});
	const [notes, setNotes] = useState('');
	const [error, setError] = useState('');

	const submitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const id = new Date().getTime().toLocaleString();
		const newTask: Task = {
			id,
			name,
			hours: time,
			dateInterval: timeline,
			notes,
			status: statusList.blank,
		};

		console.log(newTask);

		//TODO: validate new Task

		//TODO: send to server

		//TODO: create a submit button effect

		const { error: validatorError } = validate(newTask);

		if (validatorError) {
			setError(validatorError);
			return;
		}

		fakePostFetch(newTask);

		setActive(false);
	};

	const validate = (newTask: Task): ValidatorStatus => {
		const validators: Function[] = [checkDate];
		const validatorStatus: ValidatorStatus = {
			code: 'ok',
		};

		try {
			validators.forEach(val => {
				val(newTask);
			});
		} catch (err) {
			validatorStatus.error = err.message;
		}

		return validatorStatus;
	};

	const checkDate = (newTask: Task) => {
		if (newTask.hours.from > newTask.hours.to) {
			throw new Error(
				`Time expected: The date 'from' must be less than the date 'to'.`
			);
		}
	};

	return (
		<div
			className={active ? 'new-task active' : 'new-task'}
			onClick={() => setActive(false)}
		>
			<form
				className={
					active ? 'new-task__content active' : 'new-task__content'
				}
				onClick={e => e.stopPropagation()}
				onSubmit={submitHandler}
			>
				<div>
					<label htmlFor='name'>Name: </label>
					<input
						id='name'
						className='new-task__name'
						type='text'
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
				</div>

				<div>
					<label htmlFor='time-from'>Expected time: </label>
					<div>
						<input
							id='time-from'
							type='time'
							value={time.from}
							onChange={e =>
								setTime({ ...time, from: e.target.value })
							}
						/>
						<span className='new-task__separator'>—</span>
						<input
							id='time-to'
							type='time'
							value={time.to}
							onChange={e =>
								setTime({ ...time, to: e.target.value })
							}
						/>
					</div>
				</div>

				<div>
					<label htmlFor='timeline-from'>Date interval: </label>
					<div>
						<input
							id='timeline-from'
							type='date'
							value={timeline.from}
							onChange={e =>
								setTimeline({
									...timeline,
									from: e.target.value,
								})
							}
						/>
						<span className='new-task__separator'>—</span>
						<input
							id='timeline-to'
							type='date'
							value={timeline.to}
							onChange={e =>
								setTimeline({ ...timeline, to: e.target.value })
							}
						/>
					</div>
				</div>

				<div>
					<label htmlFor='notes'>Notes: </label>
					<textarea
						id='notes'
						className='new-task__notes'
						rows={10}
						cols={70}
						value={notes}
						onChange={e => setNotes(e.target.value)}
						maxLength={3000}
					></textarea>
				</div>

				<hr />

				<div className='new-task__confirm'>
					<input type='submit' value='Create' />
				</div>

				<div className='new-task__error'>{error}</div>
			</form>
		</div>
	);
};
