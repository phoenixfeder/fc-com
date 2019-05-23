import { connect } from 'react-redux';
import SelectCards from './SelectCards';
import { setLearningCards } from '../../actions/learning-actions';
import { getFlashcardboxes } from '../../actions/flashcardboxes-actions';

const mapStateToProps = state => ({
  loading: state.learning.loading,
  boxesLoading: state.flashcardboxes.loading,
  boxes: state.flashcardboxes.boxes,
  error: state.learning.error,
});

const mapDispatchToProps = dispatch => ({
  getFlashcardboxes: () => dispatch(getFlashcardboxes()),
  setLearningCards: (decks) => dispatch(setLearningCards(decks)),
});

const SelectCardsContainer = connect(mapStateToProps, mapDispatchToProps)(SelectCards);

export default SelectCardsContainer;
