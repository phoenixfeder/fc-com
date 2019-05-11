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
import EMailIcon from '@material-ui/icons/Mail';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { resetPassword } from '../../actions/auth-actions';

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

class ResetPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailErrorMsg: 'The E-Mail you used for registration.',
      isEmailInvalid: false,
      loading: false,
    };
  }

  handleMailChange = (event) => {
    this.setState({
      email: event.target.value,
      emailErrorMsg: 'The E-Mail you used for registration.',
      isEmailInvalid: false,
    });
  };

  handleSubmit = () => {
    this.setState({ loading: true });
    resetPassword(this.state.email, (result) => {
      console.log(result);
      switch (result.status.code) {
        case 200:
          this.props.enqueueSnackbar({
            message: 'We send you an email to reset your password!',
            options: {
              variant: 'success',
            },
          });
          this.setState({ loading: false });
          this.props.history.push('/');
          break;
        case 403:
          this.props.enqueueSnackbar({
            message: 'Your email is invalid',
            options: {
              variant: 'error',
            },
          });
          this.setState({
            loading: false,
            emailErrorMsg: 'Please enter the correct email',
            isEmailInvalid: true,
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
            emailErrorMsg: 'error',
            isEmailInvalid: true,
          });
          break;
      }
    });
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
              alignItems="center"
              justify="center"
              style={{ minHeight: '100px' }}
              direction="column"
            >
              <Grid item lg={12} style={{ textAlign: 'center' }}>
                <div align="center">
                  <Typography
                    component="p"
                    align="center"
                    className={classes.headline}
                  >
                    {'You forgot your Password?'}
                    <br />
                    {'Enter the Email you used for your registration and we will let you reset your password!'}
                  </Typography>
                  <FormControl
                    required
                    error={this.state.isEmailInvalid}
                  >
                    <InputLabel>E-Mail</InputLabel>
                    <Input
                      id="user-mail-input"
                      type="email"
                      value={this.state.email}
                      startAdornment={
                        <InputAdornment position="start">
                          <EMailIcon />
                        </InputAdornment>
                      }
                      onChange={this.handleMailChange}
                    />
                    <FormHelperText id="mail-error-field">
                      <em>
                        {this.state.emailErrorMsg}
                      </em>
                    </FormHelperText>
                  </FormControl>
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
                      {'Reset password!'}
                    </Button>
                    {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withStyles(styles)(ResetPassword);
