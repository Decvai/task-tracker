import { Sidebar } from './Sidebar';
import { Calendar } from './Calendar';
import { Route, Switch } from 'react-router';
import { Day } from './Day';
import { Redirect } from 'react-router-dom';

export const Tracker = () => {
	return (
		<div className='tracker'>
			<Sidebar />

			<Switch>
				<Route exact path='/' component={Calendar} />
				<Route path='/days/:id' component={Day} />

				<Redirect to='/' />
			</Switch>
		</div>
	);
};
