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

function FlashcardboxUnfollowModal(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {`Stop following flashcardbox "${props.title}"?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {'You will no longer be able to use this shared flashcardbox. Are you sure?'}
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
          onClick={() => props.handleUnfollow()}
          color="primary"
        >
          {'Unfollow'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

FlashcardboxUnfollowModal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleUnfollow: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default FlashcardboxUnfollowModal;
