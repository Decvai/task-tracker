import { Link, useParams } from 'react-router-dom';
import { Status } from './Status';
import GoBack from '../../assets/go-back.png';
import { ChangeEvent, useEffect, useState } from 'react';
import { Loader } from '../../utils/Loader/Loader';
import { fakeFetch, fakePostFetch, TimeInterval } from '../../api/tasks';
import { Task, statusList } from '../../api/tasks';
import { getCurrentHours, getToday } from '../../utils/helpers';
import ErrorIcon from '../../assets/error.png';

interface ParamTypes {
	readonly id: string;
}

export const Day = () => {
	const [isAdding, setIsAdding] = useState<boolean>(false);
	const [taskName, setTaskName] = useState<string>('');
	const [hours, setHours] = useState<TimeInterval>({
		from: '',
		to: '',
	});
	const [hoursError, setHoursError] = useState<string>('');
	const [tasks, setTasks] = useState<Task[]>([]);
	const columnsNumber = tasks.length ? Object.keys(tasks[0]).length : 6;
	let indexNumber = 0;

	const { id } = useParams<ParamTypes>();

	useEffect(() => {
		let isMounted = true;

		const getTasks = async () => {
			try {
				const tasksFromServer = await fetchTasks();

				if (isMounted) {
					setTasks([...tasksFromServer]);
				}
			} catch (err) {
				alert(JSON.stringify(err));
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

		// Todo check response code

		//if okay, then -

		setTasks(tasks.filter(task => task.id !== id));
	};

	const changeNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const name = event.target.value;

		setTaskName(name);

		if (name) {
			setIsAdding(true);
			return;
		}

		setIsAdding(false);
	};

	const addNewTask = async () => {
		// Todo send fetch to the server..
		if (hours.from > hours.to || hours.from < getCurrentHours()) {
			setHoursError('Hours is not correct');
			return;
		}

		const id = new Date().getTime().toLocaleString();
		const today = getToday();

		const newTask: Task = {
			id,
			name: taskName,
			status: statusList.blank,
			hours: {
				from: hours.from,
				to: hours.to,
			},
			dateInterval: {
				from: today,
				to: today,
			},
			notes: '',
		};
		setTasks([...tasks, newTask]);
		setTaskName('');
		setIsAdding(false);

		try {
			await fakePostFetch(newTask);
		} catch (err) {
			alert(JSON.stringify(err));
			deleteTask(id);
		}
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
											value={taskName}
											type='text'
											placeholder='+ Add'
											onChange={changeNameHandler}
										/>
										<div className='day__add-task-hours'>
											<input
												className={
													isAdding
														? 'day__add-task-hours-from show'
														: 'day__add-task-hours-from'
												}
												onChange={e => {
													const hoursFrom =
														e.target.value;
													setHours({
														...hours,
														from: hoursFrom,
													});
												}}
												disabled={!isAdding}
												type='time'
											/>
											<span
												className={
													isAdding
														? 'day__add-task-separator show'
														: 'day__add-task-separator'
												}
											>
												—
											</span>
											<input
												className={
													isAdding
														? 'day__add-task-hours-to show'
														: 'day__add-task-hours-to'
												}
												onChange={e => {
													const hoursTo =
														e.target.value;
													setHours({
														...hours,
														to: hoursTo,
													});
												}}
												disabled={!isAdding}
												type='time'
											/>
											{isAdding && hoursError && (
												<div className='day__add-task-error'>
													<img
														src={ErrorIcon}
														alt='ErrorIcon'
													/>
													<span>
														{/* Lorem ipsum dolor sit
														amet consectetur
														adipisicing elit. Soluta
														provident aspernatur,
														sunt cupiditate,
														aliquam, reiciendis
														natus sed voluptate
														totam laboriosam quidem
														accusamus animi debitis
														asperiores laborum
														mollitia modi id
														corporis ipsa odit ullam
														quae. Et omnis iusto
														incidunt architecto quia
														odit ullam harum
														distinctio nam, id
														explicabo dolor ad
														asperiores! */}
														{hoursError}
													</span>
												</div>
											)}
										</div>
										<input
											className={
												isAdding
													? 'day__add-task-confirm show'
													: 'day__add-task-confirm'
											}
											type='button'
											value='Add'
											onClick={addNewTask}
											disabled={!isAdding}
										/>
									</form>
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
