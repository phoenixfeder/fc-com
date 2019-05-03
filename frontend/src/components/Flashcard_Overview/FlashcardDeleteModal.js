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
        {'Delete Flashcards?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {'All cards will be deleted and can not be restored. Are you sure?'}
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
            props.handleDelete();
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
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default FlashcardDeleteModal;
