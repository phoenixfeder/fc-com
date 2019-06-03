import {
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core/';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    flexGrow: 1,
  },
  headline: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  text: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
});

class Dashboard extends Component {
  componentDidMount() {
    document.title = 'Home';
  }

  componentWillMount = () => {
    this.props.getStatistics();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item sm={12} md={8} lg={6}>
            <Grid
              container
              justify="center"
              spacing={16}
              elevation={2}
              direction="column"
            >
              <Grid item lg={12}>
                <Typography variant="h3" align="center" className={classes.text}>
                  {`Welcome ${this.props.username}!`}
                </Typography>
              </Grid>
              <Grid item lg={12}>
                <Typography variant="body1" className={classes.text}>
                  {'Hi there! There! There!'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  getStatistics: PropTypes.func.isRequired,
};

export default withStyles(styles)(Dashboard);
