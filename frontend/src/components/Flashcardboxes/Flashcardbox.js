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
  FileCopy,
  SentimentDissatisfied,
  SentimentSatisfiedAlt,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FlashcardboxDeleteModal from './FlashcardboxDeleteModal';
import FlashcardboxEditModal from './FlashcardboxEditModal';

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

class Flashcardbox extends Component {

  state = {
    deleteOpen: false,
    editOpen: false,
  };

  deleteDialogClose = () => {
    this.setState({ deleteOpen: false });
  };

  deleteDialogOpen = () => {
    this.setState({ deleteOpen: true });
  };

  editDialogClose = () => {
    this.setState({ editOpen: false });
  };

  editDialogOpen = () => {
    this.setState({ editOpen: true });
  };

  handleDelete = () => {
    this.props.deleteFlashcardbox(this.props.id);
    this.deleteDialogClose();
  };

  handleEdit = (flashcardbox) => {
    this.props.editFlashcardbox(flashcardbox);
    this.editDialogClose();
  };

  handleEditFlashcards() {
    this.props.setFlashcardboxId(this.props.id);
    this.props.setFlashcardboxTitle(this.props.title);
    this.props.history.push('/flashcards');
  }

  render() {

    const { classes } = this.props;

    let successChip = <Chip
      label={`${this.props.successRate}% correct`}
      className={classes.infoChipSuccess}
      icon={<SentimentSatisfiedAlt />}
      color="primary"
    />;
    if (this.props.successRate <= 50) {
      successChip = <Chip
        label={`${this.props.successRate}% correct`}
        className={classes.infoChip}
        icon={<SentimentDissatisfied />}
        color="secondary"
      />;
    }

    return (
      <div>
        <Card>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {`Flashcardbox, created ${new Date(this.props.created).toLocaleString()}`}
            </Typography>
            <Typography variant="h5" component="h2">
              {this.props.title}
            </Typography>
            <Typography component="p">
              {this.props.description}
            </Typography>
            {successChip}
            <Chip
              label={`${this.props.amount} cards`}
              className={classes.infoChip}
              icon={<FileCopy />}
              color="primary"
            />
          </CardContent>
          <CardActions disableActionSpacing>
            <Button size="medium" onClick={() => this.handleEditFlashcards()}>Edit Flashcards</Button>
            <div
              style={{
                width: '100%',
                textAlign: 'right',
              }}
            >
              <IconButton
                aria-label="Edit Flashcardbox"
                onClick={() => this.editDialogOpen()}
                disabled={this.props.editLoading}
              >
                <Edit />
              </IconButton>
              <IconButton
                aria-label="Delete Flashcardbox"
                onClick={() => this.deleteDialogOpen()}
                disabled={this.props.deleteLoading}
              >
                <Delete />
              </IconButton>
            </div>
          </CardActions>
        </Card>
        <FlashcardboxDeleteModal
          title={this.props.title}
          open={this.state.deleteOpen}
          handleDelete={this.handleDelete}
          handleClose={this.deleteDialogClose}
        />
        <FlashcardboxEditModal
          title={this.props.title}
          description={this.props.description}
          open={this.state.editOpen}
          handleEdit={this.handleEdit}
          handleClose={this.editDialogClose}
          id={this.props.id}
        />
      </div>
    );
  }

}

Flashcardbox.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  successRate: PropTypes.string,
  created: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  deleteFlashcardbox: PropTypes.func.isRequired,
  editFlashcardbox: PropTypes.func.isRequired,
  editLoading: PropTypes.bool.isRequired,
  deleteLoading: PropTypes.bool.isRequired,
  setFlashcardboxId: PropTypes.func.isRequired,
  setFlashcardboxTitle: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

Flashcardbox.defaultProps = {
  successRate: '-',
};

export default withStyles(styles)(Flashcardbox);
