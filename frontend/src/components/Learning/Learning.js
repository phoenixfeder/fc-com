import {
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles,
} from '@material-ui/core/';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import LearningFinished from './LearningFinished';
import LearningInProgress from './LearningInProgress';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    flexGrow: 1,
  },
  headline: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class Learning extends Component {

  state = {

    cardsLeft: [],
    cardsAnsweredCorrect: [],
    cardsAnsweredIncorrect: [],

    cards: 0,
    correctCards: 0,
    currentCardIndex: 0,
    currentPageIsFront: true,
  };

  componentDidMount = () => {
    document.title = 'Learning';
    this.props.setLearningFinished(false);
    this.setState({
      cardsLeft: this.props.cards,
    });
  };

  render() {
    const { classes, cards } = this.props;
    return (
      <div className={classes.root} id="Decks">
        {
          this.props.finished ?
            <LearningFinished cards={cards} />
            :
            <LearningInProgress cards={cards} answerCard={this.props.answerCard} setLearningFinished={this.props.setLearningFinished}
                                cardsLeft={this.state.cardsLeft}
                                cardsAnsweredCorrect={this.state.cardsAnsweredCorrect}
                                cardsAnsweredIncorrect={this.state.cardsAnsweredIncorrect}
            />
        }
      </div>
    );
  }
}

Learning.propTypes = {
  classes: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  answerCard: PropTypes.func.isRequired,
  setLearningFinished: PropTypes.func.isRequired,
  finished: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Learning);
