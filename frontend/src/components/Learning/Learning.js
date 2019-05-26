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
    cards: 0,
    correctCards: 0,
    currentCardIndex: 0,
    currentPageIsFront: true,
    currentTitle: 'first title',
    currentPageText: 'frontText',
    finished: false,
  };

  componentDidMount = () => {
    document.title = 'Learning';
    this.props.setLearningFinished(false);
  };

  handleAnswer = (correct) => {
    this.props.answerCard({
      id: this.props.cards[this.state.currentCardIndex].id,
      correct,
    });
    this.setState(
      {
        cards: this.state.cards + 1,
        correctCards: this.state.correctCards + correct,
        currentCardIndex: this.state.currentCardIndex + 1,
      },
      () => {
        if (this.state.currentCardIndex >= this.props.cards.length) {
          console.log('done');
        } else {
          this.setState({
            currentTitle: this.props.cards[this.state.currentCardIndex].title,
            currentPageText: this.props.cards[this.state.currentCardIndex].front,
            currentPageIsFront: true,
          });
        }
      });

  };

  handleTurnAround = () => {
    if (this.state.currentPageIsFront) {
      this.setState({
        currentPageText: this.props.cards[this.state.currentCardIndex].back,
        currentPageIsFront: false,
      });
    } else {
      this.setState({
        currentPageText: this.props.cards[this.state.currentCardIndex].front,
        currentPageIsFront: true,
      });
    }
  };

  render() {
    const { classes, cards } = this.props;
    return (
      <div className={classes.root} id="Decks">
        {
          this.props.finished ?
            <LearningFinished cards={cards} />
            :
            <LearningInProgress cards={cards} answerCard={this.props.answerCard} setLearningFinished={this.props.setLearningFinished} />
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
