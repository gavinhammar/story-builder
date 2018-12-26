import React, { Component } from 'react';
import logo from './logo.svg';

import NavBar from './components/common/navbar'
import Login from './components/login'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
           <Login></Login>
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

export default App;
