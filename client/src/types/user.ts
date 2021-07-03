export interface User {
	email: string;
	nickname: string;
	password: string;
	registeredAt: Date;
	avatar: string;
	achievements: string[]; // Array of achievement IDs
}

export type UserLogin = Pick<User, 'email' | 'password'>;
