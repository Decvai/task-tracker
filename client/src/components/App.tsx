import { MouseEvent } from 'react';
import Tracker from './tracker/Tracker';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect,
} from 'react-router-dom';
import Day from './tracker/Day';
import Registration from './authorization/Registration';

function App() {
	function clickHandler(event: MouseEvent<HTMLInputElement>) {
		console.log(event.target);
	}

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
}

export default App;
