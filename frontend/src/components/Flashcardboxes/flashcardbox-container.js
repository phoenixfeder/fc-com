import { connect } from 'react-redux';
import * as actions from '../../actions/flashcardboxes-actions';
import Flashcardbox from './Flashcardbox';

const mapStateToProps = state => ({
  loading: state.flashcardboxes.loading,
  editLoading: state.flashcardboxes.editLoading,
  deleteLoading: state.flashcardboxes.deleteLoading,
  error: state.flashcardboxes.error,
});

const mapDispatchToProps = dispatch => ({
  deleteFlashcardbox: (id) => dispatch(actions.deleteFlashcardbox(id)),
  editFlashcardbox: (flashcardbox) => dispatch(actions.editFlashcardbox(flashcardbox)),
  setFlashcardboxId: (id) => dispatch(actions.setFlashcardboxId(id)),
});

const FlashcardboxContainer = connect(mapStateToProps, mapDispatchToProps)(Flashcardbox);

export default FlashcardboxContainer;
