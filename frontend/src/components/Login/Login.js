import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/es/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import PasswordIcon from '@material-ui/icons/Lock';
import UsernameIcon from '@material-ui/icons/Person';
import * as PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';
import Link from 'react-router-dom/es/Link';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  headline: {
    paddingTop: 20,
    paddingBottom: 20,
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

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',

      isInputInvalid: false,
    };
  }

  componentDidMount() {
    document.title = 'Login';
    // Get username from URL
    this.setState({ username: qs.parse(this.props.location.search).username !== undefined ? qs.parse(this.props.location.search).username : '' });
  }

  createNewSnackbar = (variant, message) => {
    this.props.enqueueSnackbar({
      message,
      options: {
        variant,
      },
    });
  };

  // Handles input changes
  handleInputChange = (event) => {

    // Depends on the input field that changed
    switch (event.target.id) {

      case 'username-input':
        this.setState({ username: event.target.value });
        break;

      case 'password-input':
        this.setState({ password: event.target.value });
        break;

      default:
        break;
    }

  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.username, this.state.password);
  };

  render() {
    const { classes, loading } = this.props;

    return (
      <div className={classes.root}>
        <Grid container alignContent="center" justify="center">
          <Grid item xs={12} md={6} lg={4}>
            <Grid
              container
              spacing={16}
              alignItems="stretch"
              justify="space-evenly"
              direction="column"
            >
              <Grid item lg={12}>
                <Typography variant="h3" component="h3" align="center">Login</Typography>
                <Typography
                  component="p"
                  align="center"
                  className={classes.headline}
                >
                  {'... we are glad to see you again!'}
                  <br />
                </Typography>
              </Grid>
              <Grid item sm={12} md={12} lg={12}>
                <FormControl fullWidth required error={false}>
                  <InputLabel>Username or E-Mail</InputLabel>
                  <Input
                    id="username-input"
                    type="text"
                    error={this.state.isInputInvalid}
                    onChange={this.handleInputChange}
                    value={this.state.username}
                    startAdornment={
                      <InputAdornment position="start">
                        <UsernameIcon />
                      </InputAdornment>

                    }
                  />
                  <FormHelperText>
                    <em>Your username, remember: at least 3 characters!</em>
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item sm={12} md={12} lg={12}>
                <FormControl fullWidth required error={false}>
                  <InputLabel>Password</InputLabel>
                  <Input
                    id="password-input"
                    type="password"
                    error={this.state.isInputInvalid}
                    onChange={this.handleInputChange}
                    value={this.state.password}
                    startAdornment={
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>
                    <Link to="/resetpassword">Forgot your password?</Link>
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item sm={12} md={12} lg={12} style={{ alignSelf: 'center' }}>
                <div className={classes.wrapper}>
                  <Button
                    id="login-button"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    onClick={this.handleSubmit}
                  >
                    {'Login'}
                  </Button>
                  {loading
                  && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
              </Grid>
              <Grid item sm={12} md={12} lg={12} style={{ alignSelf: 'center' }}>
                <Typography variant="caption" className={classes.headline}>
                  {'Not registered yet?'}
                  <Link id="create-link" to="/register">Create an account now!</Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Login);

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};
