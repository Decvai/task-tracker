import { MouseEvent } from 'react';
import Tracker from './tracker/Tracker';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
	function clickHandler(event: MouseEvent<HTMLInputElement>) {
		console.log(event.target);
	}

	return (
		<Router>
			<div className='app' onClick={clickHandler}>
				<Tracker />
			</div>
		</Router>
	);
}

export default App;
