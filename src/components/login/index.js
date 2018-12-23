import React, { Component } from 'react';
import store from '../../redux/store';
import '../../App.css';
import { connect } from "react-redux";
import { loginUser } from '../../redux/actions';
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
        name: state.name 
    };
  };

class ConnectedLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {name: props.name, password: ""};
        store.subscribe(() => this.setState({name: store.getState().name}))
    }

    handleClick(event) {
        console.log(this.state);
        this.props.loginUser({
            username: this.state.username, 
            password: this.state.password
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

