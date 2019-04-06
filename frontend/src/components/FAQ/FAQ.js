import { ListItem } from '@material-ui/core';
import { Grid, Paper, Typography, withStyles } from '@material-ui/core/';
import List from '@material-ui/core/List';
import * as PropTypes from 'prop-types';
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

class FAQ extends Component {
  componentDidMount() {
    document.title = 'FAQ';
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
                <Typography variant="h3" align="center">Friendly Asked Questions</Typography>
                <Typography variant="body1" align="center">Here you will be able to find answers to a lot of possible
                  questions!</Typography>
              </Grid>
              <Grid item lg={12}>
                <List>
                  <ListItem>
                    <Typography variant="body1"><b>Will this application be available for free?</b>
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1">Yes! We intend to help you learn as good and fast as you
                      can. So restricting your access is no possible option.</Typography>
                  </ListItem>

                  <ListItem>
                    <Typography variant="body1"><b>Will my grade improve by using the application?</b>
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1">We try to help you improve your grade. However we can not
                      guarantee any improvements. It all depends on your commitment.</Typography>
                  </ListItem>

                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

FAQ.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FAQ);
