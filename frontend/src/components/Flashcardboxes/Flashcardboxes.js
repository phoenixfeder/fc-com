import {
  Grid,
  Paper,
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

class Flashcardboxes extends Component {
  state = {
  };

  componentWillMount() {
  }

  componentDidMount() {
    document.title = 'Flashcardboxes';
  }

  renderCards = () => {
    const { classes } = this.props;
    const cards = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 30; i++) {
      const successRate = Math.floor(Math.random() * Math.floor(100));
      const amountCards = Math.floor(Math.random() * Math.floor(1000));
      let successChip = <Chip label={`${successRate}% correct`} className={classes.infoChipSuccess} icon={<SentimentSatisfiedAlt />} color="primary" />;
      if (successRate <= 50) {
        successChip = <Chip label={`${successRate}% correct`} className={classes.infoChip} icon={<SentimentDissatisfied />} color="secondary" />;
      }
      cards.push((
        <Grid item xs={6} md={4} lg={3} key={i}>
          <Card>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {'Flashcardbox'}
              </Typography>
              <Typography variant="h5" component="h2">
                {'Title'}
              </Typography>
              <Typography component="p">
                {'Im a description of a very cool flashcardbox and my author made me extra long for testing purposes only.'}
              </Typography>
              { successChip }
              <Chip label={`${amountCards} cards`} className={classes.infoChip} icon={<FileCopy />} color="primary" />
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
        </Grid>
      ));
    }
    return cards;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} id="Flashcardboxes">
        <Grid container justify="center">
          <Grid item lg={12} className={classes.headline}>
            <Typography variant="h3" align="center">
              {'My Flashcardboxes'}
            </Typography>
          </Grid>
          <Grid container direction="row" justify="space-evenly" spacing={16}>
            {this.renderCards()}
          </Grid>
        </Grid>
      </div>
    );
  }

}

Flashcardboxes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Flashcardboxes);
