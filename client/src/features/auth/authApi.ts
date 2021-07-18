import { API_URL } from '../../config';
import { User } from '../../shared/userType';
import { RegistrationData } from './authSlice';

export interface AuthFetchResponse {
	token: string;
	user: User;
}

export const fetchLogin = async (
	email: string,
	password: string
): Promise<AuthFetchResponse> => {
	const response = await fetch(`${API_URL}/api/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: AuthFetchResponse = await response.json();

	return data;
};

export const fetchAuth = async (): Promise<AuthFetchResponse> => {
	const response = await fetch(`${API_URL}/api/auth/authorization`, {
		headers: {
			Authorization: `Bearer: ${localStorage.getItem('token')}`,
		},
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: AuthFetchResponse = await response.json();

	return data;
};

export const fetchRegistration = async (
	userInfo: RegistrationData
): Promise<boolean> => {
	const response = await fetch(`${API_URL}/api/auth/registration`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userInfo),
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return true;
};
