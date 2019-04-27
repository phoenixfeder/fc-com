import {
  Button,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class FlashcardOverview extends Component {
  componentDidMount() {
    this.props.getFlashcards(1);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.renderCards()}
        <Button onClick={() => {
          this.props.createFlashcard({
            title: 'createdTitle',
            front: 'createdFront',
            back: 'createdBack',
          })
        }}>
          create
        </Button>
      </div>
    );
  }

  renderCards = () => (
    <Grid container direction="row" justify="space-evenly" spacing={16}>
      {
        this.props.flashcards.map(flashcard => (
          <Grid item xs={6} md={4} lg={3} key={flashcard.id}>
            Title: {flashcard.title}
            <br />
            front: {flashcard.front}
            <br />
            back: {flashcard.back}
            <br />
            id: {flashcard.id}
          </Grid>
        ))
      }
    </Grid>
  );
}

FlashcardOverview.propTypes = {
  flashcards: PropTypes.array.isRequired,
  getFlashcards: PropTypes.func.isRequired,
  createFlashcard: PropTypes.func.isRequired,
  deleteFlashcard: PropTypes.func.isRequired,
  editFlashcard: PropTypes.func.isRequired,
};

export default FlashcardOverview;
