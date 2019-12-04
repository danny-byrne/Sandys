import React from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/toolbar';
import SideDrawer from '../Navigation/SideDrawer/sideDrawer';


const layout = (props) => (
  <React.Fragment>
    <Toolbar />
    <SideDrawer />
    {/* <div>Toolbay, SideDrawer, BackDrop</div> */}
    <main className={classes.Content}>
      {props.children}
    </main>
  </React.Fragment>
);

export default layout;