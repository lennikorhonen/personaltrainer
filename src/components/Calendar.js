import React, { useState } from 'react';
import { Calendar, momentLocalizer, views } from 'react-big-calendar';
import moment from 'moment';
import Trainings from './Traininglist';

export default function TrainingCalendar() {
    const localizer = momentLocalizer(moment);

    

    return(
        <div><Calendar 
        localizer={localizer}
        events={Trainings}
        views= {'month' | 'week' | 'day'}
        defaultDate='true'
        startAccessor='start'
        endAccessor='end'
        style={{height: 500}}
    /></div>
    )
}