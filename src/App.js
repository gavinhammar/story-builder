import React, { Component } from 'react';

import store from './redux/store';

import SendibleAPI from './api/sendible';

import NavBar from './components/common/navbar'
import Login from './components/login'
import Logout from './components/logout'
import Home from './components/dashboard/home'
import { Route, Link, Redirect, BrowserRouter } from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: store.getState().profile,
      isAuthenticated: false,
      isAuthenticating: true
    }
    store.subscribe(() => this.setState(
      {
        loggedInUser:  store.getState().profile

       }
      ));
  }

  componentDidMount() { 
      var localState = this.state;
      this.setState({ isAuthenticated: false, isAuthenticating: true });
      if (store.getState().profile) {
            SendibleAPI.getProfile({username: localState.loggedInUser.login, password: localState.loggedInUser.api_key}, (res) => {
              if (res.data.error){
                this.setState({ isAuthenticated: false, isAuthenticating: false });
                
              }
              else{
                this.setState({ isAuthenticated: true, isAuthenticating: false });
              }
            },
              (err) => {
                this.setState({ isAuthenticated: false, isAuthenticating: false });
              }
            );
        }
        else {
          this.setState({ isAuthenticated: false, isAuthenticating: false });
        }
  }

render() {  
    if (this.state.isAuthenticated){
      return (
        <div className="App">
          <Home>{this.props.username}</Home>
          <Route path="/logout" component={Logout}/>
          <Route path="/login" component={Login}/>
        </div>
      );
    }
    else if (!this.state.isAuthenticated && this.state.isAuthenticating) {
      return (<div>Loading...</div>);
    }
    else if (!this.state.isAuthenticated && !this.state.isAuthenticating) return (
      <div className="App">
         <Redirect to='/login' />
         <Route path="/login" component={Login}/>
         
      </div>
    );
      

    /*return (
      <div className="App">
       <NavBar />
        <header className="App-header">
          
          <img src={logo} className="App-logo" alt="logo" />
          <Login></Login>
          
        </header>
      </div>
    );*/
  }
}

//const App = connect(mapStateToProps)(ConnectedApp);

export default App;
