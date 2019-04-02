import { connect } from 'react-redux';
import HelloWorld from './HelloWorld';
import { flashCardGotten } from '../../actions/flashcard-action';

const mapStateToProps = state => ({ flashcard: state.flashcards.flashcard });

const mapDispatchToProps = dispatch => ({
  updateFlashcard: (flashcard) => {
    dispatch(flashCardGotten(flashcard));
  },
});

const HelloWorldContainer = connect(mapStateToProps, mapDispatchToProps)(HelloWorld);

export default HelloWorldContainer;
