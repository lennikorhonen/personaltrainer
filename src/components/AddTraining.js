import React, { useState, Fragment } from 'react';
import { Button , TextField , Dialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({date: '', duration: '', activity: '', customer: ''});

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        props.addTraining(training, props.customer);
        setOpen(false);
    }
    
    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    const handleDateChange = (date) => {
        setTraining({...training, date: moment(date._d).toISOString()})
    }

    return(
        <div>
            <Button size='small' color='primary' onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog 
                open={open} 
                disableBackdropClick={true} 
                disableEscapeKeyDown={true} 
                onClose={handleClose}
                aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add training</DialogTitle>
            <DialogContent>
            <TextField 
                margin='dense'
                id='activity'
                name='activity'
                value={training.activity}
                onChange={inputChanged}
                label='Activity'
                fullWidth
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <Fragment>
                    <DateTimePicker
                        ampm='false'
                        margin='dense'
                        id='date'
                        name='date'
                        value={training.date}
                        onChange = {(date) => handleDateChange(date)}
                        label='Date'
                        fullWidth/>
                </Fragment>
            </MuiPickersUtilsProvider>
            <TextField
                margin='dense'
                id='duration'
                name='duration'
                value={training.duration}
                onChange={inputChanged}
                label='Duration'
                fullWidth/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color='primary'>
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Save
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}