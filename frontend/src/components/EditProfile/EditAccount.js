import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import Divider from '@material-ui/core/Divider/Divider';
import withStyles from '@material-ui/core/es/styles/withStyles';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import Grid from '@material-ui/core/Grid/Grid';
import Input from '@material-ui/core/Input/Input';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import MuiThemeProviderUI from '@material-ui/core/styles/MuiThemeProvider';
import Typography from '@material-ui/core/Typography/Typography';
import PasswordIcon from '@material-ui/icons/Lock';
import EMailIcon from '@material-ui/icons/Mail';
import * as PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { fetchCloseAccount, fetchGetAccountData, fetchUpdateAccount } from '../../actions/edit-actions';
import { lightTheme } from '../../utils/themeLight';

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
  },
});

function TabContainer(props) {
  const { children } = props;
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class EditAccount extends Component {
  state = {
    userID: -1,
    editSelf: true,

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

  componentWillMount() {
    const { enqueueSnackbar } = this.props;
    const userID = qs.parse(window.location.search).userID !== undefined ? qs.parse(window.location.search).userID : this.props.userID;
    this.setState({ userID, editSelf: (userID === this.props.userID) });

    fetchGetAccountData({ ...this.props, userID }, (result) => {

      switch (result.status.code) {
        case 200:
          this.setState({ newEmail: result.user.email });
          break;

        default:
          enqueueSnackbar({
            message: 'This should not happen. Please contact system admin.',
            options: {
              variant: 'error',
            },
          });
          break;
      }
    });
  }

  handleClickOpenCloseAccount = () => {
    this.setState({ openCloseAccount: true });
  };

  handleCloseCloseAccount = () => {
    this.setState({ openCloseAccount: false, closeAccountPassword: '' });
  };

  handleInputChange = (event) => {
    switch (event.target.id) {
      case 'oldPasswordInput':
        this.setState({
          oldPassword: event.target.value,
          isOldPasswordIncorrect: false,
          oldPasswordErrorMsg: '',
        });
        break;
      case 'newPasswordInput':
        this.setState({
          newPassword: event.target.value,
          isNewPasswordIncorrect: false,
          newPasswordErrorMsg: '6-32 characters',
        });
        break;
      case 'newEmailInput':
        this.setState({ newEmail: event.target.value.toLowerCase(), isNewEmailIncorrect: false, newEmailErrorMsg: '' });
        break;
      case 'closeAccountPasswordInput':
        this.setState({ closeAccountPassword: event.target.value });
        break;

      default:
        break;
    }
  };

  handleSubmit = () => {
    const {
      enqueueSnackbar,
    } = this.props;
    const {
      newEmail,
    } = this.state;
    fetchUpdateAccount({ ...this.state, ...this.props }, (result) => {

      switch (result.status.code) {
        case 200:
          this.setState({
            oldPassword: '',
            oldPasswordErrorMsg: '',
            isOldPasswordIncorrect: false,

            newPassword: '',
            newPasswordErrorMsg: '6-32 characters',
            isNewPasswordIncorrect: false,

            newEmailErrorMsg: '',
            isNewEmailIncorrect: false,
          });
          enqueueSnackbar({
            message: 'Your user data have been updated successfully!',
            options: {
              variant: 'success',
            },
          });
          break;

        default:
          this.setState({
            oldPasswordErrorMsg: (result.user.oldPasswordErrorMsg !== undefined) ? result.user.oldPasswordErrorMsg : '',
            isOldPasswordIncorrect: (result.user.oldPasswordErrorMsg === undefined),

            newPasswordErrorMsg: (result.user.newPasswordErrorMsg !== undefined) ? result.user.newPasswordErrorMsg : '6-32 characters',
            isNewPasswordIncorrect: (result.user.newPasswordErrorMsg === undefined),

            newEmail: (result.user.newEmail !== undefined) ? result.user.newEmail : newEmail,
            newEmailErrorMsg: (result.user.newEmailErrorMsg !== undefined) ? result.user.newEmailErrorMsg : '',
            isNewEmailIncorrect: (result.user.newEmailErrorMsg === undefined),
          });
          break;
      }
    });
  };

  handleSubmitCloseAccount = () => {
    const {
      enqueueSnackbar,
      history,
      closeAccount,
    } = this.props;
    const { closeAccountPassword } = this.state;
    fetchCloseAccount({ ...this.props, closeAccountPassword }, (result) => {
      switch (result.status.code) {
        case 200:

          closeAccount();
          history.push('/');
          break;
        case 409:
          enqueueSnackbar({
            message: 'Your password was not correct.',
            options: {
              variant: 'error',
            },
          });
          break;
        default:
          enqueueSnackbar({
            message: 'This should not happen. Please contact system admin.',
            options: {
              variant: 'error',
            },
          });
          break;
      }
    });
  };

  render() {
    const { classes } = this.props;
    const {
      editSelf,
      oldPassword,
      newPassword,
      newEmail,
      isNewEmailIncorrect,
      newPasswordErrorMsg,
      closeAccountPassword,
      isNewPasswordIncorrect,
      isOldPasswordIncorrect,
      oldPasswordErrorMsg,
      newEmailErrorMsg,
      openCloseAccount,
    } = this.state;
    return (
      <div className={classes.root}>
        <MuiThemeProviderUI theme={lightTheme}>
          <Grid container justify="center">
            <Grid item sm={12} md={8} lg={6}>
              <Grid
                container
                justify="center"
                spacing={16}
                elevation={2}
                direction="column"
              >
                <Grid container spacing={16}>
                  <Grid item sm={12} md={12} lg={12}>
                    <Typography variant="h4" component="h3">Edit Account</Typography>
                    <Typography component="p" className={classes.headline}>
                      {'Here you can edit your profile and/or add additional information. To really know it is you updating your profile, please type in your current password.'}
                      <br />
                    </Typography>
                  </Grid>
                  <Grid item sm={12} md={12} lg={12}>
                    <FormControl required error={isOldPasswordIncorrect}>
                      <InputLabel>Old Password</InputLabel>
                      <Input
                        id="oldPasswordInput"
                        type="password"
                        startAdornment={(
                          <InputAdornment position="start">
                            <PasswordIcon />
                          </InputAdornment>
                        )}
                        value={oldPassword}
                        onChange={this.handleInputChange}
                      />
                      <FormHelperText>
                        <em>
                          {oldPasswordErrorMsg}
                        </em>
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item sm={12} md={12} lg={12}>
                    <Divider />
                    <Typography component="p" className={classes.headline}>
                      {' The following information is needed to log in and will not be shown on your profile page.'}
                      <br />
                    </Typography>
                    <FormControl error={isNewPasswordIncorrect}>
                      <InputLabel>New Password</InputLabel>
                      <Input
                        id="newPasswordInput"
                        type="password"
                        startAdornment={(
                          <InputAdornment position="start">
                            <PasswordIcon />
                          </InputAdornment>
                        )}
                        value={newPassword}
                        onChange={this.handleInputChange}
                      />
                      <FormHelperText>
                        <em>
                          {newPasswordErrorMsg}
                        </em>
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item sm={12} md={12} lg={12}>
                    <FormControl error={isNewEmailIncorrect}>
                      <InputLabel>E-Mail</InputLabel>
                      <Input
                        id="newEmailInput"
                        type="email"
                        startAdornment={(
                          <InputAdornment position="start">
                            <EMailIcon />
                          </InputAdornment>
                        )}
                        value={newEmail}
                        onChange={this.handleInputChange}
                      />
                      <FormHelperText>
                        <em>
                          {newEmailErrorMsg}
                        </em>
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item sm={12} md={12} lg={12}>
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                      {'Update Profile'}
                    </Button>
                  </Grid>
                </Grid>
                {editSelf ? (
                  <Grid container>
                    <Grid item lg={12}>
                      <Typography variant="h4" component="h3">
                        <br />
                        {'Close Account'}
                      </Typography>
                      <Typography component="p" className={classes.headline}>
                        {'You want to leave us? That is okay, we promise :( But keep in mind that we will not be able to restore your data at any point.'}
                        <br />
                      </Typography>
                    </Grid>
                    <Grid item sm={12} md={12} lg={12}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.handleClickOpenCloseAccount}
                      >
                        {'Close Account'}
                      </Button>
                    </Grid>
                    <Dialog
                      open={openCloseAccount}
                      onClose={this.handleCloseCloseAccount}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {'Are you really sure?'}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          {'By confirming this dialog message, you agree that we will delete your account without further inspection and that you will not be able to get your data back.'}
                        </DialogContentText>
                        <Input
                          id="closeAccountPasswordInput"
                          type="password"
                          startAdornment={(
                            <InputAdornment position="start">
                              <PasswordIcon />
                            </InputAdornment>
                          )}
                          value={closeAccountPassword}
                          onChange={this.handleInputChange}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleCloseCloseAccount} color="primary">
                          {'Cancel'}
                        </Button>
                        <Button
                          onClick={this.handleSubmitCloseAccount}
                          color="primary"
                          autoFocus
                        >
                          {'OK'}
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                ) : ''}
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
  enqueueSnackbar: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  closeAccount: PropTypes.func.isRequired,
  userID: PropTypes.number.isRequired,
};

export default compose(
  withStyles(styles),
  withRouter,
)(EditAccount);
