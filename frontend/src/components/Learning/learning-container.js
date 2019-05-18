import { connect } from 'react-redux';
import Learning from './Learning';
import { answerCard } from '../../actions/learning-actions';

const mapStateToProps = state => ({
  loading: state.learning.loading,
  answerLoading: state.learning.answerLoading,
  cards: state.learning.cards,
  error: state.learning.error,
});

const mapDispatchToProps = dispatch => ({
  answerCard: (card) => dispatch(answerCard(card)),
});

const LearningContainer = connect(mapStateToProps, mapDispatchToProps)(Learning);

export default LearningContainer;
