import {
  GET_FLASHCARDS_FAIL,
  GET_FLASHCARDS_START,
  GET_FLASHCARDS_SUCCESS,
} from '../utils/const-actiontypes';

const initialState = {
  flashcards: [],
};

const flashcardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FLASHCARDS_START:
      return {
        ...state,
        flashcards: action.flashcards,
      };
    case GET_FLASHCARDS_SUCCESS:
      return getFlashcardsSuccess();
      break;
    case GET_FLASHCARDS_FAIL:
      break;
    default:
      return state;
  }
};

export default flashcardsReducer;
