import { connect } from 'react-redux';
import * as actions from '../../actions/flashcards-actions';
import FlashcardOverview from './FlashcardOverview';

const mapStateToProps = state => {
  console.log(state);
  return (
    {
      loading: state.flashcardsOverview.loading,
      createLoading: state.flashcardsOverview.createLoading,
      editLoading: state.flashcardsOverview.editLoading,
      deleteLoading: state.flashcardsOverview.deleteLoading,
      error: state.flashcardsOverview.error,
      flashcards: state.flashcardsOverview.flashcards,
    });
};


const mapDispatchToProps = dispatch => ({
  createFlashcard: (flashcard) => dispatch(actions.createFlashcard(flashcard)),
  deleteFlashcard: (flashcardId) => dispatch(actions.deleteFlashcard(flashcardId)),
  editFlashcard: (flashcard) => dispatch(actions.editFlashcard(flashcard)),
  getFlashcards: (boxId) => dispatch(actions.getFlashcards(boxId)),
});

const FlashcardOverviewContainer = connect(mapStateToProps, mapDispatchToProps)(FlashcardOverview);

export default FlashcardOverviewContainer;
