import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import qs from 'query-string';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { lightTheme } from "../utils/themeLight";
import MuiThemeProviderUI from "@material-ui/core/styles/MuiThemeProvider";
import withStyles from "@material-ui/core/es/styles/withStyles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button/Button";

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

        const parameters = qs.parse(window.location.search);

        if (parameters.token === undefined || parameters.id === undefined ||
            parameters.token === "" || parameters.id === "") {
            
            console.log("Redirect to home with error notification!");

        } else {

            fetch('http://localhost:8080/register/verify', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "verfiy": {
                        "checksum": parameters.token,
                        "id": parameters.id,
                    }
                })
            }).then(results => {

                return results.json();

            }).then(result => {

                switch (result.status.code) {
                    case 200:
                        console.log("Redirect to login!");
                        break;

                    case 400:
                        this.setState({ error: false });
                        break;

                    default:
                        break;

                }
            });

        }
    }

    handleSubmit() {

        console.log("Redirect to home with resend notification!");

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

export default withStyles(styles)(Verify);