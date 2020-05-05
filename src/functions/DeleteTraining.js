import React, { useState, useEffect } from 'react';

export default function DeleteTraining() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getTrainings()
    },[])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    const deleteTrainings = (link) => {
        if(window.confirm('Are you sure'))
        console.log(link)
        fetch(link, {method: 'DELETE'})
        .then(_ => getTrainings())
        .then(_ => {
            setMsg('Training deleted')
            setOpen(true)
        })
        .catch(err => console.error(err))
    }
    const handleClose = () => {
        setOpen(false);
    }

    return(<div></div>
    )
}