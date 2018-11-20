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
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import Notifier from "../utils/Notifier";

//Styles to design some specific components
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

//Initial state as const to reload initial state at any point
const initialState = {
    isUsernameInvalid: false,
    isUsernameTouched: false,
    usernameErrorMsg: "3 - 12 characters",
    isPasswordInvalid: false,
    isPasswordTouched: false,
    passwordErrorMsg: "6 - 32 characters",
    isRepeatPasswordTouched: false,
    isEmailInvalid: false,
    isEmailTouched: false,
    emailErrorMsg: "",

    username: '',
    password: '',
    repeatPassword: '',
    mail: '',

    loading: false,
};

class Register extends Component {

    constructor() {
        super();
        this.state = initialState;
    };

    //Handles input changes
    handleInputChange = (event) => {

        //Depends on the input field that changed
        switch (event.target.id) {

            //Handle user name change
            case "user-input":

                this.setState({
                    username: event.target.value,
                });

                break;

            //Handle password field change
            case "user-password":

                this.setState({
                    password: event.target.value,
                });

                break;

            //Handle password repeat field
            case "user-password-repeat":

                this.setState({
                    repeatPassword: event.target.value
                });

                break;

            //Handle mail field change
            case "user-mail-input":

                this.setState({
                    mail: event.target.value,
                });

                break;

            default:
                //Nothing
                break;
        }

    }

    //Handles submit button
    handleSubmit = (event) => {

        this.setState({loading: true});

        if (this.state.password !== this.state.repeatPassword) {

            this.setState({
                isPasswordInvalid: true,
                passwordErrorMsg: 'The password doesn´t match the repeated password',
                loading: false,
            })

            this.props.enqueueSnackbar({
                message: "The password doesn´t match the repeated password",
                options: {
                    variant: "error"
                }
            });

        }
        else {

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

                this.handleSendResult(result);
                this.setState({
                    loading: false,
                })
            });

        }

    }

    handleSendResult(result) {
        switch (result.status.code) {
            case 200:
                this.props.enqueueSnackbar({
                    message: "Registration successful. Please check your mails.",
                    options: {
                        variant: "success"
                    }
                });
                this.props.history.push('/login');
                break;
            case 400:
                this.setState({
                    isUsernameInvalid: (result.register.messageUsername !== undefined),
                    usernameErrorMsg: (result.register.messageUsername !== undefined) ? result.register.messageUsername : '3 - 12 characters',
                    isPasswordInvalid: (result.register.messagePassword !== undefined),
                    passwordErrorMsg: (result.register.messagePassword !== undefined) ? result.register.messagePassword : '6 - 32 characters',
                    isEmailInvalid: (result.register.messageEmail !== undefined),
                    emailErrorMsg: (result.register.messageEmail !== undefined) ? result.register.messageEmail : '6 - 32 characters',
               });
                this.props.enqueueSnackbar({
                    message: "Registration failed: You got unresolved problems. Please make sure to fill every field correctly",
                    options: {
                        variant: "error"
                    }
                });
                break;
            default:
                //do something
                break;
        }
    }

    render() {
        const {classes} = this.props;
        return (

            <div className={classes.root}>
                <Notifier/>
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
                                    <Grid item sm={8} md={12} lg={12}>
                                        <FormControl required={true} error={this.state.isUsernameInvalid}>

                                            <InputLabel>Username</InputLabel>
                                            <Input id="user-input" type="text"

                                                   startAdornment={
                                                       <InputAdornment position="start">
                                                           <UsernameIcon/>
                                                       </InputAdornment>
                                                   }

                                                   onChange={this.handleInputChange}
                                            />
                                            <FormHelperText
                                                id={"usernameErrorMsgID"}><em>{this.state.usernameErrorMsg}</em></FormHelperText>
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
                                                   onChange={this.handleInputChange}
                                            />
                                            <FormHelperText><em>{this.state.passwordErrorMsg}</em></FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <FormControl required={true} error={this.state.isPasswordInvalid}>
                                            <InputLabel>Repeat password</InputLabel>
                                            <Input id="user-password-repeat" type="password" startAdornment={
                                                <InputAdornment position="start">
                                                    <PasswordIcon/>
                                                </InputAdornment>
                                            }
                                                   onChange={this.handleInputChange}
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
                                                   onChange={this.handleInputChange}
                                            />
                                            <FormHelperText
                                                id={"emailErrorMsgID"}><em>{this.state.emailErrorMsg}</em></FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={4} md={4} lg={4}>
                                        <div className={classes.wrapper}>
                                            <Button id="register-button" variant="contained" color="primary" disabled={this.state.loading}
                                                    onClick={this.handleSubmit}>
                                                Register now!
                                            </Button>
                                            {this.state.loading &&
                                            <CircularProgress size={24} className={classes.buttonProgress}/>}
                                        </div>
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

export default
compose(
    withStyles(styles),
    withRouter,
)(Register);
