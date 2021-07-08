export interface User {
	email: string;
	nickname: string;
	registeredAt: Date;
	avatar: string;
	achievements: string[]; // Array of achievement IDs
}

// export type UserCredentials = Pick<User, 'email' | 'password'>;
