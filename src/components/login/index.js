import React, { Component } from 'react';

import store from '../../redux/store';
import { connect } from "react-redux";
import { loginUser } from '../../redux/actions';

import axios from 'axios';

import '../../App.css';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const mapDispatchToProps = dispatch => {
    return {
        loginUser: credentials => dispatch(loginUser(credentials))
    };
  };

  
const mapStateToProps = state => {
    return { 
        username: state.username 
    };
  };

class ConnectedLogin extends Component {
    constructor(props) {
        super(props);
        this.state = 
        {   
            username: "", 
            password: "",
            profile: {}
        };
        store.subscribe(() => this.setState({username: store.getState().name}))
    }

    handleClick(event) {
       

        axios.get("https://api.sendible.com/api/v2/profile.json?username=" + this.state.username + "&api_key=" + this.state.password) 
        .then(res => {
            const profile = res.data;
            this.setState({ profile });
            this.props.loginUser({
                username: this.state.username, 
                password: this.state.password,
                profile: this.state.profile
            });

          console.log(this.state);
            
        })
        .catch((error) => {
            alert("Error logging in");
        });
    }

     render() {
        return (
            <div class="myDiv">
           
                    <div>
                    <AppBar
                        title="Login"
                    />
                     <Card>
                        <CardContent>
                            <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            value={this.state.username}
                            onChange = {(event) => this.setState({username:event.target.value})}
                            />
                        <br/>
                            <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event) => this.setState({password:event.target.value})}
                            />
                            <br/>
                            <Button label="Submit" color="primary" onClick={(event) => this.handleClick(event)}>Login</Button>
                        </CardContent>
                    </Card>
                  
                    </div>
              

                Login, {this.state.name}
            </div>
        );
    }
}

const style = {
    margin: 15,
   };
const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin);

export default withStyles()(Login);

