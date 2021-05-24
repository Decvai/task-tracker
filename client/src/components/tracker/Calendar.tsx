import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import Clock from '../../utils/Clock';
import { useHistory } from 'react-router-dom';
import { MouseEvent, useRef } from 'react';

const Calendar = () => {
	const history = useHistory();

	const calendarWrapperRef = useRef<HTMLDivElement>(null);
	const shadowRef = useRef<HTMLDivElement>(null);

	const dateClickHandler = ({ dateStr }: DateClickArg) => {
		history.push(`/calendar/days/${dateStr}`);
	};

	const mouseMoveHandler = (e: MouseEvent) => {
		const calendarWrapper = e.currentTarget;

		const rect = calendarWrapper.getBoundingClientRect();

		window.requestAnimationFrame(() => {
			const shadow = shadowRef.current;

			if (!shadow) throw new Error('Shadow element is missing');

			shadow.style.left = `${e.clientX - rect.left}px`;
			shadow.style.top = `${e.clientY - rect.top}px`;
		});
	};

	return (
		<div className='calendar'>
			<div className='calendar__header'>
				<div className='calendar__time'>
					<Clock />
				</div>
				<div className='calendar__new-task'>
					<button>
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
		</div>
	);
};

export default Calendar;
