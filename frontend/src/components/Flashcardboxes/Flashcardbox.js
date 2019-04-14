import {
  Chip,
  Typography,
  withStyles,
  Card,
  CardActions,
  CardContent,
  Button,
  IconButton,
} from '@material-ui/core/';
import {
  FileCopy,
  SentimentSatisfiedAlt,
  SentimentDissatisfied,
  Edit,
  Delete,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FlashcardboxDeleteModal from './FlashcardboxDeleteModal';
import FlashcardboxEditModal from './FlashcardboxEditModal';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    flexGrow: 1,
  },
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
  }

  handleDelete = () => {
    this.props.deleteFlashcardbox(this.props.id);
    this.setState({ deleteOpen: false });
  };

  deleteDialogOpen = () => {
    this.setState({ deleteOpen: true });
  }

  deleteDialogClose = () => {
    this.setState({ deleteOpen: false });
  }

  handleEdit = (flashcardbox) => {
    this.props.editFlashcardbox(flashcardbox);
    this.setState({ editOpen: false });
  };

  editDialogOpen = () => {
    this.setState({ editOpen: true });
  }

  editDialogClose = () => {
    this.setState({ editOpen: false });
  }

  render() {

    const { classes } = this.props;

    let successChip = <Chip label={`${this.props.successRate}% correct`} className={classes.infoChipSuccess} icon={<SentimentSatisfiedAlt />} color="primary" />;
    if (this.props.successRate <= 50) {
      successChip = <Chip label={`${this.props.successRate}% correct`} className={classes.infoChip} icon={<SentimentDissatisfied />} color="secondary" />;
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
              { this.props.title }
            </Typography>
            <Typography component="p">
              { this.props.description }
            </Typography>
            {successChip}
            <Chip label={`${this.props.amount} cards`} className={classes.infoChip} icon={<FileCopy />} color="primary" />
          </CardContent>
          <CardActions disableActionSpacing>
            <Button size="medium">Learn</Button>
            <div style={{ width: '100%', textAlign: 'right' }}>
              <IconButton
                aria-label="Edit Flashcardbox"
                onClick={() => this.editDialogOpen()}
              >
                <Edit />
              </IconButton>
              <IconButton
                aria-label="Delete Flashcardbox"
                onClick={() => this.deleteDialogOpen()}
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
};

Flashcardbox.defaultProps = {
  successRate: '-',
};

export default withStyles(styles)(Flashcardbox);
