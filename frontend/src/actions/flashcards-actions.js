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
  BACKEND_URL_DELETE_FLASHCARDS,
  BACKEND_URL_EDIT_FLASHCARDS,
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
        id,
      },
    }),
  })
    .then(results => results.json())
    .then(result => {
      switch (result.status.code) {
        case 200:
          // TODO: remove hardcoded success
          result.flashcards.forEach((flashcard) => {
            flashcard.successRate = 0;
          });
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

export const createFlashcard = (flashcard, boxId) => dispatch => {
  dispatch(createFlashcardStart());
  const authState = store.getState().auth;

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
          boxId,
        },
    }),
  })
    .then(results => results.json())
    .then(result => {
      switch (result.status.code) {
        case 200:
          // TODO: remove hardcoded success
          result.flashcards.forEach((newFlashcard) => {
            newFlashcard.successRate = 0;
          });
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
    .catch((err) => {
      dispatch(createFlashcardFail(err));
      dispatch(enqueueSnackbar({
        message: 'This should not happen. Please contact system admin.',
        options: {
          variant: 'error',
        },
      }));
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

  const authState = store.getState().auth;
  fetch(BACKEND_URL_DELETE_FLASHCARDS, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authentication: {
        session: authState.session,
        hash: authState.sessionHash,
      },
      flashcard: {
        id,
      },
    }),
  })
    .then(results => results.json())
    .then(result => {
      switch (result.status.code) {
        case 200:
          dispatch(deleteFlashcardSuccess(id));
          break;

        default:
          dispatch(deleteFlashcardFail(result.status.message));
          dispatch(enqueueSnackbar({
            message: 'This should not happen. Please contact system admin.',
            options: {
              variant: 'error',
            },
          }));
          break;
      }
    })
    .catch((err) => {
      dispatch(deleteFlashcardFail(err));
    });

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


  const authState = store.getState().auth;
  fetch(BACKEND_URL_EDIT_FLASHCARDS, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authentication: {
        session: authState.session,
        hash: authState.sessionHash,
      },
      flashcard: {
        id: flashcard.id,
        title: flashcard.title,
        front: flashcard.front,
        back: flashcard.back,
      },
    }),
  })
    .then(results => results.json())
    .then(result => {
      switch (result.status.code) {
        case 200:
          // TODO: remove hardcoded success
          result.flashcards.forEach((editedFlashcard) => {
            editedFlashcard.successRate = 0;
          });
          dispatch(editFlashcardSuccess(result.flashcards));
          break;

        default:
          dispatch(editFlashcardFail(result.status.message));
          dispatch(enqueueSnackbar({
            message: 'This should not happen. Please contact system admin.',
            options: {
              variant: 'error',
            },
          }));
          break;
      }
    })
    .catch((err) => {
      dispatch(editFlashcardFail(err));
    });

};
