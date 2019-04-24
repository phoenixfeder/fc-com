import { connect } from 'react-redux';
import * as actions from '../../actions/flashcards-actions';

const mapStateToProps = state => ({
  loading: state.flashcards.loading,
  editLoading: state.flashcards.editLoading,
  deleteLoading: state.flashcards.deleteLoading,
  error: state.flashcards.error,
});

const mapDispatchToProps = dispatch => ({
  deleteFlashcard: (id) => dispatch(actions.deleteFlashcard(id)),
  editFlashcard: (flashcard) => dispatch(actions.editFlashcard(flashcard)),
});

const FlashcardOverviewContainer = connect(mapStateToProps, mapDispatchToProps)(FlashcardOverview);

export default FlashcardOverviewContainer;
