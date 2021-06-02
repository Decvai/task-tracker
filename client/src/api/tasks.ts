interface IStatus {
	readonly id: string;
	color: string;
	text: string;
}

interface StatusList {
	[P: string]: IStatus;
}

export interface TimeInterval {
	from: string;
	to: string;
}

export interface Task {
	readonly id: string;
	name: string;
	status: IStatus;
	hours: TimeInterval;
	dateInterval: TimeInterval;
	notes: string;
}

export interface StatusProps {
	task: Task;
	statusList: StatusList;
}

export const statusList = {
	blank: {
		id: '00',
		color: 'rgb(196,196,196)',
		text: '\u00A0', // \u00A0 - non-breaking space
	},
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

const tasks: Task[] = [
	{
		id: '01',
		name: 'Important task',
		status: statusList.stuck,
		hours: {
			from: '',
			to: '',
		},
		dateInterval: {
			from: '31.05.2021',
			to: '03.06.2021',
		},
		notes: '',
	},
	{
		id: '02',
		name: 'efwfewff task',
		status: statusList.working,
		hours: {
			from: '4:30 AM',
			to: '6:30 PM',
		},
		dateInterval: {
			from: '31.05.2021',
			to: '03.06.2021',
		},
		notes: 'Some notes',
	},
	{
		id: '03',
		name: 'Yes',
		status: statusList.stuck,
		hours: {
			from: '4:30 AM',
			to: '6:30 AM',
		},
		dateInterval: {
			from: '31.05.2021',
			to: '03.06.2021',
		},
		notes: '',
	},
];

export const fakeFetch = (): Promise<Task[]> => {
	return new Promise(r => {
		setTimeout(() => r(tasks), 1500);
	});
};

export const fakePostFetch = (task: Task): Promise<Task> => {
	return new Promise(r => {
		setTimeout(() => {
			tasks.push(task);

			r(task);
		}, 1500);
	});
};
