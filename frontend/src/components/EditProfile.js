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
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import Dialog from "@material-ui/core/Dialog/Dialog";
import PasswordIcon from '@material-ui/icons/Lock'
import EMailIcon from '@material-ui/icons/Mail'
import CakeIcon from '@material-ui/icons/Cake'
import HobbyIcon from '@material-ui/icons/InsertEmoticon'
import RealNameIcon from '@material-ui/icons/Face'
import Divider from "@material-ui/core/Divider/Divider";

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
    editProfileEntry: {
        paddingTop: theme.spacing.unit * 2,
    }
});

class EditProfile extends Component {

    state = {
        openCloseAccount: false,
    };

    handleClickOpenCloseAccount = () => {
        this.setState({openCloseAccount: true});
    };

    handleCloseCloseAccount = () => {
        this.setState({openCloseAccount: false});
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <MuiThemeProviderUI theme={lightTheme}>
                    <Grid container justify="center">
                        <Grid item sm={12} md={8} lg={6}>
                            <Grid container justify="center" spacing={16} className={classes.paper} component={Paper}
                                  elevation={2} direction={"column"}>
                                <Grid container spacing={16}>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <Typography variant="h4" component="h3">
                                            Edit Profile
                                        </Typography>
                                        <Typography component="p" className={classes.headline}>
                                            Here you can edit your profile and/or add additional information. To really
                                            know
                                            it is you
                                            updating your profile, please type in your current password.<br/>
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <FormControl required={true}>
                                            <InputLabel>Old Password</InputLabel>
                                            <Input type="password" startAdornment={
                                                <InputAdornment position="start">
                                                    <PasswordIcon/>
                                                </InputAdornment>
                                            }
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <Divider/>
                                        <Typography component="p" className={classes.headline}>
                                            The following information is needed to log in and won't be shown on your
                                            profile
                                            page.<br/>
                                        </Typography>
                                        <FormControl>
                                            <InputLabel>New Password</InputLabel>
                                            <Input type="password" startAdornment={
                                                <InputAdornment position="start">
                                                    <PasswordIcon/>
                                                </InputAdornment>
                                            }
                                            />
                                            <FormHelperText><em>At least 4 characters</em></FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <FormControl>
                                            <InputLabel>E-Mail</InputLabel>
                                            <Input type="email" startAdornment={
                                                <InputAdornment position="start">
                                                    <EMailIcon/>
                                                </InputAdornment>
                                            }
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <Divider/>
                                        <Typography component="p" className={classes.headline}>
                                            Those information will be displayed on your profile, but aren't needed and
                                            not
                                            providing
                                            those information won't lead to any disadvantages.<br/>
                                        </Typography>
                                        <FormControl required={false}>
                                            <InputLabel>Real Name</InputLabel>
                                            <Input type="text" startAdornment={
                                                <InputAdornment position="start">
                                                    <RealNameIcon/>
                                                </InputAdornment>

                                            }
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <FormControl required={false}>
                                            <InputLabel>Interest</InputLabel>
                                            <Input multiline rowsMax="4" type="text" startAdornment={
                                                <InputAdornment position="start">
                                                    <HobbyIcon/>
                                                </InputAdornment>

                                            }
                                            />
                                            <FormHelperText><em>Max 200 characters</em></FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <FormControl required={false}>
                                            <InputLabel>Date of birth</InputLabel>
                                            <Input type="date" startAdornment={
                                                <InputAdornment position="start">
                                                    <CakeIcon/>
                                                </InputAdornment>
                                            }
                                            />
                                            <FormHelperText><em>You know, a day in the past or are you Marty
                                                McFly?</em></FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <Button variant="contained" color="primary">
                                            Update Profile
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item lg={12}>
                                        <Typography variant="h4" component="h3">
                                            <br/>Close Account
                                        </Typography>
                                        <Typography component="p" className={classes.headline}>
                                            You want to leave us? That's okay, we promise :( But keep in mind that we
                                            won't
                                            be able
                                            to restore your data at any point.<br/>
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <Button variant="contained" color="secondary"
                                                onClick={this.handleClickOpenCloseAccount}>
                                            Close Account
                                        </Button>
                                    </Grid>
                                    <Dialog
                                        open={this.state.openCloseAccount}
                                        onClose={this.handleCloseCloseAccount}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Are you really sure?"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                By confirming this dialog message, you agree that we will delete
                                                your account without further inspection and that you won't be able to
                                                get your data back.
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleCloseCloseAccount} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={this.handleCloseCloseAccount} color="primary" autoFocus>
                                                OK
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
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