import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
	email: string;
	nickname: string;
	password: string;
	exp: number;
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
	nickname: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	exp: {
		type: Number,
		default: 0,
	},
	registeredAt: {
		type: Date,
		required: true,
	},
	avatar: String,
	achievements: Array,
});

export const User = model<IUser>('User', UserSchema);
