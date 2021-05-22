import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import Clock from '../../utils/Clock';

const Calendar = () => {
	function handleDateClick(arg: DateClickArg) {
		alert(arg.dateStr);
	}

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
						dateClick={handleDateClick}
					/>
					<div className='shadow'></div>
				</div>
			</div>
		</div>
	);
};

export default Calendar;
