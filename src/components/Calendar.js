import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function TrainingCalendar() {
	const localizer = momentLocalizer(moment);
	
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
	  getTrainings()
    });

    const getTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
	}

	const events = trainings.map((training) => 
		training =
		{
		  allDay: 'false',
		  title: training.activity,
		  start: training.date,
		  end: training.date + moment().add(training.duration, 'minutes'),
		  resource: training.customer.firstname
		}
	);
	console.log('events:', events);

    return (
        <Calendar 
        localizer={localizer}
		events={events}
		allDayAccessor="allDay"
		titleAccessor='title'
		resourceAccessor='resource'
        startAccessor='start'
        endAccessor='end'
        views={['month', 'week', 'day']}
        style={{height: 450}}
		/>
	)
}