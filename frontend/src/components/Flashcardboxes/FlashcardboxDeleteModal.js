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

function FlashcardboxDeleteModal(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {`Delete Flashcardbox "${props.title}"?`}
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
          onClick={() => props.handleDelete()}
          color="primary"
        >
          {'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

FlashcardboxDeleteModal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default FlashcardboxDeleteModal;
