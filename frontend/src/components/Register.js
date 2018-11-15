import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button/Button";
import {lightTheme} from "../utils/themeLight";
import MuiThemeProviderUI from "@material-ui/core/styles/MuiThemeProvider";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import UsernameIcon from '@material-ui/icons/Person'
import PasswordIcon from '@material-ui/icons/Lock'
import EMailIcon from '@material-ui/icons/Mail'
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import Link from 'react-router-dom/es/Link';
import CircularProgress from '@material-ui/core/CircularProgress';
import blue from '@material-ui/core/colors/blue';
import {BACKEND_URL_REGISTER} from "../utils/const-paths";

/*
const usernameRegex = '';
const passwordRegex = '';
const mailRegex = '';
*/

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    headline: {
        paddingTop: 20,
        paddingBottom: 20
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
});

class Register extends Component {

    constructor() {
        super();
        this.state = {
            isUsernameInvalid: false,
            isUsernameTouched: false,
            usernameErrorMsg: "3 - 12 characters",
            isPasswordInvalid: false,
            isPasswordTouched: false,
            passwordErrorMsg: "6 - 32 characters",
            isEmailInvalid: false,
            isEmailTouched: false,
            emailErrorMsg: "",

            username: '',
            password: '',
            mail: '',

            loading: false,
            registerMsg: '',
        };
    };

    //TODO: Correct Regex missing, check if pw is exactly the same and include "loading"
    isAnyInvalid(){
        return this.state.isUsernameInvalid || this.state.isPasswordInvalid || this.state.isEmailInvalid;
    };
    isAllTouched(){
        return this.state.isUsernameTouched && this.state.isPasswordTouched && this.state.isEmailTouched;
    }

    handleUsernameChange = async (event) => {
        if(event.target.value !== '') { //event.target.value.length > 3 && event.target.value.length < 12){

            fetch('http://localhost:8080/register/checkname/' + event.target.value)
                .then(results => {
                    return results.json();
                })
                //.then(result => this.props.updateFlashcard(result))
                .then(result => {
                    this.setState({
                        isUsernameInvalid: !(result.status.message === 'OK'),
                        usernameErrorMsg: (result.register!==undefined)?result.register.messageUsername:'',
                    })
                });

        }else{
            this.setState({
                usernameErrorMsg: 'Username must be at least 3 characters and maximal 12 characters.',
                isUsernameInvalid: true,
            });
        }

        this.setState({
            isUsernameTouched: true,
            username: event.target.value,
        });
    };

    handlePasswordChange = (event) => {
        this.setState({
            isPasswordInvalid: event.target.value.length < 6 || event.target.value.length > 32,
            isPasswordTouched: true,
            password: event.target.value,
        });
    };
    handleEmailChange = (event) => {
        var invalid = this.validateEmail(event.target.value)
        this.setState({
            isEmailInvalid: invalid,
            isEmailTouched: true,
            mail: event.target.value,
            emailErrorMsg: invalid?"No valid email-adress":"",
        });
    };

validateEmail = (email) => {
    return !email.includes('@');
}
    handleSubmit = (event) => {
        //TODO: CONST FOR API
        this.setState({loading: true});

        fetch('http://localhost:8080/register/newuser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "register": {
                    "user": {
                        "username": this.state.username,
                        "email": this.state.mail,
                        "password": this.state.password
                    }
                }
            })
        }).then(results => {
            return results.json();
        }).then(result => {
            this.setState({registerMsg:(result.status.message === "ERROR")?'':'Thank you, ' + result.register.user.username + ', for your registration. Look in your mailaccount to finish the registration'});
        });

        this.setState({loading: false})

    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <MuiThemeProviderUI theme={lightTheme}>
                    <Grid container alignContent="center" justify="center">
                        <Grid item xs={12} md={8} lg={4}>
                            <Paper className={classes.root} elevation={1}>
                                <Grid container spacing={16} alignItems="center" justify="space-evenly"
                                      direction="column">
                                    <Grid item lg={12}>
                                        <Typography variant="h3" component="h3" align="center">
                                            Register
                                        </Typography>
                                        <Typography component="p" align="center"
                                                    className={classes.headline}>
                                            ... at Flashcard Community!<br/>Don't worry, we don't require unnecessary
                                            information :)<br/>
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                        <FormControl required={true} error={this.state.isUsernameInvalid}>

                                            <InputLabel>Username</InputLabel>
                                            <Input id="user-input" type="text"

                                                   startAdornment={
                                                       <InputAdornment position="start">
                                                           <UsernameIcon/>
                                                       </InputAdornment>
                                                   }
                                                   onChange={this.handleUsernameChange}
                                            />
                                            <FormHelperText id={"usernameErrorMsgID"}><em>{this.state.usernameErrorMsg}</em></FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <FormControl required={true} error={this.state.isPasswordInvalid}>
                                            <InputLabel>Password</InputLabel>
                                            <Input id="user-password" type="password" startAdornment={
                                                <InputAdornment position="start">
                                                    <PasswordIcon/>
                                                </InputAdornment>
                                            }
                                                   onChange={this.handlePasswordChange}
                                            />
                                            <FormHelperText><em>{this.state.passwordErrorMsg}</em></FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <FormControl required={true} error={this.state.isPasswordInvalid}>
                                            <InputLabel>Repeat password</InputLabel>
                                            <Input id="user-password-repeat" type="password" startAdornment={
                                                <InputAdornment position="start">
                                                    <PasswordIcon />
                                                </InputAdornment>
                                            }
                                                   onChange={this.handlePasswordChange}
                                            />
                                            <FormHelperText><em>See above</em></FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <FormControl required={true} error={this.state.isEmailInvalid}>
                                            <InputLabel>E-Mail</InputLabel>
                                            <Input id="user-mail-input" type="email" startAdornment={
                                                <InputAdornment position="start">
                                                    <EMailIcon/>
                                                </InputAdornment>
                                            }
                                                   onChange={this.handleEmailChange}
                                            />
                                            <FormHelperText><em>{this.state.emailErrorMsg}</em></FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={4} md={4} lg={4}>
                                        <div className={classes.wrapper}>
                                            <Button id="register-button" variant="contained" color="primary" disabled={!this.isAllTouched() || this.isAnyInvalid()} onClick={this.handleSubmit}>
                                                Register now!
                                            </Button>
                                            {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                        </div>
                                        <Typography style={{color:'green'}} align={"center"} id={"register-feedback"}>{this.state.registerMsg}</Typography>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <Typography variant="caption" className={classes.headline}>
                                            Got an account already? <Link id="link-login" to="/login">Sign in!</Link>
                                        </Typography>

                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </MuiThemeProviderUI>
            </div>
        );
    }

}

export default withStyles(styles)(Register);