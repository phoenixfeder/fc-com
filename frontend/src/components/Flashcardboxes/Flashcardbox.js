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

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {

    const { classes } = this.props;

    let successChip = <Chip label={`${this.props.successRate}% correct`} className={classes.infoChipSuccess} icon={<SentimentSatisfiedAlt />} color="primary" />;
    if (this.props.successRate <= 50) {
      successChip = <Chip label={`${this.props.successRate}% correct`} className={classes.infoChip} icon={<SentimentDissatisfied />} color="secondary" />;
    }

    return (
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
            <IconButton aria-label="Share">
              <Edit />
            </IconButton>
            <IconButton aria-label="Edit Flashcardbox">
              <Delete />
            </IconButton>
          </div>
        </CardActions>
      </Card>
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
};

Flashcardbox.defaultProps = {
  successRate: '-',
};

export default withStyles(styles)(Flashcardbox);
