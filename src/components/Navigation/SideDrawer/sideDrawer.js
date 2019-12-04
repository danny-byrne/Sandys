import React from 'react';
import Logo from '../../logo/logo';
import NavigationItems from '../NavigationItems/navigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/backdrop';


const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if(props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
          <div className={classes.Logo}>
            <Logo />      
          </div>
          <nav>
            <NavigationItems />
          </nav>
        </div>
    </React.Fragment>
  )
};

export default sideDrawer;