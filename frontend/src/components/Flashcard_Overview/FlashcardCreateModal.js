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

class FlashcardCreateModal extends Component {
  state = {
    front: '',
    back: '',
    title: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const {
      boxId,
      open,
      handleClose,
      createFlashcard,
    } = this.props;

    return (
      <div>
        <Dialog open={open}>
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
              multiline
              rows={4}
              rowsMax={8}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleClose()}
              color="secondary"
            >
              {'Cancel'}
            </Button>
            <Button
              onClick={() => {
                const flashcard = {
                  title: this.state.title,
                  front: this.state.front,
                  back: this.state.back,
                };
                createFlashcard(flashcard, boxId);
                handleClose();
              }}
              color="primary"
            >
              {'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }


}

FlashcardCreateModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  createFlashcard: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  boxId: PropTypes.number.isRequired,
};

export default FlashcardCreateModal;
