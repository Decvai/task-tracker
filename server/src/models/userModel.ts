import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
	email: string;
	password: string;
	registeredAt: Date;
	avatar: String;
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
});

export const User = model<IUser>('User', UserSchema);
