import { connect } from 'react-redux';
import Flashcardboxes from './Flashcardboxes';
import * as actions from '../../actions/flashcardboxes-actions';

const mapStateToProps = state => ({
  loading: state.flashcardboxes.loading,
  boxes: state.flashcardboxes.boxes,
  error: state.flashcardboxes.error,
});

const mapDispatchToProps = dispatch => ({
  getFlashcardboxes: () => dispatch(actions.getFlashcardboxes()),
});

const FlashcardboxesContainer = connect(mapStateToProps, mapDispatchToProps)(Flashcardboxes);

export default FlashcardboxesContainer;
