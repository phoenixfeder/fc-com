import {
  Grid,
  Typography,
  withStyles,
  Fab,
} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Flashcardbox from './flashcardbox-container';
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
});

class Flashcardboxes extends Component {

  state = {
    createOpen: false,
  };

  componentWillMount() {
    this.props.getFlashcardboxes();
  }

  componentDidMount() {
    document.title = 'Flashcardboxes';
  }

  createDialogOpen = () => {
    this.setState({ createOpen: true });
  };

  createDialogClose = () => {
    this.setState({ createOpen: false });
  };

  handleCreate = (flashcardbox) => {
    this.props.createFlashcardbox(flashcardbox);
    this.createDialogClose();
  };

  renderCards = () => (
    <Grid container direction="row" justify="space-evenly" spacing={16}>
      {
        this.props.boxes.map(box => (
          <Grid item xs={6} md={4} lg={3} key={box.id}>
            <Flashcardbox
              id={box.id}
              title={box.title}
              amount={box.flashcards}
              lastchanged={box.lastchanged}
              created={box.created}
              description={box.description}
              history={this.props.history}
            />
          </Grid>
        ))
      }
    </Grid>
  );

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
          { this.renderCards() }
          <Grid item xs={12} md={12} lg={12} align="center" style={{ paddingTop: '12px' }}>
            <Fab color="primary" aria-label="Add" onClick={() => this.createDialogOpen()}>
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
        <FlashcardboxCreateModal
          open={this.state.createOpen}
          handleCreate={this.handleCreate}
          handleClose={this.createDialogClose}
        />
      </div>
    );
  }

}

Flashcardboxes.propTypes = {
  classes: PropTypes.object.isRequired,
  getFlashcardboxes: PropTypes.func.isRequired,
  boxes: PropTypes.array.isRequired,
  createFlashcardbox: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(Flashcardboxes);
