import {
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {
  Add,
  Edit,
} from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FlashcardCreateModal from './FlashcardCreateModal';
import FlashcardDeleteModal from './FlashcardDeleteModal';
import FlashcardEditModal from './FlashcardEditModal';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(2),
    flexGrow: 1,
  },
  headline: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});

class FlashcardOverview extends Component {

  state = {
    createOpen: false,
    editOpen: false,
    deleteOpen: false,
    flashcardToEdit: {
      front: '',
      back: '',
      title: '',
    },
    flashcardIndicesToDelete: [],
  };

  componentDidMount() {
    const { boxId, history, getFlashcards } = this.props;
    if (boxId === 0) {
      history.push('/boxes');
    } else {
      getFlashcards(boxId);
    }
  }

  setDeleteFlashcards(flashcardIndicesToDelete) {
    this.setState({
      flashcardIndicesToDelete: flashcardIndicesToDelete.data,
      deleteOpen: true,
    });
  }

  editDialogOpen = (flashcard) => {
    this.setState({
      editOpen: true,
      flashcardToEdit: flashcard,
    });
  };

  getCardData = () => {
    const { flashcards, editLoading } = this.props;
    return (
      flashcards.map(flashcard => (
        [
          flashcard.title, flashcard.front, flashcard.back, `${(flashcard.successRate + Math.random() * 10)} %`,
          (
            <IconButton
              aria-label="Edit Flashcardbox"
              onClick={() => this.editDialogOpen(flashcard)}
              disabled={editLoading}
            >
              <Edit />
            </IconButton>
          ),
        ]
      ))
    );
  }
  ;

  handleCreateClose() {
    this
      .setState({ createOpen: false });
  }

  handleDeleteClose() {
    this.setState({ deleteOpen: false });
  }

  handleDeleteFlashcards() {
    const { flashcards, deleteFlashcard } = this.props;
    const flashcardsToDelete = [];
    this.state.flashcardIndicesToDelete.forEach(index => {
      flashcardsToDelete.push(flashcards[index.dataIndex]);
    });
    flashcardsToDelete.forEach((flashcard) => {
      deleteFlashcard(flashcard.id);
    });
  }

  handleEditClose() {
    this.setState({ editOpen: false });
  }

  render() {
    const {
      classes,
      boxTitle,
      createFlashcard,
      boxId,
      editFlashcard,
      createLoading,
    } = this.props;

    const columns = ['Title', 'Front', 'Back', 'Success-Rate', ' '];

    const options = {
      filterType: 'multiselect',
      responsive: 'scroll',
      elevation: 0,
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 20, 50],
      download: false,
      print: false,
      onRowsDelete: ((flashcardsToDelete) => {
        this.setDeleteFlashcards(flashcardsToDelete);
      }),
      customToolbar: (() => (
        <Tooltip title="Create new Flashcard">
          <IconButton
            className={classes.iconButton}
            disabled={createLoading}
            onClick={() => {
              this.setState({ createOpen: true });
            }}
          >
            <Add />
          </IconButton>
        </Tooltip>
      )),
    };

    return (
      <div>
        <Grid item lg={12} className={classes.headline}>
          <Typography variant="h3" align="center">
            {boxTitle}
          </Typography>
        </Grid>

        <MUIDataTable
          title="Flashcards"
          data={this.getCardData()}
          columns={columns}
          options={options}
        />

        <FlashcardCreateModal
          handleClose={() => this.handleCreateClose()}
          createFlashcard={createFlashcard}
          open={this.state.createOpen}
          boxId={boxId}
        />

        <FlashcardEditModal
          open={this.state.editOpen}
          flashcard={this.state.flashcardToEdit}
          handleClose={() => this.handleEditClose()}
          editFlashcard={editFlashcard}
        />
        <FlashcardDeleteModal open={this.state.deleteOpen} handleClose={() => this.handleDeleteClose()} handleDelete={() => this.handleDeleteFlashcards()} />
      </div>
    );
  }

}

FlashcardOverview.propTypes = {
  flashcards: PropTypes.array.isRequired,
  getFlashcards: PropTypes.func.isRequired,
  createFlashcard: PropTypes.func.isRequired,
  deleteFlashcard: PropTypes.func.isRequired,
  editFlashcard: PropTypes.func.isRequired,
  editLoading: PropTypes.bool.isRequired,
  createLoading: PropTypes.bool.isRequired,
  boxId: PropTypes.number.isRequired,
  boxTitle: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlashcardOverview);
