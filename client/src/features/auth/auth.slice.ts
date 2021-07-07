import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from '../../shared/user.type';
import {
	fetchLogin,
	AuthFetchResponse,
	fetchAuth,
	fetchRegistration,
} from './auth.api';

export interface AuthState {
	currentUser: User | {};
	isAuth: boolean;
}

const initialState: AuthState = {
	currentUser: {},
	isAuth: false,
};

export interface AuthCredentials {
	email: string;
	password: string;
}

export const loginAsync = createAsyncThunk<AuthFetchResponse, AuthCredentials>(
	'auth/login',
	async ({ email, password }) => {
		const response: AuthFetchResponse = await fetchLogin(email, password);
		return response;
	}
);

export const authAsync = createAsyncThunk<AuthFetchResponse>(
	'auth/authorization',
	async () => {
		const response: AuthFetchResponse = await fetchAuth();
		return response;
	}
);

export type RegistrationData = AuthCredentials & { nickname: string };

export const registrationAsync = createAsyncThunk<boolean, RegistrationData>(
	'auth/registration',
	async (user, { rejectWithValue }) => {
		const isAdded: boolean = await fetchRegistration(user);

		return isAdded;
	}
);

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			state.currentUser = initialState.currentUser;
			state.isAuth = initialState.isAuth;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(loginAsync.fulfilled, (state, action) => {
				const { user, token } = action.payload;

				state.currentUser = user;
				state.isAuth = true;
				localStorage.setItem('token', token);
			})
			.addCase(authAsync.fulfilled, (state, action) => {
				const { user, token } = action.payload;

				state.currentUser = user;
				state.isAuth = true;
				localStorage.setItem('token', token);
			})
			.addCase(authAsync.rejected, () => {
				localStorage.removeItem('token');
			})
			.addCase(registrationAsync.fulfilled, (_, action) => {
				const isAdded: boolean = action.payload;

				if (isAdded) {
					console.log('added');
				}
			});
	},
});

export const { logout } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth.isAuth;

export const authReducer = authSlice.reducer;
