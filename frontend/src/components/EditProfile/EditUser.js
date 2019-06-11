import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/es/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid/Grid';
import Input from '@material-ui/core/Input/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import CakeIcon from '@material-ui/icons/Cake';
import RealNameIcon from '@material-ui/icons/Face';
import HobbyIcon from '@material-ui/icons/InsertEmoticon';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(2),
    flexGrow: 1,
  },
  headline: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  editProfileEntry: {
    paddingTop: theme.spacing(2),
  },
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class EditUser extends Component {
  state = {

    realName: '',
    isRealNameIncorrect: false,
    realNameErrorMsg: '',

    interest: '',
    isInterestIncorrect: false,
    interestErrorMsg: 'Max 200 characters',

    birthday: '',
    isBirthdayIncorrect: false,
    birthdayErrorMsg: 'You know, a day in the past or are you Marty McFly?',

    hasEditPermission: true,
  };


  componentWillMount() {
    const { enqueueSnackbar, fetchGetAccountData } = this.props;

    fetchGetAccountData(this.props, (result) => {

      switch (result.status.code) {
        case 200:
          this.setState({
            realName: result.user.realName,
            interest: result.user.interest,
            birthday: result.user.birthday,
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

  }

  handleCommit = () => {
    const { enqueueSnackbar, fetchUpdateUser } = this.props;
    fetchUpdateUser({ ...this.props, ...this.state }, (result) => {
      switch (result.status.code) {

        case 200:
          this.setState({
            isRealNameIncorrect: false,
            realNameErrorMsg: '',

            isInterestIncorrect: false,
            interestErrorMsg: 'Max 200 characters',

            isBirthdayIncorrect: false,
            birthdayErrorMsg: 'You know, a day in the past or are you Marty McFly?',
          });

          enqueueSnackbar({
            message: 'Your user data have been updated successfully!',
            options: {
              variant: 'success',
            },
          });
          break;

        default:

          this.setState(prevState => ({
            realName: (result.user.realName !== undefined) ? result.user.realName : prevState.realName,
            realNameErrorMsg: (result.user.realNameErrorMsg !== undefined) ? result.user.realNameErrorMsg : '',
            isRealNameIncorrect: (result.user.realNameErrorMsg === undefined),

            interest: (result.user.interest !== undefined) ? result.user.interest : prevState.interest,
            interestErrorMsg: (result.user.interestErrorMsg !== undefined) ? result.user.interestErrorMsg : 'Max 200 characters',
            isInterestIncorrect: (result.user.interestErrorMsg === undefined),

            birthday: (result.user.birthday !== undefined) ? result.user.birthday : prevState.birthday,
            birthdayErrorMsg: (result.user.birthdayErrorMsg !== undefined) ? result.user.birthdayErrorMsg : 'You know, a day in the past or are you Marty McFly?',
            isBirthdayIncorrect: (result.user.birthdayErrorMsg === undefined),
          }));
          enqueueSnackbar({
            message: 'Failed: Your input was invalid.',
            options: {
              variant: 'error',
            },
          });
          break;
      }
    });
  };

  handleValueChange = (event) => {
    switch (event.target.id) {
      case 'date-input':
        this.setState({ birthday: event.target.value, isBirthdayIncorrect: false });
        break;
      case 'interest-input':
        this.setState({ interest: event.target.value, isInterestIncorrect: false });
        break;
      case 'realName-input':
        this.setState({ realName: event.target.value, isRealNameIncorrect: false });
        break;
      default:
        break;
    }
  };

  render() {
    const { classes, loading } = this.props;
    return (
      <div className={classes.root}>

        <Grid container justify="center">
          <Grid item sm={12} md={8} lg={6}>
            <Grid
              container
              justify="center"
              spacing={5}
              elevation={2}
              direction="column"
            >
              {this.state.hasEditPermission ? (
                <Grid container spacing={5}>
                  <Grid item sm={12} md={12} lg={12}>
                    <Typography variant="h4" component="h3">
                      {'Edit User'}
                    </Typography>
                    <Typography component="p" className={classes.headline}>
                      {'Here you can edit your profile and/or add additional information. To really know it is you updating your profile, please type in your current password.'}
                      <br />
                    </Typography>
                  </Grid>
                  <Grid item sm={12} md={12} lg={12}>
                    <Divider />
                    <Typography component="p" className={classes.headline}>
                      {'Those information will be displayed on your profile, but are not needed and not providingthose information will not lead to any disadvantages.'}
                      <br />
                    </Typography>
                    <FormControl required={false} error={this.state.isRealNameIncorrect}>
                      <InputLabel>Real Name</InputLabel>
                      <Input
                        id="realName-input"
                        type="text"
                        startAdornment={
                          <InputAdornment position="start">
                            <RealNameIcon />
                          </InputAdornment>
                        }
                        value={this.state.realName}
                        onChange={this.handleValueChange}
                      />
                      <FormHelperText>
                        <em>
                          {this.state.realNameErrorMsg}
                        </em>
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item sm={12} md={12} lg={12}>
                    <FormControl required={false} error={this.state.isInterestIncorrect}>
                      <InputLabel>Interest</InputLabel>
                      <Input
                        id="interest-input"
                        multiline
                        rowsMax="4"
                        type="text"
                        startAdornment={
                          <InputAdornment position="start">
                            <HobbyIcon />
                          </InputAdornment>
                        }
                        value={this.state.interest}
                        onChange={this.handleValueChange}
                      />
                      <FormHelperText>
                        <em>
                          {this.state.interestErrorMsg}
                        </em>
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item sm={12} md={12} lg={12}>
                    <FormControl required={false} error={this.state.isBirthdayIncorrect}>
                      <InputLabel>Date of birth</InputLabel>
                      <Input
                        id="date-input"
                        type="date"
                        startAdornment={
                          <InputAdornment position="start">
                            <CakeIcon />
                          </InputAdornment>
                        }
                        value={this.state.birthday}
                        onChange={this.handleValueChange}
                      />
                      <FormHelperText>
                        <em>
                          {this.state.birthdayErrorMsg}
                        </em>
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item sm={12} md={12} lg={12}>
                    <Button variant="contained" color="primary" onClick={this.handleCommit} disabled={loading}>
                      {'Update Profile'}
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Grid item sm={12} md={12} lg={12}>
                  <Typography variant="h4" component="h3">
                    {'Edit User'}
                  </Typography>
                  <Typography component="p" className={classes.headline}>
                    {'You do not have the permission to edit this user'}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

EditUser.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  fetchGetAccountData: PropTypes.func.isRequired,
  fetchUpdateUser: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
};

export default withStyles(styles)(EditUser);
