import { store } from '../store';
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
import {
  BACKEND_URL_CREATE_FLASHCARDS,
  BACKEND_URL_GET_FLASHCARDS,
} from '../utils/const-paths';
import { enqueueSnackbar } from './notistack-snackbar-actions';

const getFlashcardsStart = () => ({
  type: GET_FLASHCARDS_START,
});
const getFlashcardsSuccess = (flashcards) => ({
  type: GET_FLASHCARDS_SUCCESS,
  flashcards,
});
const getFlashcardsFail = (errorarg) => ({
  type: GET_FLASHCARDS_FAIL,
  error: errorarg,
});

export const getFlashcards = (id) => dispatch => {
  const authState = store.getState().auth;
  dispatch(getFlashcardsStart());

  fetch(BACKEND_URL_GET_FLASHCARDS, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authentication: {
        session: authState.session,
        hash: authState.sessionHash,
      },
      flashcardboxes: {
        id: id,
      },
    }),
  })
    .then(results => results.json())
    .then(result => {
      switch (result.status.code) {
        case 200:
          dispatch(getFlashcardsSuccess(result.flashcards));
          break;

        default:
          dispatch(getFlashcardsFail(result.status.message));
          dispatch(enqueueSnackbar({
            message: 'This should not happen. Please contact system admin.',
            options: {
              variant: 'error',
            },
          }));
          break;
      }
    })
    .catch(() => {
    });
};

const createFlashcardStart = () => ({
  type: CREATE_FLASHCARD_START,
});

const createFlashcardSuccess = (flashcard) => ({
  type: CREATE_FLASHCARD_SUCCESS,
  flashcard,
});

const createFlashcardFail = (errorarg) => ({
  type: CREATE_FLASHCARD_FAIL,
  error: errorarg,
});

export const createFlashcard = flashcard => dispatch => {
  dispatch(createFlashcardStart());

  const authState = store.getState().auth;
  const boxId = 1; //TODO change to actual id

  fetch(BACKEND_URL_CREATE_FLASHCARDS, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authentication: {
        session: authState.session,
        hash: authState.sessionHash,
      },
      flashcard:
        {
          title: flashcard.title,
          front: flashcard.front,
          back: flashcard.back,
          boxId: boxId,
        },
    }),
  })
    .then(results => results.json())
    .then(result => {
      console.log(result);
      switch (result.status.code) {
        case 200:
          dispatch(createFlashcardSuccess(result.flashcards));
          break;

        default:
          dispatch(createFlashcardFail(result.status.message));
          dispatch(enqueueSnackbar({
            message: 'This should not happen. Please contact system admin.',
            options: {
              variant: 'error',
            },
          }));
          break;
      }
    })
    .catch(() => {
    });

};

const deleteFlashcardStart = () => ({
  type: DELETE_FLASHCARD_START,
});

const deleteFlashcardSuccess = (id) => ({
  type: DELETE_FLASHCARD_SUCCESS,
  id,
});

const deleteFlashcardFail = (errorarg) => ({
  type: DELETE_FLASHCARD_FAIL,
  error: errorarg,
});

export const deleteFlashcard = id => dispatch => {
  dispatch(deleteFlashcardStart());
};

const editFlashcardStart = () => ({
  type: EDIT_FLASHCARD_START,
});

const editFlashcardSuccess = (flashcard) => ({
  type: EDIT_FLASHCARD_SUCCESS,
  flashcard,
});

const editFlashcardFail = (errorarg) => ({
  type: EDIT_FLASHCARD_FAIL,
  error: errorarg,
});

export const editFlashcard = (flashcard) => dispatch => {
  dispatch(editFlashcardStart());
};
