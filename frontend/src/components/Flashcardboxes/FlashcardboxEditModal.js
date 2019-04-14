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

  componentWillMount() {
    this.setState({
      fcb_name: this.props.title,
      fcb_description: this.props.description,
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {`Edit Flashcardbox "${this.props.title}"`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {'Please enter a new name and/or a description for your new flashcardbox'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="fcb_name"
            label="Title"
            type="text"
            fullWidth
            value={this.state.fcb_name}
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
            value={this.state.fcb_description}
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
            onClick={() => this.props.handleEdit()}
            color="primary"
          >
            {'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

}

FlashcardboxCreateModal.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};

export default FlashcardboxCreateModal;
