import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import { lightTheme } from "../../utils/themeLight";
import MuiThemeProviderUI from "@material-ui/core/styles/MuiThemeProvider";
import withStyles from "@material-ui/core/es/styles/withStyles";

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 2,
        flexGrow: 1,
    },
    headline: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

class FAQ extends Component {

    componentDidMount(){
        document.title='FAQ';
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>

                <MuiThemeProviderUI theme={lightTheme}>

                    <Grid container justify="center">


                        <Grid item sm={12} md={8} lg={6}>

                            <Grid container justify="center" spacing={16} className={classes.paper} component={Paper}
                                elevation={2} direction={"column"}>

                                <Grid item lg={12}>
                                    <Typography variant="h3" align="center">
                                        Friendly Asked Questions
                                    </Typography>
                                    <Typography variant="body1" align="center">
                                        Here you will be able to find answers to a lot of possible questions!
                                    </Typography>
                                </Grid>

                                <Grid item lg={12}>
                                    <Typography variant="body1" align="center">
                                        I'm currently just a placeholder. Soon there will be more to see!
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>
                </MuiThemeProviderUI>
            </div>
        );
    }

}

export default withStyles(styles)(FAQ);