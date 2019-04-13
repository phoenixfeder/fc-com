import {
  Fab,
  Dialog,
  withStyles,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Icon,
  TextField,
  DialogTitle,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import red from '@material-ui/core/colors/red';
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

/*
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
*/

class FlashcardboxCreateModal extends Component {
  state = {
    open: false,
    fcb_name: '',
    fcb_description: '',
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
      fcb_description: '',
    });
  };

  handleCreate = () => {
    const flashcardbox = {
      flashcardboxes: {
        title: this.state.fcb_name,
        description: this.state.fcb_description,
      },
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
    this.setState({ fcb_name: e.target.value });
  };

  render() {
    const { classes } = this.props;

    return (

      <div>
        <Fab color="primary" aria-label="Add" onClick={this.handleOpen} className={classes.fab}>
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
              {'Please enter a name for your new flashcardbox'}
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
            <Button
              onClick={this.handleClose}
              style={{
                color: 'white',
                backgroundColor: 'grey',
                top: 10,
                right: 5,
              }}
            >
              <Icon className={classNames(classes.icon, 'far fa-times-circle')} />
              {'Cancel'}
            </Button>
            <Button
              onClick={this.handleCreate}
              style={{
                color: 'white',
                backgroundColor: '#039be5',
                top: 10,
                left: 5,
              }}
            >
              <Icon className={classNames(classes.icon, 'far fa-save')} />
              {'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    );
  }

}

FlashcardboxCreateModal.propTypes = {
  classes: PropTypes.object.isRequired,
  createFunc: PropTypes.func.isRequired,
};

export default withStyles(styles)(FlashcardboxCreateModal);
