import React, {Component} from 'react';
import MuiThemeProviderUI from "@material-ui/core/styles/MuiThemeProvider";
import {lightTheme} from "../../utils/themeLight";
import Grid from "@material-ui/core/Grid/Grid";
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
import Divider from "@material-ui/core/Divider/Divider";
import * as PropTypes from "prop-types";
import {BACKEND_URL} from "../../utils/const-paths";
import qs from "query-string";


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

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};


class EditAccount extends Component {

    state = {
        oldPassword: '',
        oldPasswordErrorMsg: '',
        isOldPasswordIncorrect: false,

        newPassword: '',
        newPasswordErrorMsg: '6-32 characters',
        isNewPasswordIncorrect: false,

        newEmail: '',
        newEmailErrorMsg: '',
        isNewEmailIncorrect: false,

        closeAccountPassword: '',
    };

    handleClickOpenCloseAccount = () => {
        this.setState({openCloseAccount: true});
    };

    handleCloseCloseAccount = () => {
        this.setState({openCloseAccount: false, closeAccountPassword: ''});
    };

    handleSubmitCloseAccount = () => {
        fetch(BACKEND_URL + '/edit/closeAccount', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user": {
                    "session": this.props.session,
                    "sessionHash": this.props.sessionHash,
                    "data":{
                        "targetUserID": this.props.userID,
                        "oldPassword": this.state.oldPassword,
                        "newPassword": this.state.newPassword,
                        "newEmail": this.state.newEmail
                    }
                }
            })
        }).then(results => {
            return results.json();
        }).then(result => {
            switch(result.status.code) {
                case 200:
                    break;

                default:
                    this.setState({
                        oldPasswordErrorMsg: (result.user.oldPasswordErrorMsg !== undefined)?result.user.oldPasswordErrorMsg:'',
                        isOldPasswordIncorrect: (result.user.oldPasswordErrorMsg === undefined),

                        newPasswordErrorMsg:  (result.user.newPasswordErrorMsg !== undefined)?result.user.newPasswordErrorMsg:'6-32 characters',
                        isNewPasswordIncorrect: (result.user.newPasswordErrorMsg === undefined),

                        newEmail: (result.user.newEmail !== undefined)?result.user.newEmail:this.state.newEmail,
                        newEmailErrorMsg: (result.user.newEmailErrorMsg !== undefined)?result.user.newEmailErrorMsg:'',
                        isNewEmailIncorrect: (result.user.newEmailErrorMsg === undefined),
                    });
                    break;
            }
        }).catch(err => {
            console.log(err);
        });
    };

    componentWillMount() {
        let targetUserID = qs.parse(window.location.search).userID !== undefined ? qs.parse(window.location.search).userID : this.props.userID;

        fetch(BACKEND_URL + '/edit/getAccountData', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user": {
                    "session": this.props.session,
                    "sessionHash": this.props.sessionHash,
                    "userID": this.props.userID,
                    "data":{
                        "targetUserID": targetUserID,
                    }
                }
            })
        })
            .then(results => {
                return results.json();
            })
            .then(result => {

                switch(result.status.code) {

                    case 200:
                        this.setState({newEmail: result.user.email});
                        break;

                    default:
                        console.log(result.status.code);
                        break;
                }
            }).catch(err => {
            console.log(err);
        });
    }

    handleSubmit = () => {
        fetch(BACKEND_URL + '/edit/setAccountData', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user": {
                    "session": this.props.session,
                    "sessionHash": this.props.sessionHash,
                    "userID": this.props.userID,
                    "data":{
                        "oldPassword": this.state.oldPassword,
                        "newPassword": this.state.newPassword,
                        "newEmail": this.state.newEmail
                    }
                }
            })
        }).then(results => {
            return results.json();
        }).then(result => {
            switch(result.status.code) {
                case 200:
                    break;

                default:
                    this.setState({
                        oldPasswordErrorMsg: (result.user.oldPasswordErrorMsg !== undefined)?result.user.oldPasswordErrorMsg:'',
                        isOldPasswordIncorrect: (result.user.oldPasswordErrorMsg === undefined),

                        newPasswordErrorMsg:  (result.user.newPasswordErrorMsg !== undefined)?result.user.newPasswordErrorMsg:'6-32 characters',
                        isNewPasswordIncorrect: (result.user.newPasswordErrorMsg === undefined),

                        newEmail: (result.user.newEmail !== undefined)?result.user.newEmail:this.state.newEmail,
                        newEmailErrorMsg: (result.user.newEmailErrorMsg !== undefined)?result.user.newEmailErrorMsg:'',
                        isNewEmailIncorrect: (result.user.newEmailErrorMsg === undefined),
                    });
                    break;
            }
        }).catch(err => {
            console.log(err);
        });

        this.setState({
            oldPassword: '',
            newPassword: '',
        });
    }

    handleInputChange = (event) => {
        switch (event.target.id) {
            case 'oldPasswordInput':
                this.setState({oldPassword: event.target.value, isOldPasswordIncorrect: false, oldPasswordErrorMsg: ''});
                break;
            case 'newPasswordInput':
                this.setState({newPassword: event.target.value, isNewPasswordIncorrect: false, newPasswordErrorMsg: '6-32 characters'});
                break;
            case 'newEmailInput':
                this.setState({newEmail: event.target.value, isNewEmailIncorrect: false, newEmailErrorMsg: ''});
                break;
            case 'closeAccountPasswordInput':
                this.setState({closeAccountPassword: event.target.value});
                break;

            default:
                break;

        }
    }


    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <MuiThemeProviderUI theme={lightTheme}>

                    <Grid container justify="center">


                        <Grid item sm={12} md={8} lg={6}>


                            <Grid container justify="center" spacing={16}
                                  elevation={2} direction={"column"}>

                                <Grid container spacing={16}>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <Typography variant="h4" component="h3">
                                            Edit Account
                                        </Typography>
                                        <Typography component="p" className={classes.headline}>
                                            Here you can edit your profile and/or add additional information. To really
                                            know
                                            it is you
                                            updating your profile, please type in your current password.<br/>
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <FormControl required={true} error={this.state.isOldPasswordIncorrect}>
                                            <InputLabel>Old Password</InputLabel>
                                            <Input id={'oldPasswordInput'} type="password" startAdornment={
                                                <InputAdornment position="start">
                                                    <PasswordIcon/>
                                                </InputAdornment>
                                            }
                                                   value={this.state.oldPassword}
                                                   onChange={this.handleInputChange}
                                            />
                                            <FormHelperText><em>{this.state.oldPasswordErrorMsg}</em></FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <Divider/>
                                        <Typography component="p" className={classes.headline}>
                                            The following information is needed to log in and won't be shown on your
                                            profile
                                            page.<br/>
                                        </Typography>
                                        <FormControl error={this.state.isNewPasswordIncorrect}>
                                            <InputLabel>New Password</InputLabel>
                                            <Input id={'newPasswordInput'} type="password" startAdornment={
                                                <InputAdornment position="start">
                                                    <PasswordIcon/>
                                                </InputAdornment>
                                            }
                                                   value={this.state.newPassword}
                                                   onChange={this.handleInputChange}
                                            />
                                            <FormHelperText><em>{this.state.newPasswordErrorMsg}</em></FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <FormControl error={this.state.isNewEmailIncorrect}>
                                            <InputLabel>E-Mail</InputLabel>
                                            <Input id={'newEmailInput'} type="email" startAdornment={
                                                <InputAdornment position="start">
                                                    <EMailIcon/>
                                                </InputAdornment>
                                            }
                                                   value={this.state.newEmail}
                                                   onChange={this.handleInputChange}
                                            />
                                            <FormHelperText><em>{this.state.newEmailErrorMsg}</em></FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    <Grid item sm={12} md={12} lg={12}>
                                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
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

                                            <Input id={'closeAccountPasswordInput'} type="password" startAdornment={
                                                <InputAdornment position="start">
                                                    <PasswordIcon/>
                                                </InputAdornment>
                                            }
                                                   value={this.state.closeAccountPassword}
                                                   onChange={this.handleInputChange}
                                            />

                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleCloseCloseAccount} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={this.handleSubmitCloseAccount} color="primary" autoFocus>
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

EditAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EditAccount);