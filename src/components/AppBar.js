import React, { useState } from 'react';
import { Divider, Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton,
   AppBar, Toolbar, Typography} from '@material-ui/core';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';
import Calendar from './Calendar';
import Statistics from './Statistics';
import TodayIcon from '@material-ui/icons/Today';
import EqualizerIcon from '@material-ui/icons/Equalizer';


export default function Bars() {

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
      }

    const handleDrawerClose = () => {
        setOpen(false);
      }

    return(
        <div>
          <AppBar position="static">
          <Toolbar>
            <IconButton onClick={handleDrawerOpen} 
              edge="start" 
              className={Bars.menuButton} 
              color="inherit" 
              aria-label="menu">
            <MenuIcon />
            </IconButton>
          <Typography variant="h6"
            color='inherit'>
            Personal trainer
          </Typography>
        </Toolbar>
        </AppBar>
        <BrowserRouter>
        <Drawer
        className={Bars.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes= {{
          paper: Bars.drawerPaper,
        }}
      >
        <div className={Bars.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to='/' onClick={() => Customerlist} >
            <ListItemIcon><AccountBoxIcon /></ListItemIcon>
            <ListItemText primary='Customers' />
          </ListItem>
          <ListItem button component={Link} to='/trainings' onClick={() => Traininglist} >
            <ListItemIcon><DirectionsRunIcon /></ListItemIcon>
            <ListItemText primary='Trainings' />
          </ListItem>
          <ListItem button component={Link} to='/calendar' onClick={() => Calendar} >
            <ListItemIcon><TodayIcon /></ListItemIcon>
            <ListItemText primary='Calendar' />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to='/statistics' onClick={() => Statistics} >
			<ListItemIcon><EqualizerIcon /></ListItemIcon>
			<ListItemText primary='Statistics' />
          </ListItem>
        </List>
      </Drawer>
      <Switch>
        <Route exact path='/' component={Customerlist}/>
        <Route path='/trainings' component={Traininglist} />
        <Route path='/calendar' component={Calendar} />
		    <Route path='/statistics' component={Statistics} />
      </Switch>
      </BrowserRouter>
        </div>
    );
}