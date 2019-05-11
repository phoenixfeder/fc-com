import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/es/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import PasswordIcon from '@material-ui/icons/Lock';
import * as PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';
import { submitNewPassword } from '../../actions/auth-actions';

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
    paddingBottom: 20,
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

class SetNewPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      repeatPassword: '',
      passwordErrorMsg: '6 - 32 characters',
      isPasswordInvalid: false,
      repeatPasswordErrorMsg: '6 - 32 characters',
      isRepeatPasswordInvalid: false,
      loading: false,
      parameters: {},
    };
  }

  componentDidMount() {
    const parameters = qs.parse(this.props.location.search);
    this.setState({ parameters });
  }

  handleStateChange = (event) => {
    if (event.target.id === 'user-password-input') {
      this.setState({
        password: event.target.value,
        passwordErrorMsg: '6 - 32 characters',
        isPasswordInvalid: false,
      });
    } else if (event.target.id === 'user-repeat-password-input') {
      this.setState({
        repeatPassword: event.target.value,
        repeatPasswordErrorMsg: '6 - 32 characters',
        isRepeatPasswordInvalid: false,
      });
    }
  };

  handleSubmit = () => {
    this.setState({ loading: true });
    if (this.state.password === this.state.repeatPassword) {
      submitNewPassword(this.state, (result) => {
        switch (result.status.code) {
          case 200:
            this.props.enqueueSnackbar({
              message: 'You successfully set your new password. Try it out now!',
              options: {
                variant: 'success',
              },
            });
            this.setState({ loading: false });
            this.props.history.push('/login');
            break;
          case 500:
            this.props.enqueueSnackbar({
              message: 'Your password is not valid.',
              options: {
                variant: 'error',
              },
            });
            this.setState({
              isPasswordInvalid: true,
              isRepeatPasswordInvalid: true,
              loading: false,
            });
            break;
          default:
            this.props.enqueueSnackbar({
              message: 'Something went wrong - visit the FAQ page for more help.',
              options: {
                variant: 'error',
              },
            });
            this.setState({
              loading: false,
            });
            break;
        }
      });
    } else {
      this.setState({
        repeatPasswordErrorMsg: 'Does not match password',
        isRepeatPasswordInvalid: true,
        loading: false,
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
              spacing={16}
              alignItems="stretch"
              justify="space-evenly"
              direction="column"
            >
              <Grid item lg={12} style={{ textAlign: 'center' }}>
                <Typography
                  component="p"
                  align="center"
                  className={classes.headline}
                >
                  {'Type in your new password here'}
                </Typography>
              </Grid>
              <Grid item lg={12} style={{ textAlign: 'center' }}>
                <FormControl
                  required
                  error={this.state.isPasswordInvalid}
                >
                  <InputLabel>Password</InputLabel>
                  <Input
                    id="user-password-input"
                    type="password"
                    value={this.state.password}
                    startAdornment={
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    }
                    onChange={this.handleStateChange}
                  />
                  <FormHelperText id="mail-error-field">
                    <em>
                      {this.state.passwordErrorMsg}
                    </em>
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item lg={12} style={{ textAlign: 'center' }}>
                <FormControl
                  required
                  error={this.state.isRepeatPasswordInvalid}
                >
                  <InputLabel>Repeat Password</InputLabel>
                  <Input
                    id="user-repeat-password-input"
                    type="password"
                    value={this.state.repeatPassword}
                    startAdornment={
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    }
                    onChange={this.handleStateChange}
                  />
                  <FormHelperText id="repeat-password-error-field">
                    <em>
                      {this.state.repeatPasswordErrorMsg}
                    </em>
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item lg={12} style={{ textAlign: 'center' }}>
                <div
                  className={classes.wrapper}
                  style={{
                    alignItems: 'center',
                    alignContent: 'center',
                    display: 'block',
                  }}
                  align="center"
                  justify="center"
                >
                  <Button
                    id="resend-button"
                    variant="contained"
                    color="primary"
                    disabled={this.state.loading}
                    onClick={this.handleSubmit}
                    align="center"
                    justify="center"
                  >
                    {'Submit your new password!'}
                  </Button>
                  {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SetNewPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default withStyles(styles)(SetNewPassword);
