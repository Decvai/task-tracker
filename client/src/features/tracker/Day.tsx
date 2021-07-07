import { Link, useParams } from 'react-router-dom';
import { Status } from './Status';
import GoBack from '../../assets/go-back.png';
import { useEffect, useState } from 'react';
import { Loader } from '../../utils/Loader/Loader';
import { fakeFetch, fakePostFetch } from '../../api/tasks';
import { Task, statusList } from '../../api/tasks';
import { getToday } from '../../utils/helpers';
import ErrorIcon from '../../assets/error.png';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import {
	newTaskValidate,
	NewTaskValidateValues,
} from '../../utils/validators/new-task.validator';

interface ParamTypes {
	readonly id: string;
}

export const Day = () => {
	const { id } = useParams<ParamTypes>();

	const [tasks, setTasks] = useState<Task[]>([]);
	const columnsNumber = tasks.length ? Object.keys(tasks[0]).length : 6;
	let indexNumber = 0;

	const today = getToday();
	const initialValues: NewTaskValidateValues = {
		name: '',
		hoursFrom: '',
		hoursTo: '',
		dateIntervalFrom: today,
		dateIntervalTo: today,
		notes: '',
	};

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

	const addNewTask = async (
		{
			name,
			hoursFrom,
			hoursTo,
			dateIntervalFrom,
			dateIntervalTo,
			notes,
		}: NewTaskValidateValues,
		{ resetForm }: FormikHelpers<NewTaskValidateValues>
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
		setTasks([...tasks, newTask]);
		resetForm();

		// Todo send fetch to the server..
		try {
			await fakePostFetch(newTask);
		} catch (err) {
			alert(JSON.stringify(err));
			setTasks(tasks.filter(task => task.id !== id));
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
									<Formik
										initialValues={initialValues}
										onSubmit={addNewTask}
										validate={newTaskValidate}
									>
										{({
											values: { name },
											errors,
											isValid,
										}) => (
											<Form>
												<Field
													className='day__add-task-name'
													name='name'
													type='text'
													placeholder='+ Add'
												/>
												{name && errors.name && (
													<div className='day__add-task-error'>
														<img
															src={ErrorIcon}
															alt='ErrorIcon'
														/>
														<span>
															{errors.name}
														</span>
													</div>
												)}
												<div className='day__add-task-hours'>
													<Field
														className={
															name
																? 'day__add-task-hours-from show'
																: 'day__add-task-hours-from'
														}
														name='hoursFrom'
														type='time'
														disabled={!name}
													/>
													<span
														className={
															name
																? 'day__add-task-separator show'
																: 'day__add-task-separator'
														}
													>
														—
													</span>
													<Field
														className={
															name
																? 'day__add-task-hours-to show'
																: 'day__add-task-hours-to'
														}
														name='hoursTo'
														type='time'
														disabled={!name}
													/>
													{name && (
														<ErrorMessage name='hoursFrom'>
															{msg => (
																<div className='day__add-task-error'>
																	<img
																		src={
																			ErrorIcon
																		}
																		alt='ErrorIcon'
																	/>
																	{msg}
																</div>
															)}
														</ErrorMessage>
													)}
												</div>

												<input
													className={
														name
															? 'day__add-task-confirm show'
															: 'day__add-task-confirm'
													}
													type='submit'
													value='Add'
													disabled={!isValid}
												/>
											</Form>
										)}
									</Formik>
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
