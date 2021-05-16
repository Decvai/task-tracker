import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/index.scss';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

const grid: HTMLElement = document.querySelector('.calendar__wrapper')!;

const shadow: HTMLElement = grid.querySelector('.shadow')!;

document.addEventListener('mousemove', e => {
	const rect = grid.getBoundingClientRect();

	window.requestAnimationFrame(() => {
		shadow.style.left = `${e.clientX - rect.left}px`;
		shadow.style.top = `${e.clientY - rect.top}px`;
	});
});
