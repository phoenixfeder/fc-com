import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Flashcard from '../Flashcard/Flashcard';

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
      this.props.cardsAnsweredCorrect.push(answeredCard);
    } else {
      this.props.cardsAnsweredIncorrect.push(answeredCard);
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
    return (
      <div className={classes.root} id="Decks">
        <Grid container justify="center">
          <Grid item lg={12} className={classes.headline}>
            <Typography variant="h3" align="center">
              {'Learning'}
            </Typography>
          </Grid>
          <div style={{
            verticalAlign: 'top',
            display: 'flex',
            flexDirection: 'row',
            width: '90%',
            marginLeft: '5%',
            marginRight: '5%',
          }}>

            <div
              align="center"
              style={{
                width: '65%',
                verticalAlign: 'top',
                display: 'flex',
                marginRight: '5%',
                marginLeft: '15%',
                flexDirection: 'column',
              }}>
              <Grid xs={12} sm={12} md={12} lg={12} xl={12} fullWidth>
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
            </div>

            <div
              className="Paper"
              style={{
                width: '15%',
                verticalAlign: 'top',
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '2%',
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
            </div>
          </div>
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
