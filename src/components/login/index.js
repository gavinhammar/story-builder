import React, { Component } from 'react';

import store from '../../redux/store';
import { connect } from "react-redux";
import { loginUser } from '../../redux/actions';
import PropTypes from 'prop-types';

import SendibleAPI from '../../api/sendible';

import '../../App.css';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });

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

const initialState = {
    username: "", 
    password: "",
    profile: {}
};

class ConnectedLogin extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        store.subscribe(() => this.setState({username: store.getState().name}))
    }

    handleClick(event) {
        SendibleAPI.getProfile(this.state,
                (res) => {
                    if (res.data.error){
                        alert("Incorrect username or password");
                    //    this.setState(initialState);
                    }
                    else {
                        const profile = res.data;
                        this.setState({ profile });
                        this.props.loginUser({
                            username: this.state.username, 
                            password: this.state.password,
                            profile: this.state.profile
                        });
                        console.log(this.state);   
                    }
                   
                },
                (err) => {
                    alert("Error logging in");
                }
        );
    }

     render() {

        const {classes} = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                 Sign in
                </Typography>
                     <div className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel> 
                            <Input 
                                id="email" name="email" autoComplete="email" autoFocus
                                onChange = {(event) => this.setState({username:event.target.value})}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password" type="password" id="password" autoComplete="current-password"
                                onChange = {(event) => this.setState({password:event.target.value})}
                            />
                         </FormControl>
                        <Button type="submit"
                                fullWidth
                                variant="contained"
                                color="primary" 
                                className={classes.submit}
                                onClick={(event) => this.handleClick(event)}>Login</Button>
                         Logged in as {this.state.username}
                    </div>
                </Paper>
            </main>
        );
    }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin);

Login.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(Login);

