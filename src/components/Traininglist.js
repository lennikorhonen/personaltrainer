import React, { useState, useEffect, forwardRef } from 'react';
import MaterialTable from 'material-table';
import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, Edit, FilterList,
    FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn, Delete } from '@material-ui/icons';
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getTrainings();
    },[])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTrainings = (link) => {
        if(window.confirm('Are you sure'))
        console.log(link.id)
        fetch('https://customerrest.herokuapp.com/api/trainings/' + link.id, {method: 'DELETE'})
        .then(_ => getTrainings())
        .then(_ => {
            setMsg('Training deleted')
            setOpen(true)
        })
        .catch(err => console.error(err))
    }

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <Delete {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    const columns = [
        {
            title: 'Activity',
            field: 'activity'
        },
        {
            title: 'Date',
            field: 'date',
            render: row => moment(row.date).format('DD/MM/YYYY HH:mm')
        },
        {
            title: 'Duration',
            field: 'duration'
        },
        {
            title: 'Customer',
            field: 'customer.firstname'
        }
    ]

    const handleClose = () => {
        setOpen(false);
    }

    return(
        <div style={{ maxWidth: "100%", margin: 15 }}>
        <MaterialTable
            icons={tableIcons}
            title="Trainings"
            columns={columns}
            data={trainings}
            actions={[
                {
                    icon: () => <Delete></Delete>,
                    tooltip: 'Delete training',
                    onClick: (event, row) => {
                        deleteTrainings(row)
                    }
                }
            ]} />
        <Snackbar
            open={open}
            autoHideDuration={3000}
            message={msg}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
        />
    </div>
    );
}