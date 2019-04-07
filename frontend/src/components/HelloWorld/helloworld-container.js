import { connect } from 'react-redux';
import { flashCardGotten } from '../../actions/flashcard-action';
import HelloWorld from './HelloWorld';

const mapStateToProps = state => ({ flashcard: state.flashcards.flashcard });

const mapDispatchToProps = dispatch => ({
  updateFlashcard: (flashcard) => {
    dispatch(flashCardGotten(flashcard));
  },
});

const HelloWorldContainer = connect(mapStateToProps, mapDispatchToProps)(HelloWorld);

export default HelloWorldContainer;
