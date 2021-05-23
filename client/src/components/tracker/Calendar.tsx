import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import Clock from '../../utils/Clock';
import { useHistory } from 'react-router-dom';

const Calendar = () => {
	const history = useHistory();

	const dateClickHandler = ({ dateStr }: DateClickArg) => {
		history.push(`/day/${dateStr}`);
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
				<div className='calendar__wrapper'>
					<FullCalendar
						plugins={[dayGridPlugin, interactionPlugin]}
						initialView='dayGridMonth'
						dateClick={dateClickHandler}
					/>
					<div className='shadow'></div>
				</div>
			</div>
		</div>
	);
};

export default Calendar;
