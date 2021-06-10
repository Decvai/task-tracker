import { Document, model, Schema } from 'mongoose';
import { IUser } from './userModel';

interface IStatus {
	readonly id: string;
	color: string;
	text: string;
}

interface ITimeInterval {
	from: string;
	to: string;
}

// db.tasks.insert({
// 	name: 'new name',
// 	status: {
// 		id: '01',
// 		color: 'green',
// 		text: 'some text'
// 	},
// 	hours: {
// 		from: '19:55',
// 		to: '23:22'
// 	},
// 	dateInterval: {
// 		from: '06/10/2021',
// 		to: '06/15/2021'
// 	},
// 	notes: 'Nothing...'
// })

export interface ITask extends Document {
	name: string;
	status: IStatus;
	hours: ITimeInterval;
	dateInterval: ITimeInterval;
	notes: string;

	day: string;
	owner: IUser['_id'];
}

const TaskSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	status: {
		type: {
			id: {
				type: String,
				required: true,
				unique: true,
			},
			color: {
				type: String,
				required: true,
				unique: true,
			},
			text: {
				type: String,
				required: true,
			},
		},
	},
	hours: {
		from: String,
		to: String,
	},
	dateInterval: {
		from: String,
		to: String,
	},
	notes: String,
	day: {
		type: String,
		required: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		required: true,
	},
});

export const Task = model<ITask>('Task', TaskSchema);
