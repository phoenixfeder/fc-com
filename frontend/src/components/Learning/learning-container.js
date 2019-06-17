import { connect } from 'react-redux';
import {
  answerCard,
  setLearningFinished,
} from '../../actions/learning-actions';
import Learning from './Learning';

const mapStateToProps = state => ({
  loading: state.learning.loading,
  answerLoading: state.learning.answerLoading,
  cards: state.learning.cards,
  cardsLeft: state.learning.cardsLeft,
  error: state.learning.error,
  finished: state.learning.learningFinished,
});

const mapDispatchToProps = dispatch => ({
  answerCard: (card) => dispatch(answerCard(card)),
  setLearningFinished: (finished) => dispatch(setLearningFinished(finished)),
});

const LearningContainer = connect(mapStateToProps, mapDispatchToProps)(Learning);

export default LearningContainer;
