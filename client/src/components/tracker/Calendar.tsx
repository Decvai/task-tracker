import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Clock } from '../../utils/Clock';
import { useHistory } from 'react-router-dom';
import { MouseEvent, useRef, useState } from 'react';
import { NewTask } from './NewTask';

export const Calendar = () => {
	const history = useHistory();
	const [newTaskActive, setNewTaskActive] = useState(false);

	const calendarWrapperRef = useRef<HTMLDivElement>(null);
	const shadowRef = useRef<HTMLDivElement>(null);

	const dateClickHandler = ({ dateStr }: DateClickArg) => {
		history.push(`/days/${dateStr}`);
	};

	const mouseMoveHandler = (event: MouseEvent) => {
		const calendarWrapper = event.currentTarget;

		const rect = calendarWrapper.getBoundingClientRect();

		// window.requestAnimationFrame(() => {
		const shadow = shadowRef.current;

		if (!shadow) throw new Error('Shadow element is missing');

		shadow.style.left = `${event.clientX - rect.left}px`;
		shadow.style.top = `${event.clientY - rect.top}px`;
		// });
	};

	return (
		<div className='calendar'>
			<div className='calendar__header'>
				<div className='calendar__time'>
					<Clock />
				</div>
				<div className='calendar__new-task'>
					<button onClick={() => setNewTaskActive(true)}>
						<img
							src='https://static.thenounproject.com/png/525766-200.png'
							alt=''
						/>
					</button>
				</div>
			</div>
			<div className='calendar__body'>
				<div
					className='calendar__wrapper'
					ref={calendarWrapperRef}
					onMouseMove={mouseMoveHandler}
				>
					<FullCalendar
						plugins={[dayGridPlugin, interactionPlugin]}
						initialView='dayGridMonth'
						dateClick={dateClickHandler}
					/>
					<div className='shadow' ref={shadowRef}></div>
				</div>
			</div>

			<NewTask active={newTaskActive} setActive={setNewTaskActive} />
		</div>
	);
};
