import {
  Grid,
  Paper,
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
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class Home extends Component {
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
              spacing={16}
              className={classes.paper}
              component={Paper}
              elevation={2}
              direction="column"
            >
              <Grid item lg={12}>
                <Typography variant="h3" align="center">Home Page</Typography>
              </Grid>
              <Grid item lg={12}>
                <Typography variant="body1" align="center">
                  {'Im currently just a placeholder. Soon there will be more to see!'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
