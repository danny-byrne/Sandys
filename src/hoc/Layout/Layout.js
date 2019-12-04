import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/sideDrawer';


class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }
  //clean way of setting state based upon the old state, passing in PrevState as single argument
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer};
    });
  }

  render() {
    return (
      <React.Fragment>
        <Toolbar clicked={this.sideDrawerToggleHandler}/>
        <SideDrawer 
          open = {this.state.showSideDrawer}
          closed = {this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </React.Fragment>
    )
  }
};

export default Layout;