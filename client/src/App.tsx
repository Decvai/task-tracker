import { useEffect } from 'react';
import { Tracker } from './features/tracker/Tracker';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { Registration } from './features/auth/Registration';
import { Login } from './features/auth/Login';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { authAsync, authSelector } from './features/auth/auth.slice';

export const App = () => {
	const isAuth = useAppSelector(authSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(authAsync());
	}, []);

	return (
		<Router>
			<div className='app'>
				{isAuth ? (
					<Switch>
						<Route path='/' component={Tracker} />
					</Switch>
				) : (
					<Switch>
						<Route path='/registration' component={Registration} />
						<Route path='/login' component={Login} />
						<Redirect to='/login' />
					</Switch>
				)}
			</div>
		</Router>
	);
};
