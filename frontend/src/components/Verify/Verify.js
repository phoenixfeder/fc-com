import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/es/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EMailIcon from '@material-ui/icons/Mail';
import * as PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
  fetchNewVerifyToken,
  fetchVerify,
} from '../../actions/register-actions';

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

class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenOutdated: false,
      email: '',
      emailErrorMsg: 'The E-Mail you used for registration.',
      isEmailInvalid: false,
      loading: false,
    };
  }

  componentDidMount() {
    document.title = 'Verify';
    const parameters = qs.parse(window.location.search);

    fetchVerify(parameters, (result) => {
      switch (result.status.code) {
        case 200:
          this.props.enqueueSnackbar({
            message: 'You are now able to login! Enjoy!',
            options: {
              variant: 'success',
            },
          });
          this.props.history.push(`/login?username=${result.register.user.username}`);
          break;

        case 401:
          this.setState({ tokenOutdated: true });
          this.props.enqueueSnackbar({
            message: 'Something went wrong - visit the FAQ page for more help.',
            options: {
              variant: 'error',
            },
          });
          break;
        case 402:
          document.title = 'Request new token';
          this.props.enqueueSnackbar({
            message: 'Your token has expired',
            options: {
              variant: 'error',

            },
          });
          this.setState({ tokenOutdated: true });
          break;

        // Should not be thrown by user
        case 501:
        case 502:
          this.props.enqueueSnackbar({
            message: 'Sorry, this should not happen. You possibly visited an unknown site.',
            options: {
              variant: 'error',
            },
          });
          this.props.history.push('/');
          break;

        default:
          this.props.history.push('/');
          break;

      }
    });

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
    fetchNewVerifyToken(this.state, (result) => {
      switch (result.status.code) {
        case 200:
          this.props.enqueueSnackbar({
            message: 'We resend your validation token :)',
            options: {
              variant: 'success',
            },
          });
          this.setState({ loading: false });
          this.props.history.push('/');
          break;

        case 403:
          this.props.enqueueSnackbar({
            message: 'Please enter the mail you used for our registration',
            options: {
              variant: 'error',
            },
          });

          this.setState({
            loading: false,
            emailErrorMsg: 'Please enter the mail you used for our registration',
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
            <Paper elevation={1}>
              <Grid
                container
                spacing={16}
                alignItems="center"
                justify="center"
                style={{ minHeight: '100px' }}
                direction="column"
              >
                <Grid item lg={12} style={{ textAlign: 'center' }}>
                  {!this.state.tokenOutdated ? (
                    <div>
                      <Typography
                        component="p"
                        align="center"
                        className={classes.headline}
                      >
                        {'We are validating your registration - please wait!'}
                      </Typography>
                      <CircularProgress className={classes.progress} />
                    </div>
                  ) : (
                    <div>
                      <Typography
                        component="p"
                        align="center"
                        className={classes.headline}
                      >
                        {'Woops, it seems like your token is outdated. Resend it now!'}
                      </Typography>
                      <FormControl
                        fullWidth
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
                      <div className={classes.wrapper}>
                        <Button
                          id="resend-button"
                          variant="contained"
                          color="primary"
                          disabled={this.state.loading}
                          onClick={this.handleSubmit}
                        >
                          {'Resend token now!'}
                        </Button>
                        {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                      </div>
                    </div>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Verify.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), withRouter)(Verify);
