import {
  Button,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FlashcardCreateModal from './FlashcardCreateModal';
import FlashcardDeleteModal from './FlashcardDeleteModal';
import FlashcardEditModal from './FlashcardEditModal';

class FlashcardOverview extends Component {

  state = {
    createOpen: false,
    editOpen: false,
    deleteOpen: false,
  };

  componentDidMount() {
    this.props.getFlashcards(this.props.boxId);
  }

  handleCreateClose() {
    console.log(this);
    this.setState({ createOpen: false });
  }

  handleEditClose() {
    console.log(this);
    this.setState({ editOpen: false });
  }

  handleDeleteClose() {
    console.log(this);
    this.setState({ deleteOpen: false });
  }

  renderCards = () => (
    <Grid container direction="row" justify="space-evenly" spacing={16}>
      {
        this.props.flashcards.map(flashcard => (
          <Grid item xs={6} md={4} lg={3} key={flashcard.id}>
            Id: {flashcard.id}
            <br />
            Title: {flashcard.title}
            <br />
            Front: {flashcard.front}
            <br />
            Back: {flashcard.back}

            <FlashcardEditModal
              open={this.state.editOpen}
              flashcard={flashcard}
              handleClose={() => this.handleEditClose()}
              editFlashcard={this.props.editFlashcard}
            />
            <Button onClick={() => {
              this.setState({ editOpen: true });
            }}
            >
              {'Edit'}
            </Button>

            <FlashcardDeleteModal
              title={flashcard.title}
              id={flashcard.id}
              open={this.state.deleteOpen}
              handleClose={() => this.handleDeleteClose()}
              handleDelete={this.props.deleteFlashcard}
            />
            <Button onClick={() => {
              this.setState({ deleteOpen: true });
            }}
            >
              {'Delete'}
            </Button>
          </Grid>
        ))
      }
    </Grid>
  );

  render() {
    return (
      <div>
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
  editFlashcard: PropTypes.func.isRequired,
  boxId: PropTypes.number.isRequired,
};

export default FlashcardOverview;
