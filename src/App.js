import React, { Component } from 'react';
import logo from './logo.svg';

import store from './redux/store';
import { connect } from "react-redux";

import SendibleAPI from './api/sendible';

import NavBar from './components/common/navbar'
import Login from './components/login'
import Home from './components/dashboard/home'
import { Route, Link, Redirect, BrowserRouter } from 'react-router-dom';
import './App.css';

const Public = () => (
  <div> This is a public page </div>
);

const Private = () => (
  <div> This is a private page </div>
);

const LoginPage = () => (
  <div> Login Page <button>login</button> </div>
);

/*const AuthService = {
  isLoggedIn: false,

  isAuthenticated(state) {
    SendibleAPI.getProfile(state, (res) => {
      if (res.data.error){
        this.isLoggedIn = false;
      }
      else{
        alert("logged in as " + state.username);
        this.isLoggedIn = true;
      }
    },
    (err) => {
      this.isLoggedIn = false;
    }
    ).then(() => {
      return this.isLoggedIn;
    });
   
  },

  logout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const SecretRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    AuthService.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);
*/

const mapStateToProps = state => {
  return { 
    loggedInUser: state.profile
  };
};

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
