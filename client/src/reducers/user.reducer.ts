import { User, UserLogin } from '../types/user';

const SET_USER = 'SET_USER';
const RESET_USER = 'RESET_USER';

interface AuthState {
	currentUser: User | {};
	isAuth: boolean;
}

interface AuthAction {
	type: string;
	payload: unknown;
}

const defaultState: AuthState = {
	currentUser: {},
	isAuth: false,
};

export const userReducer = (state = defaultState, action: AuthAction) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				currentUser: action.payload,
				isAuth: true,
			};
		case RESET_USER:
			localStorage.removeItem('token');
			return {
				...state,
				...defaultState,
			};
		default:
			return state;
	}
};

export const setUser = (user: UserLogin) => ({ type: SET_USER, payload: user });
export const resetUser = () => ({ type: RESET_USER });
