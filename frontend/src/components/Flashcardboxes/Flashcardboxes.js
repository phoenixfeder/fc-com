import {
  Grid,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core/';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FlashcardboxCreateModal from './FlashcardboxCreateModal';

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


class Flashcardboxes extends Component {
  state = {
  };

  componentWillMount() {
  }

  componentDidMount() {
    document.title = 'Flashcardboxes';
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} id="Flashcardboxes">
        <Grid container justify="center">
          <Grid item sm={12} md={8} lg={6}>
            <Grid
              container
              justify="center"
              alignContent="center"
              spacing={16}
              className={classes.paper}
              component={Paper}
              elevation={2}
              direction="column"
            >
              <Grid item lg={12}>
                <Typography variant="h3" align="center">My Flashcardboxes</Typography>
                <FlashcardboxCreateModal/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

}

Flashcardboxes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Flashcardboxes);
