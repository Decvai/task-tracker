import { MouseEvent } from 'react';
import { Tracker } from './tracker/Tracker';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { Registration } from './authorization/Registration';

export const App = () => {
	const clickHandler = (event: MouseEvent<HTMLInputElement>) => {
		console.log(event.target);
	};

	return (
		<Router>
			<div className='app' onClick={clickHandler}>
				<Switch>
					<Route path='/calendar' component={Tracker} />
					<Route path='/registration' component={Registration} />

					<Redirect from='/' to='/registration' />
				</Switch>
			</div>
		</Router>
	);
};
