import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class FlashcardboxCreateModal extends Component {
  state = {
    open: false,
    fcb_name: '',
    fcb_description: '',
  };

  handleClose = () => {
    this.setState({
      open: false,
      fcb_name: '',
      fcb_description: '',
    });
  };

  handleCreate = () => {
    const flashcardbox = {
      title: this.state.fcb_name,
      description: this.state.fcb_description,
    };
    this.props.createFunc(flashcardbox);
    this.setState({
      open: false,
      fcb_name: '',
      fcb_description: '',
    });
  };

  handleOpen = () => {
    this.setState({
      open: true,
      fcb_name: '',
      fcb_description: '',
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <Fab color="primary" aria-label="Add" onClick={this.handleOpen}>
          <AddIcon />
        </Fab>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
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
              onClick={this.handleClose}
              color="secondary"
            >
              {'Cancel'}
            </Button>
            <Button
              onClick={this.handleCreate}
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
  createFunc: PropTypes.func.isRequired,
};

export default FlashcardboxCreateModal;
