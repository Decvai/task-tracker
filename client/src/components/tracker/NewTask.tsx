import { Dispatch, FC, SetStateAction, useState } from 'react';

interface NewTaskProps {
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>>;
}

export const NewTask: FC<NewTaskProps> = ({ active, setActive }) => {
	const [name, setName] = useState('');
	const [time, setTime] = useState({
		from: Date.now(),
		to: Date.now(),
	});
	const [date, setDate] = useState({
		from: Date.now(),
		to: Date.now(), //TODO: change Date.now on smh else
	});
	const [notes, setNotes] = useState('');

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
			>
				<div>
					<label htmlFor='new-task__name'>Name: </label>
					<input id='new-task__name' type='text' />
				</div>

				<div>
					<label htmlFor='new-task__time-from'>Expected time: </label>
					<div>
						<input id='new-task__time-from' type='time' />
						<input id='new-task__time-to' type='time' />
					</div>
				</div>

				<div>
					<label htmlFor='new-task__timeline-from'>Timeline: </label>
					<div>
						<input id='new-task__timeline-from' type='date' />
						<input id='new-task__timeline-to' type='date' />
					</div>
				</div>

				<div>
					<label htmlFor='new-task__notes'>Notes: </label>
					<input id='new-task__notes' type='text' />
				</div>

				<div className='new-task__confirm'>
					<button>Create</button>
				</div>
			</form>
		</div>
	);
};
