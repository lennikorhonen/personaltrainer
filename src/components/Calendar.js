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
        .then(data => setTrainings(data.map((training) =>(
			{
			  title: training.activity,
			  start: moment.utc(training.date)._d,
			  end: moment.utc(training.date).add(trainings.duration, 'minutes')._d,
			  resource: training.customer.firstname
			})
		  )))
        .catch(err => console.error(err))
	}

    return (
        <Calendar
        localizer={localizer}
		events={trainings}
		resourceTitleAccessor='resource'
        startAccessor='start'
        endAccessor='end'
        views={['month', 'week', 'day']}
        style={{height: 450}}
		/>
	)
}