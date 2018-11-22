import React, { Component } from 'react';
import qs from 'query-string';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { lightTheme } from "../utils/themeLight";
import MuiThemeProviderUI from "@material-ui/core/styles/MuiThemeProvider";
import withStyles from "@material-ui/core/es/styles/withStyles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button/Button";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import EMailIcon from '@material-ui/icons/Mail';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    headline: {
        paddingTop: 20,
        paddingBottom: 20
    },
    resendButton: {
        padding: 20,
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

class Verify extends Component {

    constructor() {
        super();
        this.state = {
            tokenOutdated: false,
            
            email: '',

            loading: false,
        };
    };

    componentDidMount() {
        document.title='Verify';

        const parameters = qs.parse(window.location.search);

        fetch('http://localhost:8080/register/verify?id='+parameters.id+'&token='+parameters.token, {
            method: 'PUT',
        }).then(results => {

            return results.json();

        }).then(result => {

            switch (result.status.code) {
                case 200:
                    this.props.enqueueSnackbar({
                        message: "You are now able to login! Enjoy!",
                        options: {
                            variant: "success"
                        }
                    });
                    this.props.history.push('/login?username='+result.register.user.username);
                    break;

                case 401:
                    this.setState({ tokenOutdated: true });
                    this.props.enqueueSnackbar({
                        message: "Something went wrong - visit the FAQ page for more help.",
                        options: {
                            variant: "error"
                        }
                    });
                    break;

                case 402:
                        this.setState({ tokenOutdated: true });
                    break;

                //Should not be thrown by user
                case 501:
                case 502:
                    this.props.enqueueSnackbar({
                        message: "Sorry, this should not happen. You possibly visited an unknown site.",
                        options: {
                            variant: "error"
                        }
                    });
                    this.props.history.push('/');
                    break;

                default:
                    this.props.history.push('/');
                    break;

            }
        });

        
    }

    handleMailChange = (event) => {
        this.setState({email: event.target.value});
    }

    handleSubmit = () => {

        this.setState({ loading: true })
        //TODO: Change it accordingly to the correct API endpoint
        fetch('', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(results => {
            return results.json();
        }).then(result => {

            switch(result.status.code) {
               
                case 200:
                    this.props.enqueueSnackbar({
                        message: "We resend your validation token :)",
                        options: {
                            variant: "success"
                        }
                    });
                    this.setState({ loading: false })
                    this.props.history.push('/');
                    break;

                default: 
                    this.props.enqueueSnackbar({
                        message: "Something went wrong - visit the FAQ page for more help.",
                        options: {
                            variant: "error"
                        }
                    });
                    this.setState({ loading: false })
                    break;
            }
        });

        

    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <MuiThemeProviderUI theme={lightTheme}>
                    <Grid container alignContent="center" justify="center">
                        <Grid item xs={12} md={8} lg={4}>
                            <Paper elevation={1}>
                                <Grid container spacing={16} alignItems="center" justify="center" style={{ minHeight: '100px' }}
                                    direction="column">
                                    <Grid item lg={12} style={{ textAlign: "center" }}>

                                        {!this.state.tokenOutdated ? (
                                            <div>
                                                <Typography component="p" align="center"
                                                    className={classes.headline}>
                                                    We are validating your registration - please wait!
                                                </Typography>
                                                <CircularProgress className={classes.progress} />
                                            </div>
                                        ) : (
                                            <div>
                                                <Typography component="p" align="center"
                                                    className={classes.headline}>
                                                    Woops, it seems like your token is outdated. Resend it now!
                                                </Typography>
                                                <FormControl fullWidth={true} required={true}>
                                                    <InputLabel>E-Mail</InputLabel>
                                                    <Input id="user-mail-input" type="email" value={this.state.email} startAdornment={
                                                        <InputAdornment position="start">
                                                            <EMailIcon />
                                                        </InputAdornment>
                                                    }
                                                        onChange={this.handleMailChange}
                                                    />
                                                    <FormHelperText><em>The E-Mail you used for registration.</em></FormHelperText>
                                                </FormControl>
                                                <div className={classes.wrapper}>
                                                    <Button id="resend-button" variant="contained" color="primary" disabled={this.state.loading}
                                                        onClick={this.handleSubmit}>
                                                        Resend token now!
                                                    </Button>
                                                    {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                                </div>
                                            </div>
                                            )}

                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </MuiThemeProviderUI>

            </div>
        )
    }
}

export default
    compose(
        withStyles(styles),
        withRouter,
    )(Verify);