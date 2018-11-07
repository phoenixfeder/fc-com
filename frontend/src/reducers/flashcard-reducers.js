import {FLASHCARD_GOTTEN} from '../utils/const-actiontypes';

const initialState = {
    flashcard: {
        title: '',
        frontText: '',
        backText: ''
    }
};

const flashcardReducer = (state = initialState, action) => {
    switch(action.type){
        case FLASHCARD_GOTTEN:
            return {...state, flashcard: action.payload};
        default:
            return state;
    }
}

export default flashcardReducer;