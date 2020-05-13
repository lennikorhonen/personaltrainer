import React, { useState, useEffect } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Bar} from 'recharts';
import lodash from 'lodash';

export default function Statistics() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        getTrainings()
      });
      
      const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
          .then(response => response.json())
          .then(data => setTrainings(lodash(data).groupBy('activity').map(function(duartion, activity) {
              return {
                  name: activity,
                  duration: lodash.sumBy(duartion, 'duartion')
              };
          }).value()))
          .catch(err => console.error(err))
      }

      console.log(trainings)

    return(
        <BarChart
        width={1250}
        height={500}
        data={trainings}
        margin={{ top: 15, right: 25, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <Tooltip value='Charts' />
        <CartesianGrid stroke="#f5f5f5" />
        <Bar dataKey="uv" barSize={100} fill="#8884d8" label="name" />
        <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft'}} />
      </BarChart>
    );
}