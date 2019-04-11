import {
  Button,
  Dialog,
  Grid,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  },
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class FlashcardboxCreateModal extends Component {
  state = {
    open: false,
    fcb_name: '',
  };

  componentWillMount() {
  }

  componentDidMount() {
    document.title = 'Flashcardboxes';
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
  }

  handleClose = () => {
    this.setState({
      open: false,
      fcb_name: '',
    });
  };

  handleCreate = () => {
    console.log('Created' + this.state.fcb_name);
    this.setState({
      open: false,
      fcb_name: '',
    });
  };

  handleOpen = () => {
    this.setState({
      open: true,
      fcb_name: '',
    });
  };

  handleChange = (e) => {
    this.setState({ fcb_name: e.target.value });
  };

  render() {
    const { classes } = this.props;

    return (

      <div>
        <Button variant="outlined" color="primary" onClick={this.handleOpen}>
          <Icon className={classNames(classes.icon, 'fas fa-plus')} />Open Modal
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create new FlashCardBox</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new flashcardbox
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="name"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} style={{
              color: 'white',
              backgroundColor: 'grey',
              top: 10,
              right: 5,
            }}>
              <Icon className={classNames(classes.icon, 'far fa-times-circle')} />Cancel
            </Button>
            <Button onClick={this.handleCreate} style={{
              color: 'white',
              backgroundColor: '#039be5',
              top: 10,
              left: 5,
            }}>
              <Icon className={classNames(classes.icon, 'far fa-save')} />Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    );
  }

}

FlashcardboxCreateModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlashcardboxCreateModal);
