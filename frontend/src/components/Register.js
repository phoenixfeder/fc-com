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
            isPasswordInvalid: false,
            isPasswordTouched: false,
            isEmailInvalid: false,
            isEmailTouched: false,

            loading: false,
        };
    };

    isAnyInvalid(){
        return this.state.isUsernameInvalid || this.state.isPasswordInvalid || this.state.isEmailInvalid;
    };
    isAllTouched(){
        return this.state.isUsernameTouched && this.state.isPasswordTouched && this.state.isEmailTouched;
    }

    handleUsernameChange = (event) => {
        this.setState({isUsernameInvalid: event.target.value.length < 4 || event.target.value.length > 12});
        this.setState({isUsernameTouched: true});
    };

    handlePasswordChange = (event) => {
        this.setState({isPasswordInvalid: event.target.value.length < 4});
        this.setState({isPasswordTouched: true});
    };
    handleEmailChange = (event) => {
        this.setState({isEmailInvalid: !event.target.value.includes('@')});
        this.setState({isEmailTouched: true});
    };

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
                                    <Grid item sm={12} md={12} lg={12}>
                                        <FormControl required={true} error={this.state.isUsernameInvalid}>

                                            <InputLabel>Username</InputLabel>
                                            <Input type="text"

                                                   startAdornment={
                                                       <InputAdornment position="start">
                                                           <UsernameIcon/>
                                                       </InputAdornment>
                                                   }
                                                   onChange={this.handleUsernameChange}
                                            />
                                            <FormHelperText><em>4 - 12 letters and/or numbers</em></FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <FormControl required={true} error={this.state.isPasswordInvalid}>
                                            <InputLabel>Password</InputLabel>
                                            <Input type="password" startAdornment={
                                                <InputAdornment position="start">
                                                    <PasswordIcon/>
                                                </InputAdornment>
                                            }
                                                   onChange={this.handlePasswordChange}
                                            />
                                            <FormHelperText><em>At least 4 characters</em></FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <FormControl required={true} error={this.state.isPasswordInvalid}>
                                            <InputLabel>Repeat password</InputLabel>
                                            <Input type="password" startAdornment={
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
                                            <Input type="email" startAdornment={
                                                <InputAdornment position="start">
                                                    <EMailIcon/>
                                                </InputAdornment>
                                            }
                                                   onChange={this.handleEmailChange}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <div className={classes.wrapper}>
                                            <Button variant="contained" color="primary" disabled={this.isAnyInvalid() || !this.isAllTouched()}>
                                                Register now!
                                            </Button>
                                            {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                        </div>                                        
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <Typography variant="caption" className={classes.headline}>
                                            Got an account already? <Link to="/login">Sign in!</Link>
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