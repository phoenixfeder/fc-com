import {
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core/';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Graphs from './graphs-container';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    flexGrow: 1,
  },
  headline: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  text: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
});

class Dashboard extends Component {
  componentDidMount() {
    document.title = 'Home';
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item sm={12} md={8} lg={6}>
            <Grid
              container
              justify="center"
              spacing={5}
              elevation={2}
              direction="row"
            >
              <Grid item xs={12}>
                <Typography variant="h3" align="center">
                  {`Welcome ${this.props.username}!`}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  {'Glad to see you again! As you are now logged in, you have now access to your flashcardboxes and are able to learn!'}
                </Typography>
              </Grid>
              <Graphs />
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
};

export default withStyles(styles)(Dashboard);
