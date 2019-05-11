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

class FlashcardboxEditModal extends Component {

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

    const {
      open,
      handleClose,
      title,
      handleEdit,
      id,
    } = this.props;

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {`Edit Flashcardbox "${title}"`}
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
            onClick={() => handleClose()}
            color="secondary"
          >
            {'Cancel'}
          </Button>
          <Button
            onClick={() => handleEdit({
              flashcardbox: {
                title: this.state.fcb_name,
                description: this.state.fcb_description,
                id,
              },
            })}
            color="primary"
          >
            {'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

}

FlashcardboxEditModal.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};

export default FlashcardboxEditModal;
