import React, { useState, useEffect, forwardRef } from 'react';
import MaterialTable from 'material-table';
import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, Edit, FilterList,
    FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn, Delete } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
import AddTraining from './AddTraining';


export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [training, setTrainings] = useState([]);

    useEffect(() => {
        getCustomers();
    },[])

    useEffect(() => {
        getTrainings();
    }, [])

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    };

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')){
        fetch(link, {method: 'DELETE'})
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('Customer deleted')
            setOpen(true)
        })
        .catch(err => console.error(err))
        }
    }

    const addCustomer = (customer) => {
        console.log(customer)
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(customer)
        })
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('New customer added');
            setOpen(true);
        })
        .catch(err => console.error())
    }

    const updateCustomer = (customer) => {
        fetch(customer.links[0].href, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(_=> getCustomers())
        .then(_=> {
            setMsg('Customer edited')
            setOpen(true)
        })
        .catch(err => console.error(err))
    }

    const addTraining = (training, link) => {
        console.log(training, link)
        const newTraining = {
            'date' : training.date,
            'activity' : training.activity,
            'duration' : training.duration,
            'customer' : link
        }
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body:  JSON.stringify(newTraining)
        })
        .then(_ => getTrainings())
        .then(_ => {
            setMsg('New training added');
            setOpen(true);
        })
        .catch(err => console.error(err));
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
            render: (row) => (<AddTraining trainings={row} addTraining={addTraining} 
                customer={row.links[0].href}/>)
        },
        {
            title: 'Firstname',
            field: 'firstname'
        },
        {
            title: 'Lastname',
            field: 'lastname'
        },
        {
            title: 'Email',
            field: 'email'
        },
        {
            title: 'Phone',
            field: 'phone'
        },
        {
            title: 'Address',
            field: 'streetaddress'
        },
        {
            title: 'Postcode',
            field: 'postcode'
        },
        {
            title: 'City',
            field: 'city'
        }
    ]

    const handleClose = () => {
        setOpen(false);
    }
    
    return(
    <div style={{ maxWidth: "100%", margin: 15 }}>
        <MaterialTable
            icons={tableIcons}
            title="Customers"
            columns={columns}
            data={customers}
            editable={{
                onRowAdd: newCustomer =>
                    new Promise((resolve) => {
                        addCustomer(newCustomer);
                        resolve();
                    }),
                onRowUpdate: (newCustomer, oldCustomer) =>
                    new Promise((resolve) => {
                        const data = customers;
                        const index = data.indexOf(oldCustomer)
                        data[index] = newCustomer;
                        updateCustomer(newCustomer);
                        resolve();
                    })
            }}
            actions={[
                {
                    icon: () => <Delete></Delete>,
                    tooltip: 'Delete user',
                    onClick: (event, row) => {
                        deleteCustomer(row.links[0].href)
                    }
                }
            ]}
            />
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