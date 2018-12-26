import React, { Component } from 'react';

import store from '../../redux/store';
import { connect } from "react-redux";
import { logoutUser } from '../../redux/actions';

import { Route, Link, Redirect, BrowserRouter } from 'react-router-dom';

import Login from '../../components/logout'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'


const mapDispatchToProps = dispatch => {
    return {
        //logoutUser: credentials => dispatch(logoutUser())
    };
  };


class ConnectedHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedOut: false
        }
    }

    logOut() {
        this.setState({loggedOut: true});
     }

    render() {
        return (
            this.state.loggedOut?
             <Redirect to="/logout" />
            :
            <div>
                Welcome {store.getState().username}
                <a onClick={this.logOut.bind(this)}>Logout</a>
            </div>
        )
    }
}

const Home = connect(null, mapDispatchToProps)(ConnectedHome);

export default Home;