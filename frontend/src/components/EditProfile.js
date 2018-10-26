import React, {Component} from 'react';
import MuiThemeProviderUI from "@material-ui/core/styles/MuiThemeProvider";
import {lightTheme} from "../utils/themeLight";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/es/styles/withStyles";

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 2,
        flexGrow: 1,
    },
    headline: {
        paddingTop: 20,
        paddingBottom: 20
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

class EditProfile extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <MuiThemeProviderUI theme={lightTheme}>
                    <Grid container justify="center">
                        <Grid container xs={12} md={7} lg={5} spacing={16} className={classes.paper} component={Paper}
                              elevation={2}>
                            <Grid item lg={6} spacing={16}>
                                <Grid item lg={12}>
                                    <Typography variant="h4" component="h3">
                                        Edit Profile
                                    </Typography>
                                    <Typography component="p" className={classes.headline}>
                                        Here you can edit your profile and/or add additional information.<br/>
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} md={12} lg={12}>
                                    <FormControl required={true}>

                                        <InputLabel>Username</InputLabel>
                                        <Input type="text"

                                               startAdornment={
                                                   <InputAdornment position="start">

                                                   </InputAdornment>
                                               }
                                        />
                                        <FormHelperText><em>4 - 12 letters and/or numbers</em></FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={12} md={12} lg={12}>
                                    <FormControl required={true}>
                                        <InputLabel>Old Password</InputLabel>
                                        <Input type="password" startAdornment={
                                            <InputAdornment position="start">

                                            </InputAdornment>
                                        }
                                        />
                                    </FormControl>
                                    <FormControl required={true}>
                                        <InputLabel>New Password</InputLabel>
                                        <Input type="password" startAdornment={
                                            <InputAdornment position="start">

                                            </InputAdornment>
                                        }
                                        />
                                        <FormHelperText><em>At least 4 characters</em></FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={12} md={12} lg={12}>
                                    <FormControl required={true}>
                                        <InputLabel>E-Mail</InputLabel>
                                        <Input type="email" startAdornment={
                                            <InputAdornment position="start">

                                            </InputAdornment>
                                        }
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item sm={12} md={12} lg={12}>
                                    <FormControl required={false}>
                                        <InputLabel>Interest</InputLabel>
                                        <Input type="text" startAdornment={
                                            <InputAdornment position="start">

                                            </InputAdornment>
                                        }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item sm={12} md={12} lg={12}>
                                    <Button variant="contained" color="primary">
                                        Update Profile
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item lg={6} spacing={16} alignContent="flex-start">
                                <Grid item lg={12}>
                                    <Typography variant="h4" component="h3">
                                        Close Account
                                    </Typography>
                                    <Typography component="p" className={classes.headline}>
                                        You want to leave us? That's okay, we promise :( But keep in mind that we won't
                                        be able
                                        to restore your data at any point.<br/>
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} md={12} lg={12}>
                                    <Button variant="contained" color="secondary">
                                        Close Account
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </MuiThemeProviderUI>
            </div>
        );
    }

}

export default withStyles(styles)(EditProfile);