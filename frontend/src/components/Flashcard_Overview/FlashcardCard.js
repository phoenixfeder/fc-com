import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Typography,
  withStyles,
} from '@material-ui/core/';
import {
  Delete,
  Edit,
  SentimentDissatisfied,
  SentimentSatisfiedAlt,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FlashcardDeleteModal from './FlashcardDeleteModal';
import FlashcardEditModal from './FlashcardEditModal';

const styles = theme => ({
  headline: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  infoChipSuccess: {
    margin: theme.spacing.unit / 2,
    backgroundColor: '#43a047',
  },
  infoChip: {
    margin: theme.spacing.unit / 2,
  },
});

class FlashcardCard extends Component {
  state = {
    deleteOpen: false,
    editOpen: false,
  };

  handleEditClose() {
    console.log(this);
    this.setState({ editOpen: false });
  }

  handleDeleteClose() {
    console.log(this);
    this.setState({ deleteOpen: false });
  }

  render() {
    const { flashcard, classes } = this.props;

    let successChip = <Chip
      label={`${flashcard.successRate}% correct`}
      className={classes.infoChipSuccess}
      icon={<SentimentSatisfiedAlt />}
      color="primary"
    />;
    if (flashcard.successRate <= 50) {
      successChip = <Chip
        label={`${flashcard.successRate}% correct`}
        className={classes.infoChip}
        icon={<SentimentDissatisfied />}
        color="secondary"
      />;
    }

    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {flashcard.title}
            </Typography>
            {successChip}
          </CardContent>
          <CardActions disableActionSpacing>
            <div
              style={{
                width: '100%',
                textAlign: 'right',
              }}
            >
              <IconButton
                aria-label="Edit Flashcard"
                onClick={() => {
                  this.setState({ editOpen: true });
                }}
                disabled={this.props.editLoading}
              >
                <Edit />
              </IconButton>

              <IconButton
                aria-label="Delete Flashcard"
                onClick={() => {
                  this.setState({ deleteOpen: true });
                }}
                disabled={this.props.deleteLoading}
              >
                <Delete />
              </IconButton>
            </div>
          </CardActions>
        </Card>
        <FlashcardEditModal
          open={this.state.editOpen}
          flashcard={flashcard}
          handleClose={() => this.handleEditClose()}
          editFlashcard={this.props.editFlashcard}
        />
        <FlashcardDeleteModal
          title={flashcard.title}
          id={flashcard.id}
          open={this.state.deleteOpen}
          handleClose={() => this.handleDeleteClose()}
          handleDelete={this.props.deleteFlashcard}
        />
      </div>
    );
  }
}

FlashcardCard.propTypes = {
  classes: PropTypes.object.isRequired,
  flashcard: PropTypes.object.isRequired,
  deleteFlashcard: PropTypes.func.isRequired,
  editFlashcard: PropTypes.func.isRequired,
  editLoading: PropTypes.bool.isRequired,
  deleteLoading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(FlashcardCard);
