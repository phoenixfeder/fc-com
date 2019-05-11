import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Clear,
  Add,
} from '@material-ui/icons';

class FlashcardboxShareModal extends Component {
  state = {
    username: '',
  }

  handleChange = event => {
    const username = event.target.value;
    this.setState({ username });
  }

  renderAddSharedUser = () => (
    <DialogContent>
      <DialogContentText>
        {'Enter a username who you want to share the box with:'}
      </DialogContentText>
      <TextField
        id="user-field"
        label="Username"
        value={this.state.username}
        onChange={this.handleChange}
      />
      <IconButton onClick={() => this.props.handleShare(this.state.username)}>
        <Add />
      </IconButton>
    </DialogContent>
  )

  renderSharedUsers = (users) => (
    <DialogContent>
      <DialogContentText>
        {'Currently you share this box with:'}
      </DialogContentText>
      <List>
        {users.map(user => (
          <ListItem key={user.id}>
            <ListItemText primary={user.username} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => this.props.handleStopShare(this.state.username)}>
                <Clear />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </DialogContent>
  )

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {'Share Flashcardbox'}
        </DialogTitle>
        {this.renderAddSharedUser()}
        { this.renderSharedUsers([{ username: 'fred', id: 4 }, { username: 'jürgen', id: 2 }, { username: 'Hans-Peter', id: 6 }]) }
        <DialogActions>
          <Button
            onClick={() => {
              this.props.handleClose();
            }}
          >
            {'Close'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

}

FlashcardboxShareModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
  handleStopShare: PropTypes.func.isRequired,
};

export default FlashcardboxShareModal;
