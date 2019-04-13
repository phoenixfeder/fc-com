import { connect } from 'react-redux';
import Flashcardboxes from './Flashcardboxes';
import * as actions from '../../actions/flashcardboxes-actions';

const mapStateToProps = state => ({
  loading: state.flashcardboxes.loading,
  createLoading: state.flashcardboxes.createLoading,
  boxes: state.flashcardboxes.boxes,
  error: state.flashcardboxes.error,
  createError: state.flashcardboxes.errorLoading,
});

const mapDispatchToProps = dispatch => ({
  getFlashcardboxes: () => dispatch(actions.getFlashcardboxes()),
  createFlashcardbox: (flashcardbox) => dispatch(actions.createFlashcardbox(flashcardbox)),
});

const FlashcardboxesContainer = connect(mapStateToProps, mapDispatchToProps)(Flashcardboxes);

export default FlashcardboxesContainer;
