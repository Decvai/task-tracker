import { MouseEvent } from 'react';
import { Tracker } from './tracker/Tracker';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { Registration } from './authorization/Registration';
import { Login } from './authorization/Login';

export const App = () => {
	const isAuth = true;

	const clickHandler = (event: MouseEvent<HTMLInputElement>) => {
		console.log(event.target);
	};

	return (
		<Router>
			<div className='app' onClick={clickHandler}>
				<div className='wrap'>
					{isAuth ? (
						<Switch>
							<Route path='/' component={Tracker} />
						</Switch>
					) : (
						<Switch>
							<Route
								path='/registration'
								component={Registration}
							/>
							<Route path='/login' component={Login} />
							<Redirect to='/login' />
						</Switch>
					)}
				</div>
			</div>
		</Router>
	);
};
