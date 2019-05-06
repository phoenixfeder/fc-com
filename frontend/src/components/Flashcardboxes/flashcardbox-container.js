import { connect } from 'react-redux';
import * as actions from '../../actions/flashcardboxes-actions';
import Flashcardbox from './Flashcardbox';

const mapStateToProps = state => ({
  loading: state.flashcardboxes.loading,
  editLoading: state.flashcardboxes.editLoading,
  deleteLoading: state.flashcardboxes.deleteLoading,
  shareLoading: state.flashcardboxes.shareLoading,
  error: state.flashcardboxes.error,
});

const mapDispatchToProps = dispatch => ({
  deleteFlashcardbox: (id) => dispatch(actions.deleteFlashcardbox(id)),
  editFlashcardbox: (flashcardbox) => dispatch(actions.editFlashcardbox(flashcardbox)),
  setFlashcardboxId: (id) => dispatch(actions.setFlashcardboxId(id)),
  setFlashcardboxTitle: (title) => dispatch(actions.setFlashcardboxTitle(title)),
  shareFlashcardbox: (user, boxId) => dispatch(actions.shareFlashcardbox(user, boxId)),
  stopShareFlashcardbox: (user, boxId) => dispatch(actions.stopShareFlashcardbox(user, boxId)),
});

const FlashcardboxContainer = connect(mapStateToProps, mapDispatchToProps)(Flashcardbox);

export default FlashcardboxContainer;
