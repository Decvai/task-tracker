import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
	login: string;
	registeredAt: Date;
	avaUrl: String;
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
});

export const User = model<IUser>('User', UserSchema);
