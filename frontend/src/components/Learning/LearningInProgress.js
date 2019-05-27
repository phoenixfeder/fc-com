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
    cards: 0,
    correctCards: 0,
    currentCardIndex: 0,
    currentPageIsFront: true,
    currentTitle: 'first title',
    currentPageText: 'frontText',
    currentCard: {},
  };

  componentDidMount = () => {
    document.title = 'Learning';
    console.log("did mount in progress");
    if (this.props.cards && this.props.cards[0]) {
      this.setState({
        currentCardIndex: 0,
        currentTitle: this.props.cards[0].title,
        currentPageText: this.props.cards[0].front,
        currentCard: {},
      });
    }
    console.log(this.props.cardsLeft);
    if (this.props.cardsLeft && this.props.cardsLeft[0]) {
      this.setNextCard();
    }
  };

  handleAnswer = (correct) => {
    this.props.answerCard({
      id: this.state.currentCard.id,
      correct,
    });
    this.setState(
      {
        cards: this.state.cards + 1,
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

  setNextCard = () => {
    console.log("Setting");
    console.log(this.props.cardsLeft);
    this.setState({
      currentPageIsFront: true,
      currentCard: this.props.cardsLeft[this.props.cardsLeft.length - 1],
      currentTitle: this.props.cardsLeft[this.props.cardsLeft.length - 1].title,
      currentPageText: this.props.cardsLeft[this.props.cardsLeft.length - 1].text,
    });
  };

  handleTurnAround = () => {
    if (this.state.currentPageIsFront) {
      this.setState({
        currentPageText: this.state.currentCard.back,
        currentPageIsFront: false,
      });
    } else {
      this.setState({
        currentPageText: this.state.currentCard.front,
        currentPageIsFront: true,
      });
    }
  };

  render() {
    const { classes, cards } = this.props;
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
              <Flashcard flashcard={{
                title: this.state.currentTitle,
                text: this.state.currentPageText,
              }} />

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
              className={'Paper'}
              style={{
                width: '15%',
                verticalAlign: 'top',
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '2%',
              }}>
              {`Cards in Box: ${cards.length}`}
              <br />
              {`Cards answered: ${this.state.cards}`}
              <br />
              {`Correct: ${this.state.correctCards}`}
              {' (' + (this.state.cards ? (Math.round((100 * this.state.correctCards / this.state.cards) * 100) / 100) : 0) + '%)'}

              <br />
              {`Incorrect: ${this.state.cards - this.state.correctCards}`}
              {' (' + (this.state.cards ? (Math.round((100 * (this.state.cards - this.state.correctCards) / this.state.cards) * 100) / 100) : 0) + '%)'}
            </div>
          </div>
        </Grid>
      </div>
    );
  }

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
