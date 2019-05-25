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
import Button from '@material-ui/core/Button';
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

class Learning extends Component {

  state = {
    cards: 0,
    correctCards: 0,
    currentCardIndex: 0,
    currentPageIsFront: true,
    currentTitle: 'first title',
    currentPageText: 'frontText',
  };

  componentDidMount = () => {
    document.title = 'Learning';
    if (this.props.cards && this.props.cards[0]) {
      this.setState({
        currentCardIndex: 0,
        currentTitle: this.props.cards[0].title,
        currentPageText: this.props.cards[0].front,
      });
    }
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

  renderDemo = () => {
    const { cards } = this.props;
    return (
      <Card>
        <List>
          {
            cards.map(card => (
              <CardContent key={card.id}>
                <ListItem>
                  <ListItemText primary={card.front} secondary={card.back} />
                  <ListItemSecondaryAction>
                    {card.deck}
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </CardContent>
            ))
          }
        </List>
      </Card>
    );
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
};

Learning.propTypes = {
  classes: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  answerCard: PropTypes.func.isRequired,
};

export default withStyles(styles)(Learning);
