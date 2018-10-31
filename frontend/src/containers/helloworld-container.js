import {connect} from 'react-redux';
import HelloWorld from '../components/HelloWorld';
import {flashCardGotten} from '../actions/flashcard-action';

const mapStateToProps = state => {
    return { flashcard: state.flashcardReducer.flashcard };
};

const mapDispatchToProps = dispatch => {
    return {
        updateFlashcard: (flashcard) => {
            dispatch(flashCardGotten(flashcard));
        }
    };
};

const HelloWorldContainer = connect(mapStateToProps, mapDispatchToProps)(HelloWorld);

export default HelloWorldContainer;