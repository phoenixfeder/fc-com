import {
  CREATE_FLASHCARD_FAIL,
  CREATE_FLASHCARD_START,
  CREATE_FLASHCARD_SUCCESS,
  DELETE_FLASHCARD_FAIL,
  DELETE_FLASHCARD_START,
  DELETE_FLASHCARD_SUCCESS,
  EDIT_FLASHCARD_FAIL,
  EDIT_FLASHCARD_START,
  EDIT_FLASHCARD_SUCCESS,
  GET_FLASHCARDS_FAIL,
  GET_FLASHCARDS_START,
  GET_FLASHCARDS_SUCCESS,
} from '../utils/const-actiontypes';

const initialState = {
  loading: false,
  createLoading: false,
  deleteLoading: false,
  editLoading: false,
  error: false,
  flashcards: [],
};

const getFlashcardsStart = (state) => ({
  ...state,
  loading: true,
});

const getFlashcardsSuccess = (state, action) => ({
  ...state,
  flashcards: action.flashcards,
  loading: false,
});

const getFlashcardsFail = (state, action) => ({
  ...state,
  loading: false,
  error: action.error,
});

const createFlashcardStart = (state) => ({
  ...state,
  createLoading: true,
});

const createFlashcardSuccess = (state, action) => ({
  ...state,
  flashcards: state.flashcards.concat(action.flashcard),
  createLoading: false,
});

const createFlashcardFail = (state, action) => ({
  ...state,
  error: action.error,
  createLoading: false,
});

const deleteFlashcardStart = (state) => ({
  ...state,
  deleteLoading: true,
});

const deleteFlashcardFail = (state, action) => ({
  ...state,
  error: action.error,
  deleteLoading: false,
});

const deleteFlashcardSuccess = (state, action) => {
  const indexToRemove = state.flashcards.map(flashcard => flashcard.id)
    .indexOf(action.id);
  const newFlashcardsArray = Array.from(state.flashcards); // Deep copy so Redux can detect changes
  newFlashcardsArray.splice(indexToRemove, 1);
  return ({
    ...state,
    flashcards: newFlashcardsArray,
    deleteLoading: false,
  });
};

const editFlashcardStart = (state) => ({
  ...state,
  editLoading: true,
});

const editFlashcardSuccess = (state, action) => {
  const indexToEdit = state.flashcards.map(flashcard => flashcard.id)
    .indexOf(action.flashcard[0].id);
  const newFlashcardsArray = Array.from(state.flashcards); // Deep copy so Redux can detect changes
  newFlashcardsArray[indexToEdit] = action.flashcard[0];

  return ({
    ...state,
    flashcards: newFlashcardsArray,
    editLoading: false,
  });
};

const editFlashcardFail = (state, action) => ({
  ...state,
  error: action.error,
  editLoading: false,
});

const flashcardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FLASHCARDS_START:
      return getFlashcardsStart(state);
    case GET_FLASHCARDS_SUCCESS:
      return getFlashcardsSuccess(state, action);
    case GET_FLASHCARDS_FAIL:
      return getFlashcardsFail(state, action);
    case CREATE_FLASHCARD_START:
      return createFlashcardStart(state);
    case CREATE_FLASHCARD_SUCCESS:
      return createFlashcardSuccess(state, action);
    case CREATE_FLASHCARD_FAIL:
      return createFlashcardFail(state, action);
    case DELETE_FLASHCARD_START:
      return deleteFlashcardStart(state);
    case DELETE_FLASHCARD_SUCCESS:
      return deleteFlashcardSuccess(state, action);
    case DELETE_FLASHCARD_FAIL:
      return deleteFlashcardFail(state, action);
    case EDIT_FLASHCARD_START:
      return editFlashcardStart(state);
    case EDIT_FLASHCARD_SUCCESS:
      return editFlashcardSuccess(state, action);
    case EDIT_FLASHCARD_FAIL:
      return editFlashcardFail(state, action);
    default:
      return state;
  }
};

export default flashcardsReducer;
