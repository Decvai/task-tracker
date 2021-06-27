import { Document, model, Schema } from 'mongoose';
import { IStatus, ITimeInterval } from '../shared/interfaces';
import { IUser } from './user.model';

export interface ITask extends Document {
	name: string;
	status: IStatus;
	hours: ITimeInterval;
	dateInterval: ITimeInterval;
	notes: string;

	day: string;
	owner: IUser['_id'];
}

const StatusSchema: Schema = new Schema({
	id: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
});

const TaskSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	status: {
		type: StatusSchema,
		required: true,
	},
	hours: Object,
	dateInterval: Object,
	notes: String,
	day: {
		type: String,
		required: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

export const Task = model<ITask>('Task', TaskSchema);
