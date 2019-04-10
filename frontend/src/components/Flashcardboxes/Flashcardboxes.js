import {
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core/';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Flashcardbox from './Flashcardbox';

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
  infoChipSuccess: {
    margin: theme.spacing.unit / 2,
    backgroundColor: '#43a047',
  },
  infoChip: {
    margin: theme.spacing.unit / 2,
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

  renderCards = () => {
    const cards = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 30; i++) {
      const successRate = Math.floor(Math.random() * Math.floor(100));
      const amountCards = Math.floor(Math.random() * Math.floor(1000));
      cards.push((
        <Grid item xs={6} md={4} lg={3} key={i}>
          <Flashcardbox
            title="Title"
            amount={amountCards}
            successRate={successRate}
            description="Im a description of a very cool flashcardbox and my author made me extra long for testing purposes only."
          />
        </Grid>
      ));
    }
    return cards;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} id="Flashcardboxes">
        <Grid container >
          <Grid item lg={12} className={classes.headline}>
            <Typography variant="h3" align="center">
              {'My Flashcardboxes'}
            </Typography>
          </Grid>
          <Grid container direction="row" justify="space-evenly" spacing={16}>
            { this.renderCards() }
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
