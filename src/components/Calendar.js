import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function TrainingCalendar() {
    const localizer = momentLocalizer(moment)
    const [trainings, setTrainings] = useState([])

    useEffect(() => {
      getTrainings()
    });

    const getTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
        console.log('trainings:',trainings);
    }

    const eventList = trainings.map((training) => 
      <tr key={training.id}>
        <td>{training.activity}</td>
        <td>{training.date}</td>
        <td>{training.duration}</td>
        <td>{training.customer.firstname}</td>
      </tr>
    );

    console.log('events:', eventList);

    const events = [
      {
        allDay: 'false',
        title: eventList.activity,
        start: eventList.date,
        end: eventList.date + moment().add(eventList.duration, 'minutes')
      }
  ];

    return (
        <Calendar 
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        views={['month', 'day', 'week']}
        style={{height: 450}}
        />)
}