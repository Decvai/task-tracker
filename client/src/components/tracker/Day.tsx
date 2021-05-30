import { Link, useParams } from 'react-router-dom';
import { Status, Task } from './Status';
import GoBack from '../../assets/go-back.png';
import { useEffect, useState } from 'react';

interface ParamTypes {
	id: string;
}

const statusList = {
	working: {
		id: '01',
		color: 'rgb(233, 187, 62)',
		text: 'Working on it',
	},
	stuck: {
		id: '02',
		color: 'rgb(143, 52, 52)',
		text: 'Stuck',
	},
	done: {
		id: '03',
		color: 'rgb(62, 165, 93)',
		text: 'Done',
	},
};

const getTasks = (): Promise<Task[]> => {
	const tasks = [
		{
			id: '01',
			name: 'Important task',
			status: statusList.stuck,
			time: {
				from: '4:30 AM',
				to: '6:30 AM',
			},
			notes: '',
		},
		{
			id: '02',
			name: 'efwfewff task',
			status: statusList.working,
			time: {
				from: '4:30 AM',
				to: '6:30 PM',
			},
			notes: 'Some notes',
		},
		{
			id: '03',
			name: 'Yes',
			status: statusList.stuck,
			time: {
				from: '4:30 AM',
				to: '6:30 AM',
			},
			notes: '',
		},
	];

	return new Promise(r => {
		setTimeout(() => r(tasks), 1500);
	});
};

export const Day = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const columnsNumber = tasks.length ? Object.keys(tasks[0]).length + 1 : 6;
	let indexNumber = 0;

	const { id } = useParams<ParamTypes>();

	useEffect(() => {
		getTasks().then((tasks: Task[]) => {
			if (tasks.length) {
				setTasks(tasks);
			}
		});
	}, []);

	return (
		<div className='day'>
			<div className='day__header'>
				<div className='day__go-back'>
					<Link to='/calendar'>
						<img src={GoBack} alt='' />
						Back to calendar
					</Link>
				</div>

				<div className='day__selected-day'>{id}</div>
			</div>

			<div className='day__body'>
				{tasks.length ? (
					<table>
						<tbody>
							<tr>
								<th></th>
								<th>№</th>
								<th>Task name</th>
								<th>Status</th>
								<th>Expected time</th>
								<th>Notes</th>
							</tr>

							{tasks.map(task => (
								<tr key={task.id}>
									<td>X</td>
									<td>{++indexNumber}</td>
									<td>{task.name}</td>
									<Status
										task={task}
										statusList={statusList}
									/>
									<td>{`${task.time.from} - ${task.time.to}`}</td>
									<td>
										<textarea
											className='day__note'
											defaultValue={task.notes}
										></textarea>
									</td>
								</tr>
							))}

							<tr className='day__add-task'>
								{/* <td>X</td> */}
								<td colSpan={columnsNumber}>+ Add</td>
							</tr>
						</tbody>
					</table>
				) : (
					<div>Loading...</div>
				)}
			</div>
		</div>
	);
};
