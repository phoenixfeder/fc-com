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
});

class Flashcardboxes extends Component {

  componentWillMount() {
    this.props.getFlashcardboxes(this.props.auth);
  }

  componentDidMount() {
    document.title = 'Flashcardboxes';
  }

  renderCards = () => {
    this.props.boxes.map(box => (
      <Grid item xs={6} md={4} lg={3} key={box.id}>
        <Flashcardbox
          id={box.id}
          title={box.title}
          amount={box.flashcards}
          lastchanged={box.lastchanged}
          created={box.created}
          description={box.description}
        />
      </Grid>
    ));
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
  getFlashcardboxes: PropTypes.func.isRequired,
  boxes: PropTypes.array.isRequired,
};

export default withStyles(styles)(Flashcardboxes);
