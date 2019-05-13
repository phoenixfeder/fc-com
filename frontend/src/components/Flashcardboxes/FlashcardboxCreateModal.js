import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class FlashcardboxCreateModal extends Component {
  state = {
    fcb_name: '',
    fcb_description: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {

    const { open, handleClose, handleCreate } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleCreateClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create new FlashCardBox</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {'Please enter a name and a description for your new flashcardbox'}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="fcb_name"
              label="Title"
              type="text"
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="fcb_description"
              label="Description"
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
                const flashcardbox = {
                  title: this.state.fcb_name,
                  description: this.state.fcb_description,
                };
                handleCreate(flashcardbox);
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

FlashcardboxCreateModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default FlashcardboxCreateModal;
