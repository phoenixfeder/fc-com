import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

function FlashcardDeleteModal(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {`Delete Flashcard "${props.title}"?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {'This card will be deleted and can not be restored. Are you sure?'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => props.handleClose()}
          color="secondary"
        >
          {'Cancel'}
        </Button>
        <Button
          onClick={() => {
            props.handleDelete(props.id);
            props.handleClose();
          }}
          color="primary"
        >
          {'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

FlashcardDeleteModal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default FlashcardDeleteModal;
