import { connect } from 'react-redux';
import Learning from './Learning';
import {
  answerCard,
  setLearningFinished,
} from '../../actions/learning-actions';

const mapStateToProps = state => ({
  loading: state.learning.loading,
  answerLoading: state.learning.answerLoading,
  cards: state.learning.cards,
  error: state.learning.error,
  finished: state.learning.learningFinished,
});

const mapDispatchToProps = dispatch => ({
  answerCard: (card) => dispatch(answerCard(card)),
  setLearningFinished: (finished) => dispatch(setLearningFinished(finished)),
});

const LearningContainer = connect(mapStateToProps, mapDispatchToProps)(Learning);

export default LearningContainer;
