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
        <Button onClick={() => {
          let index = 5;
          this.props.editFlashcard({
            title: this.props.flashcards[index].title + 'edit',
            front: this.props.flashcards[index].front + 'edit',
            back: this.props.flashcards[index].back + 'edit',
            id: this.props.flashcards[index].id,
          })
        }}>
          Edit
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
