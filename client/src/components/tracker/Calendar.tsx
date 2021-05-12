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
				<div className='calendar__new-task'>
					<button>Create new task</button>
				</div>
			</div>
			<div className='calendar__body'>
				<div className='calendar__current-date'>
					<div className='calendar__time'>
						<Clock />
					</div>
				</div>

				<FullCalendar
					plugins={[dayGridPlugin, interactionPlugin]}
					initialView='dayGridMonth'
					dateClick={handleDateClick}
				/>
			</div>
		</div>
	);
};

export default Calendar;
