import Button from '@material-ui/core/Button/Button';
import withStyles from '@material-ui/core/es/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import PasswordIcon from '@material-ui/icons/Lock';
import EMailIcon from '@material-ui/icons/Mail';
import UsernameIcon from '@material-ui/icons/Person';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';

// Styles to design some specific components
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  headline: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

// Initial state as const to reload initial state at any point
const initialState = {
  isUsernameInvalid: false,
  isUsernameTouched: false,
  usernameErrorMsg: '3 - 12 characters',
  isPasswordInvalid: false,
  isPasswordTouched: false,
  passwordErrorMsg: '6 - 32 characters',
  isRepeatPasswordTouched: false,
  isEmailInvalid: false,
  isEmailTouched: false,
  emailErrorMsg: '',

  username: '',
  password: '',
  repeatPassword: '',
  mail: '',

  loading: false,
};

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    document.title = 'Register';
  }

  createNewSnackbar = (variant, message) => {
    this.props.enqueueSnackbar({
      message,
      options: {
        variant,
      },
    });
  };

  wow = () => {

  }

  // Handles input changes
  handleInputChange = (event) => {

    // Depends on the input field that changed
    switch (event.target.id) {

      // Handle user name change
      case 'user-input':

        this.setState({
          username: event.target.value,
          isUsernameInvalid: false,
          usernameErrorMsg: '3 - 12 characters',
        });

        break;

      // Handle password field change
      case 'user-password':

        this.setState({
          password: event.target.value,
          isPasswordInvalid: false,
          passwordErrorMsg: '6 - 32 characters',
          repeatPasswordErrorMsg: '',
        });

        break;

      // Handle password repeat field
      case 'user-password-repeat':

        this.setState({
          repeatPassword: event.target.value,
          isPasswordInvalid: false,
          passwordErrorMsg: '6 - 32 characters',
          repeatPasswordErrorMsg: '',
        });

        break;

      // Handle mail field change
      case 'user-mail-input':

        this.setState({
          mail: event.target.value,
          isEmailInvalid: false,
          emailErrorMsg: '',
        });

        break;

      default:
        // Nothing
        break;
    }

  };

  handleSendResult = (result) => {
    switch (result.status.code) {
      case 200:
        this.createNewSnackbar('success', `Thank you, ${result.register.user.username}, for your registration. We´ve sent a mail to ${result.register.user.email}`);
        this.props.history.push('/login');
        break;
      case 400:
        this.setState({
          isUsernameInvalid: (result.register.messageUsername !== undefined),
          usernameErrorMsg: (result.register.messageUsername !== undefined) ? result.register.messageUsername : '3 - 12 characters',
          isPasswordInvalid: (result.register.messagePassword !== undefined),
          passwordErrorMsg: (result.register.messagePassword !== undefined) ? result.register.messagePassword : '6 - 32 characters',
          isEmailInvalid: (result.register.messageEmail !== undefined),
          emailErrorMsg: (result.register.messageEmail !== undefined) ? result.register.messageEmail : '6 - 32 characters',
        });

        this.createNewSnackbar('error', 'Registration failed: Invalid input');

        break;
      default:
        // do something
        this.createNewSnackbar('error', 'Registration failed: An unexpected error occured. Please contact a system admin');
        break;
    }
  };

  // Handles submit button
  handleSubmit = () => {

    this.setState({ loading: true });

    if (this.state.password !== this.state.repeatPassword) {

      this.setState({
        isPasswordInvalid: true,
        repeatPasswordErrorMsg: 'The password doesn´t match the repeated password',
        loading: false,
      });
      this.createNewSnackbar('error', 'Registration failed: Invalid input');

    } else {
      this.props.fetchRegister(this.state, (result) => {
        this.setState({ loading: false });
        this.handleSendResult(result);
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (

      <div className={classes.root}>
        <Grid container alignContent="center" justify="center">
          <Grid item xs={12} md={8} lg={4}>
            <Grid
              container
              spacing={5}
              alignItems="stretch"
              justify="space-evenly"
              direction="column"
            >
              <Grid item lg={12}>
                <Typography variant="h3" align="center">Register</Typography>
                <Typography
                  variant="body1"
                  align="center"
                  className={classes.headline}
                >
                  {'... at Flashcard Community!'}
                  <br />
                  {'Don´t worry, we do not require unnecessary information :)'}
                  <br />
                </Typography>
              </Grid>
              <Grid item sm={12} md={12} lg={12}>
                <FormControl fullWidth required error={this.state.isUsernameInvalid}>

                  <InputLabel>Username</InputLabel>
                  <Input
                    id="user-input"
                    type="text"

                    startAdornment={
                      <InputAdornment position="start">
                        <UsernameIcon />
                      </InputAdornment>
                    }

                    onChange={this.handleInputChange}
                  />
                  <FormHelperText
                    id="usernameErrorMsgID"
                  >
                    <em>
                      {this.state.usernameErrorMsg}
                    </em>
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item sm={12} md={12} lg={12}>
                <FormControl fullWidth required error={this.state.isPasswordInvalid}>
                  <InputLabel>Password</InputLabel>
                  <Input
                    id="user-password"
                    type="password"
                    startAdornment={
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    }
                    onChange={this.handleInputChange}
                  />
                  <FormHelperText id="passwordErrorMsgID">
                    <em>
                      {this.state.passwordErrorMsg}
                    </em>
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item sm={12} md={12} lg={12}>
                <FormControl fullWidth required error={this.state.isPasswordInvalid}>
                  <InputLabel>Repeat password</InputLabel>
                  <Input
                    id="user-password-repeat"
                    type="password"
                    startAdornment={
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    }
                    onChange={this.handleInputChange}
                  />
                  <FormHelperText id="repeatPasswordErrorMsgID">
                    <em>
                      {this.state.repeatPasswordErrorMsg}
                    </em>
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item sm={12} md={12} lg={12}>
                <FormControl fullWidth required error={this.state.isEmailInvalid}>
                  <InputLabel>E-Mail</InputLabel>
                  <Input
                    id="user-mail-input"
                    type="email"
                    startAdornment={
                      <InputAdornment position="start">
                        <EMailIcon />
                      </InputAdornment>
                    }
                    onChange={this.handleInputChange}
                  />
                  <FormHelperText
                    id="emailErrorMsgID"
                  >
                    <em>
                      {this.state.emailErrorMsg}
                    </em>
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item sm={6} md={6} lg={6} style={{ alignSelf: 'center' }}>
                <Button
                  id="register-button"
                  variant="contained"
                  color="primary"
                  disabled={this.state.loading}
                  onClick={this.handleSubmit}
                >
                  {'Register now!'}
                </Button>
              </Grid>
              <Grid item sm={12} md={12} lg={12} style={{ alignSelf: 'center' }}>
                <Typography variant="caption" className={classes.headline}>
                  {'Got an account already?'}
                  <Link id="link-login" to="/login">Sign in!</Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

    );
  }
}

export default compose(
  withStyles(styles),
  withRouter,
)(Register);

Register.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  fetchRegister: PropTypes.func.isRequired,
};
