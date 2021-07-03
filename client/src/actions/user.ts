import { Dispatch } from 'react';
import { API_URL } from '../config';
import { setUser } from '../reducers/user.reducer';
import { User } from '../types/user';

interface DispatchData {
	type: string;
	payload: unknown;
}

export const login = (email: string, password: string) => {
	return async (dispatch: Dispatch<DispatchData>) => {
		try {
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

			const data: {
				token: string;
				user: User;
			} = await response.json();

			alert(JSON.stringify(data, null, 4));

			localStorage.setItem('token', data.token);
			dispatch(setUser(data.user));
		} catch (err) {
			alert(err.response?.data.message || err);
		}
	};
};

export const auth = () => {
	return async (dispatch: Dispatch<DispatchData>) => {
		try {
			const response = await fetch(`${API_URL}/api/auth/authorization`, {
				headers: {
					Authorization: `Bearer: ${localStorage.getItem('token')}`,
				},
			});

			const data: {
				token: string;
				user: User;
			} = await response.json();

			// alert(JSON.stringify(data, null, 4));

			localStorage.setItem('token', data.token);
			dispatch(setUser(data.user));
		} catch (err) {
			alert(err.response?.data.message || err);
			localStorage.removeItem('token');
		}
	};
};
