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
});

class Verify extends Component {

    constructor() {
        super();
        this.state = {
            tokenOutdated: false,
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
                    this.props.enqueueSnackbar({
                        message: "Invalid parameters, cannot verify.",
                        options: {
                            variant: "error"
                        }
                    });
                    break;

                case 402:
                        this.setState({ tokenOutdated: true });
                    break;

                case 501:
                    this.props.history.push('/');
                    break;

                default:
                    this.props.history.push('/');
                    break;

            }
        });

        
    }

    handleSubmit() {

        this.props.enqueueSnackbar({
            message: "We resend your validation token :)",
            options: {
                variant: "success"
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
                                    <Grid item lg={12}>

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
                                                        Woops, it seems like your token is outdated.
                                                </Typography>
                                                    <Button id="register-button" variant="contained" color="primary"
                                                        onClick={this.handleSubmit}>
                                                        Resend validation link!
                                                </Button>
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