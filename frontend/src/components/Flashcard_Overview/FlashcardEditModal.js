import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class FlashcardEditModal extends Component {

  state = {
    front: '',
    back: '',
    title: '',
  };

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (nextState && nextProps && nextProps.flashcard && nextProps.flashcard.id !== this.props.flashcard.id) {
      nextState.front = nextProps.flashcard.front;
      nextState.back = nextProps.flashcard.back;
      nextState.title = nextProps.flashcard.title;
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <Dialog open={this.props.open}>
          <DialogContent>
            <DialogContentText>
              {'Please enter a title and the texts for front- and backpage'}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              value={this.state.title}
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="front"
              label="Front-Text"
              type="text"
              fullWidth
              multiline
              value={this.state.front}
              rows={4}
              rowsMax={8}
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="back"
              label="Back-Text"
              type="text"
              fullWidth
              value={this.state.back}
              multiline
              rows={4}
              rowsMax={8}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.props.handleClose()}
              color="secondary"
            >
              {'Cancel'}
            </Button>
            <Button
              onClick={() => {
                const editedFlashcard = {
                  title: this.state.title,
                  front: this.state.front,
                  back: this.state.back,
                  id: this.props.flashcard.id,
                };
                this.props.editFlashcard(editedFlashcard);
                this.props.handleClose();
              }}
              color="primary"
            >
              {'Safe'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

}

FlashcardEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  flashcard: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  editFlashcard: PropTypes.func.isRequired,
};

export default FlashcardEditModal;
