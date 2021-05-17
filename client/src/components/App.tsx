import { MouseEvent } from 'react';
import Tracker from './tracker/Tracker';

function App() {
	function clickHandler(event: MouseEvent<HTMLInputElement>) {
		console.log(event.target);
	}

	return (
		<div className='app' onClick={clickHandler}>
			<Tracker />
		</div>
	);
}

export default App;
