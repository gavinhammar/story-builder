import React, { Component } from 'react';

import store from '../../redux/store';
import { connect } from "react-redux";
import { logoutUser } from '../../redux/actions';

import { Route, Link, Redirect, BrowserRouter } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: credentials => dispatch(logoutUser())
    };
  };

class ConnectedLogout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedOut: false
        }
        this.logOut();
    }

     logOut() {
        this.props.logoutUser({});
        this.setState({loggedOut: true});
     }

    render() {
      
        return (
           <Redirect to={{
            pathname: '/login'
        }} />
        )
    }
}

const Logout = connect(null, mapDispatchToProps)(ConnectedLogout);

export default Logout;