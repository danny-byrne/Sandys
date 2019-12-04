import React from 'react';
import NavigationItem from './NavigationItem/navigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>Sandwich Builder</NavigationItem> 
    <NavigationItem link="/">Checkout</NavigationItem> 
  </ul>
);

export default navigationItems;