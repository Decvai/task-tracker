import { Document, model, Schema } from 'mongoose';
import { ITask } from './taskModel';

interface IUser extends Document {
	login: string;
	registeredAt: Date;
	avaUrl: String;
	tasks: ITask['_id'][];
}

const UserSchema: Schema = new Schema({
	login: {
		type: String,
		required: true,
		unique: true,
	},
	registeredAt: {
		type: Date,
		required: true,
	},
	avaUrl: String,
	tasks: {
		type: [Schema.Types.ObjectId],
		required: true,
	},
});

export const userModel = model<IUser>('User', UserSchema);
