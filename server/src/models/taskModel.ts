import { Document, model, Schema } from 'mongoose';

interface IStatus {
	readonly id: string;
	color: string;
	text: string;
}

interface ITimeInterval {
	from: string;
	to: string;
}

export interface ITask extends Document {
	name: string;
	status: IStatus;
	hours: ITimeInterval;
	dateInterval: ITimeInterval;
	notes: string;
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
});

export const taskModel = model<ITask>('Task', TaskSchema);
