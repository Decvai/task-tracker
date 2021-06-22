import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
	email: string;
	password: string;
	registeredAt: Date;
	avatar: string;
	achievements: string[]; // Array of achievement IDs
}

const UserSchema: Schema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	registeredAt: {
		type: Date,
		required: true,
	},
	avatar: String,
	achievements: Array,
});

export const User = model<IUser>('User', UserSchema);
