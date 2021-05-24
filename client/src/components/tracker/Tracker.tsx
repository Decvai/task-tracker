import Sidebar from './Sidebar';
import Calendar from './Calendar';
import { Route, Switch } from 'react-router';
import Day from './Day';

const Tracker = () => {
	return (
		<div className='tracker'>
			<Sidebar />

			<Switch>
				<Route exact path='/calendar' component={Calendar} />
				<Route path='/calendar/days/:id' component={Day} />
			</Switch>
		</div>
	);
};

export default Tracker;
