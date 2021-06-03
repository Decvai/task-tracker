import { Link, useParams } from 'react-router-dom';
import { Status } from './Status';
import GoBack from '../../assets/go-back.png';
import { useEffect, useState } from 'react';
import { Loader } from '../../utils/Loader/Loader';
import { fakeFetch } from '../../api/tasks';
import { Task, statusList } from '../../api/tasks';

interface ParamTypes {
	readonly id: string;
}

export const Day = () => {
	const [isAdding, setIsAdding] = useState<boolean>(false);
	const [tasks, setTasks] = useState<Task[]>([]);
	const columnsNumber = tasks.length ? Object.keys(tasks[0]).length : 6;
	let indexNumber = 0;

	const { id } = useParams<ParamTypes>();

	useEffect(() => {
		let isMounted = true;

		const getTasks: any = async () => {
			const tasksFromServer = await fetchTasks();

			if (isMounted) {
				setTasks(tasksFromServer);
			}
		};
		getTasks();

		return () => {
			isMounted = false;
		};
	}, []);

	const fetchTasks = async () => {
		const res = await fakeFetch();

		// const tasksFromServer = await res.json();
		//return tasksFromServer;

		return res;
	};

	const deleteTask = async (id: string) => {
		// await fetch(url/${id}, {method: 'DELETE'})

		//check response code

		//if okay, then -

		setTasks(tasks.filter(task => task.id !== id));
	};

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
								<th>№</th>
								<th>Task name</th>
								<th>Status</th>
								<th>Expected time</th>
								<th>Notes</th>
							</tr>

							{tasks.map(task => (
								<tr key={task.id}>
									<td className='day__index-column'>
										<div
											className='day__remove-task'
											onClick={() => deleteTask(task.id)}
										>
											<span>X</span>
										</div>
										<div className='day__index'>
											{++indexNumber}
										</div>
									</td>
									<td>{task.name}</td>
									<Status
										task={task}
										statusList={statusList}
									/>
									<td>{`${task.hours.from} - ${task.hours.to}`}</td>
									<td>
										<textarea
											className='day__note'
											defaultValue={task.notes}
										></textarea>
									</td>
								</tr>
							))}

							<tr>
								<td
									className='day__add-task'
									colSpan={columnsNumber}
								>
									<div className='day__remove-task fake'></div>
									<form>
										<input
											className='day__add-task-name'
											type='text'
											placeholder='+ Add'
										/>
										<input
											className='day__add-task-hours'
											type='time'
										/>
									</form>
									{/* {isAdding ? (
										<form>
											<input
												type='text'
												placeholder='+ Add'
											/>
											<input type='time' />
										</form>
									) : (
										<div
											onClick={() =>
												setIsAdding(!isAdding)
											}
										>
											+ Add
										</div>
									)} */}
								</td>
							</tr>
						</tbody>
					</table>
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};
