import { withStyles } from '@material-ui/core/';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import LearningFinished from './LearningFinished';
import LearningInProgress from './LearningInProgress';

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

class Learning extends Component {

  state = {
    cardsLeft: [],
    cardsAnsweredCorrect: [],
    cardsAnsweredIncorrect: [],
  };

  componentWillMount = () => {
    document.title = 'Learning';
    this.props.setLearningFinished(false);
    this.setState({
      cardsLeft: this.props.cards,
      cardsAnsweredInorrect: this.props.cards,    //TODO: remove after development
    });

  };

  render() {
    const { classes, cards } = this.props;
    return (
      <div className={classes.root} id="Decks">
        {
          this.props.finished //TODO: remove !
            ?
            <LearningFinished cardsAnsweredCorrect={this.state.cardsAnsweredCorrect}
                              cardsAnsweredIncorrect={this.state.cardsAnsweredIncorrect} />
            :
            <LearningInProgress
              cards={cards}
              answerCard={this.props.answerCard}
              setLearningFinished={this.props.setLearningFinished}
              cardsLeft={this.props.cardsLeft}
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
  cardsLeft: PropTypes.array.isRequired,
  answerCard: PropTypes.func.isRequired,
  setLearningFinished: PropTypes.func.isRequired,
  finished: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Learning);
