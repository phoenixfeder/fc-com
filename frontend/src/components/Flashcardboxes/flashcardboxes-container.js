import { connect } from 'react-redux';
import * as actions from '../../actions/flashcardboxes-actions';
import Flashcardboxes from './Flashcardboxes';

const mapStateToProps = state => ({
  getLoading: state.flashcardboxes.loading,
  createLoading: state.flashcardboxes.createLoading,
  boxes: state.flashcardboxes.boxes,
  error: state.flashcardboxes.error,
});

const mapDispatchToProps = dispatch => ({
  getFlashcardboxes: () => dispatch(actions.getFlashcardboxes()),
  createFlashcardbox: (flashcardbox) => dispatch(actions.createFlashcardbox(flashcardbox)),
  setFlashcardboxId: (id) => dispatch(actions.setFlashcardboxId(id)),
});

const FlashcardboxesContainer = connect(mapStateToProps, mapDispatchToProps)(Flashcardboxes);

export default FlashcardboxesContainer;
