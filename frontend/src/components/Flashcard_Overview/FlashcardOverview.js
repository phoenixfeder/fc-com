import {
  Button,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FlashcardCard from './FlashcardCard';
import FlashcardCreateModal from './FlashcardCreateModal';

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

class FlashcardOverview extends Component {

  state = {
    createOpen: false,
  };

  componentDidMount() {
    this.props.getFlashcards(this.props.boxId);
  }

  handleCreateClose() {
    this.setState({ createOpen: false });
  }

  renderCards = () => (
    <Grid container direction="row" justify="space-evenly" spacing={16}>
      {
        this.props.flashcards.map(flashcard => (
          <Grid item xs={6} md={4} lg={3} key={flashcard.id}>
            <FlashcardCard
              flashcard={flashcard}
              deleteFlashcard={this.props.deleteFlashcard}
              editFlashcard={this.props.editFlashcard}
              editLoading={this.props.editLoading}
              deleteLoading={this.props.deleteLoading}
            />
          </Grid>
        ))
      }
    </Grid>
  );

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid item lg={12} className={classes.headline}>
          <Typography variant="h3" align="center">
            {this.props.boxTitle}
          </Typography>
        </Grid>
        {this.renderCards()}
        <FlashcardCreateModal
          handleClose={() => this.handleCreateClose()}
          createFlashcard={this.props.createFlashcard}
          open={this.state.createOpen}
          boxId={this.props.boxId}
        />
        <Button onClick={() => {
          this.setState({ createOpen: true });
        }}
        >
          {'Create'}
        </Button>
      </div>
    );
  }

}

FlashcardOverview.propTypes = {
  flashcards: PropTypes.array.isRequired,
  getFlashcards: PropTypes.func.isRequired,
  createFlashcard: PropTypes.func.isRequired,
  deleteFlashcard: PropTypes.func.isRequired,
  deleteLoading: PropTypes.bool.isRequired,
  editFlashcard: PropTypes.func.isRequired,
  editLoading: PropTypes.bool.isRequired,
  boxId: PropTypes.number.isRequired,
  boxTitle: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlashcardOverview);
