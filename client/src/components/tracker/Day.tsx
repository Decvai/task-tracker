import { Link, useParams } from 'react-router-dom';
import { Status } from './Status';

interface ParamTypes {
	id: string;
}

const statusList = {
	working: {
		id: '01',
		color: 'orange',
		text: 'Working on it',
	},
	stuck: {
		id: '02',
		color: 'red',
		text: 'Stuck',
	},
	done: {
		id: '03',
		color: 'green',
		text: 'Done',
	},
};

export const Day = () => {
	const { id } = useParams<ParamTypes>();

	const tasks = [
		{
			id: '01',
			status: statusList.stuck,
			timePeriod: {
				from: 'Jan 3',
				to: 'Jan 6',
			},
			expectedHours: 4,
			actualHours: 5,
			comment: 'Lorem ipsum dolor sit amet.',
		},
		{
			id: '02',
			status: statusList.working,
			timePeriod: {
				from: 'Feb 4',
				to: 'Jan 6',
			},
			expectedHours: 3,
			actualHours: 51,
			comment: 'Lorem sit amet.',
		},
		{
			id: '03',
			status: statusList.done,
			timePeriod: {
				from: 'Apr 3',
				to: 'Jan 10',
			},
			expectedHours: 2,
			actualHours: 5,
			comment: 'Lorem ipsum.',
		},
	];

	return (
		<div className='day'>
			<div className='day__header'>
				<div className='day__go-back'>
					<Link to='/calendar'>Back to calendar </Link>
				</div>

				<div className='selected-day'>{id}</div>
			</div>
			<div className='day__body'>
				<table>
					<tbody>
						<tr>
							<th>Status</th>
							<th>How long will this take</th>
							<th>Total Hours (Expected)</th>
							<th>Total Hours (Actual)</th>
							<th>Comment</th>
						</tr>

						{tasks.map(task => (
							<tr key={task.id}>
								<Status task={task} statusList={statusList} />
								<td>{`From ${task.timePeriod.from} to ${task.timePeriod.to}`}</td>
								<td>{task.expectedHours}</td>
								<td>{task.actualHours}</td>
								<td>
									<textarea
										cols={20}
										rows={10}
										defaultValue={task.comment}
									></textarea>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
