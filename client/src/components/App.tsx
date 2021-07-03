import { MouseEvent, useEffect } from 'react';
import { Tracker } from './tracker/Tracker';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { Registration } from './authorization/Registration';
import { Login } from './authorization/Login';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../actions/user';

export const authSelector = (state: any) => state.user.isAuth; // Todo: change any type

export const App = () => {
	const isAuth = useSelector(authSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(auth());
	}, []);

	const clickHandler = (event: MouseEvent<HTMLInputElement>) => {
		console.log(event.target);
	};

	return (
		<Router>
			<div className='app' onClick={clickHandler}>
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
