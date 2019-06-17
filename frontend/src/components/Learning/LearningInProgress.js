import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Flashcard from '../Flashcard/Flashcard';

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

class LearningInProgress extends Component {

  state = {
    cardsAnswered: 0,
    correctCards: 0,
    currentCardIndex: 0,
    currentPageIsFront: true,
  };

  componentDidMount = () => {
    document.title = 'Learning';
  };

  getNumberOfCards = () => this.props.cardsAnsweredCorrect.length + this.props.cardsAnsweredIncorrect.length + this.props.cardsLeft.length;

  getNumberOfCardsAnswered = () => this.props.cardsAnsweredCorrect.length + this.props.cardsAnsweredIncorrect.length;

  getNumberOfCardsAnsweredCorrectly = () => this.props.cardsAnsweredCorrect.length;

  getNumberOfCardsAnsweredIncorrectly = () => this.props.cardsAnsweredIncorrect.length;

  getProportionOfCardsAnsweredCorrectly = () => (this.getNumberOfCardsAnswered() ? (Math.round((100 * this.getNumberOfCardsAnsweredCorrectly() / this.getNumberOfCardsAnswered()) * 100) / 100) : 0);

  getProportionOfCardsAnsweredIncorrectly = () => (this.getNumberOfCardsAnswered() ? (Math.round((100 * (this.getNumberOfCardsAnsweredIncorrectly()) / this.getNumberOfCardsAnswered()) * 100) / 100) : 0);

  handleAnswer = (correct) => {
    const { cardsLeft, answerCard } = this.props;
    const currentCard = cardsLeft[cardsLeft.length - 1];

    answerCard({
      id: currentCard.id,
      correct,
    });
    this.setState(
      {
        cardsAnswered: this.state.cardsAnswered + 1,
        correctCards: this.state.correctCards + correct,
        currentCardIndex: this.state.currentCardIndex + 1,
      });

    const answeredCard = this.props.cardsLeft.pop();
    if (correct) {
      this.props.cardsAnsweredCorrect.push({
        ...answeredCard,
        correct,
        deck: (String.fromCharCode(answeredCard.deck.charCodeAt() + (!(answeredCard.deck === 'E')))),
      });
    } else {
      this.props.cardsAnsweredIncorrect.push({
        ...answeredCard,
        correct,
        deck: 'A',
      });
    }
    if (this.props.cardsLeft.length === 0) {
      this.props.setLearningFinished(true);
    } else {
      this.setNextCard();
    }

  };

  handleTurnAround = () => {
    if (this.state.currentPageIsFront) {
      this.setState({
        currentPageIsFront: false,
      });
    } else {
      this.setState({
        currentPageIsFront: true,
      });
    }
  };

  render() {
    const { classes, cardsLeft } = this.props;
    const currentCard = cardsLeft[cardsLeft.length - 1];
    const size = 5;
    return (
      <div className={classes.root} id="Decks">
        <Grid container direction="row" alignItems="stretch" title={"Bla"} justify={'center'} alignContent={'space-around'}>
          <Grid item sm={size} md={size} lg={size}>
            <Typography variant="h3" align="center" style={{marginBottom: 10}}>
              {'Learning'}
            </Typography>
            <Grid item align="center">
              <Flashcard flashcard={currentCard} showFront={this.state.currentPageIsFront} />
            </Grid>
            <div align="center">
              <Button onClick={() => this.handleAnswer(false)}>
                {'Incorrect'}
              </Button>
              <Button onClick={() => this.handleTurnAround()}>
                {'Turn around'}
              </Button>
              <Button onClick={() => this.handleAnswer(true)}>
                {'Correct'}
              </Button>
            </div>
          </Grid>
          <Grid item sm={2} md={2} lg={2}>
            <Paper
              className="Paper"
              style={{
                width: '75%',
                minWidth: '75%',
                verticalAlign: 'top',
                marginLeft: '100%',
                minHeight: 200,
                textAlign: 'left',
              }}
            >
              {`Cards in Box: ${this.getNumberOfCards()}`}
              <br />
              {`Cards answered: ${this.getNumberOfCardsAnswered()}`}
              <br />
              {`Correct: ${this.getNumberOfCardsAnsweredCorrectly()}`}
              {` (${this.getProportionOfCardsAnsweredCorrectly()}%)`}

              <br />
              {`Incorrect: ${this.getNumberOfCardsAnsweredIncorrectly()}`}
              {` (${this.getProportionOfCardsAnsweredIncorrectly()}%)`}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

  setNextCard = () => {
    this.setState({
      currentPageIsFront: true,
      currentCard: this.props.cardsLeft[this.props.cardsLeft.length - 1],
      currentTitle: this.props.cardsLeft[this.props.cardsLeft.length - 1].title,
      currentPageText: this.props.cardsLeft[this.props.cardsLeft.length - 1].text,
    });
  };

}

LearningInProgress.propTypes = {
  classes: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  answerCard: PropTypes.func.isRequired,
  setLearningFinished: PropTypes.func.isRequired,
  cardsLeft: PropTypes.array.isRequired,
  cardsAnsweredCorrect: PropTypes.array.isRequired,
  cardsAnsweredIncorrect: PropTypes.array.isRequired,
};

export default withStyles(styles)(LearningInProgress);
