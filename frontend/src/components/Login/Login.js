import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button/Button";
import {lightTheme} from "../../utils/themeLight";
import MuiThemeProviderUI from "@material-ui/core/styles/MuiThemeProvider";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import PasswordIcon from '@material-ui/icons/Lock'
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import Link from 'react-router-dom/es/Link';
import qs from 'query-string';
import UsernameIcon from '@material-ui/icons/Person'
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

class Login extends Component {
    
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',

            isInputInvalid: false,
            loading: false,
        };
    };

    componentDidMount() {
        document.title='Login';
        //Get username from URL
        this.setState({ username: qs.parse(window.location.search).username !== undefined ? qs.parse(window.location.search).username : ''})
    }

    //Handles input changes
    handleInputChange = (event) => {

        //Depends on the input field that changed
        switch (event.target.id) {

            case "username-input":
                this.setState({ username: event.target.value, });
                break;

            case "password-input":
                this.setState({ password: event.target.value, });
                break;

            default:
                break;
        }

    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.username, this.state.password);
    }

    createNewSnackbar = (variant, message) => {
        this.props.enqueueSnackbar({
            message: message,
            options: {
                variant: variant
            }
        });
    }
    
   

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <MuiThemeProviderUI theme={lightTheme}>
                    <Grid container alignContent="center" justify="center">
                        <Grid item xs={12} md={6} lg={4}>
                            <Paper className={classes.root} elevation={1}>
                                <Grid container spacing={16} alignItems="stretch" justify="space-evenly"
                                    direction="column">
                                    <Grid item lg={12}>
                                        <Typography variant="h3" component="h3" align="center">
                                            Login
                                        </Typography>
                                        <Typography component="p" align="center"
                                            className={classes.headline}>
                                            ... we are glad to see you again!<br />
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <FormControl fullWidth={true} required={true} error={false}>
                                            <InputLabel>Username or E-Mail</InputLabel>
                                            <Input id="username-input" type="text" error={this.state.isInputInvalid} onChange={this.handleInputChange} value={this.state.username} startAdornment={
                                                <InputAdornment position="start">
                                                    <UsernameIcon/>
                                                </InputAdornment>
                                                
                                            }
                                           />
                                            <FormHelperText><em>Your username, remember: at least 3 characters!</em></FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <FormControl fullWidth={true} required={true} error={false}>
                                            <InputLabel>Password</InputLabel>
                                            <Input id="password-input" type="password" error={this.state.isInputInvalid} onChange={this.handleInputChange} value={this.state.password} startAdornment={
                                                <InputAdornment position="start">
                                                    <PasswordIcon />
                                                </InputAdornment>
                                            }
                                            />
                                            <FormHelperText><Link to="/login">Forgot your password?</Link></FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12} style={{ alignSelf: "center" }}>
                                        <div className={classes.wrapper}>
                                            <Button id="login-button" variant="contained" color="primary" disabled={this.props.loading}
                                                onClick={this.handleSubmit}>
                                                Login
                                            </Button>
                                            {this.props.loading &&
                                                <CircularProgress size={24} className={classes.buttonProgress} />}
                                        </div>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12} style={{ alignSelf: "center" }}>
                                        <Typography variant="caption" className={classes.headline} >
                                            Not registered yet? <Link id="create-link" to="/register">Create an account now!</Link>
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

export default withStyles(styles)(Login);
