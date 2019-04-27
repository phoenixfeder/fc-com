import {
  BACKEND_URL_GET_FLASHCARDBOXES,
  BACKEND_URL_CREATE_FLASHCARDBOX,
  BACKEND_URL_DELETE_FLASHCARDBOX,
  BACKEND_URL_EDIT_FLASHCARDBOX,
} from '../utils/const-paths';
import {
  GET_BOXES_START,
  GET_BOXES_SUCCESS,
  GET_BOXES_FAIL,
  CREATE_BOX_START,
  CREATE_BOX_SUCCESS,
  CREATE_BOX_FAIL,
  DELETE_BOX_START,
  DELETE_BOX_SUCCESS,
  DELETE_BOX_FAIL,
  EDIT_BOX_START,
  EDIT_BOX_SUCCESS,
  EDIT_BOX_FAIL,
  NEW_FLASHCARDBOX_ID,
} from '../utils/const-actiontypes';
import { enqueueSnackbar } from './notistack-snackbar-actions';
import { store } from '../store';

const getBoxesStart = () => ({
  type: GET_BOXES_START,
});

const getBoxesSuccess = flashcardboxes => ({
  type: GET_BOXES_SUCCESS,
  boxes: flashcardboxes,
});

const getBoxesFail = errorarg => ({
  type: GET_BOXES_FAIL,
  error: errorarg,
});


export const getFlashcardboxes = () => dispatch => {
  const authState = store.getState().auth;
  dispatch(getBoxesStart());
  fetch(BACKEND_URL_GET_FLASHCARDBOXES, {
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
    }),
  }).then(results => results.json()).then(result => {
    switch (result.status.code) {
      case 200:
        dispatch(getBoxesSuccess(result.flashcardboxes));
        break;

      default:
        dispatch(getBoxesFail(result.status.message));
        dispatch(enqueueSnackbar({
          message: 'This should not happen. Please contact system admin.',
          options: {
            variant: 'error',
          },
        }));
        break;
    }
  }).catch(() => {
  });
};

const createBoxStart = () => ({
  type: CREATE_BOX_START,
});

const createBoxSuccess = flashcardbox => ({
  type: CREATE_BOX_SUCCESS,
  box: flashcardbox,
});

const createBoxFail = errorarg => ({
  type: CREATE_BOX_FAIL,
  error: errorarg,
});

export const createFlashcardbox = flashcardbox => dispatch => {
  const authState = store.getState().auth;
  dispatch(createBoxStart());
  fetch(BACKEND_URL_CREATE_FLASHCARDBOX, {
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
        title: flashcardbox.title,
        description: flashcardbox.description,
      },
    }),
  }).then(results => results.json()).then(result => {
    switch (result.status.code) {
      case 200:
        dispatch(createBoxSuccess(result.flashcardboxes));
        break;

      default:
        dispatch(createBoxFail(result.status.message));
        dispatch(enqueueSnackbar({
          message: 'This should not happen. Please contact system admin.',
          options: {
            variant: 'error',
          },
        }));
        break;
    }
  }).catch(() => {
  });
};

const deleteBoxStart = () => ({
  type: DELETE_BOX_START,
});

const deleteBoxSuccess = id => ({
  type: DELETE_BOX_SUCCESS,
  id,
});

const deleteBoxFail = errorarg => ({
  type: DELETE_BOX_FAIL,
  error: errorarg,
});

export const deleteFlashcardbox = id => dispatch => {
  const authState = store.getState().auth;
  dispatch(deleteBoxStart());
  fetch(BACKEND_URL_DELETE_FLASHCARDBOX, {
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
      flashcardboxes: {
        id,
      },
    }),
  }).then(results => results.json()).then(result => {
    switch (result.status.code) {
      case 200:
        dispatch(deleteBoxSuccess(id));
        break;

      default:
        dispatch(deleteBoxFail(result.status.message));
        dispatch(enqueueSnackbar({
          message: 'This should not happen. Please contact system admin.',
          options: {
            variant: 'error',
          },
        }));
        break;
    }
  }).catch((err) => {
    dispatch(deleteBoxFail(err));
  });
};

const editBoxStart = () => ({
  type: EDIT_BOX_START,
});

const editBoxSuccess = flashcardbox => ({
  type: EDIT_BOX_SUCCESS,
  box: flashcardbox,
});

const editBoxFail = errorarg => ({
  type: EDIT_BOX_FAIL,
  error: errorarg,
});

export const editFlashcardbox = (flashcardbox) => dispatch => {
  const authState = store.getState().auth;
  dispatch(editBoxStart());
  fetch(BACKEND_URL_EDIT_FLASHCARDBOX, {
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
      flashcardboxes: {
        id: flashcardbox.flashcardbox.id,
        title: flashcardbox.flashcardbox.title,
        description: flashcardbox.flashcardbox.description,
      },
    }),
  }).then(results => results.json()).then(result => {
    switch (result.status.code) {
      case 200:
        dispatch(editBoxSuccess(flashcardbox));
        break;

      default:
        dispatch(editBoxFail(result.status.message));
        dispatch(enqueueSnackbar({
          message: 'This should not happen. Please contact system admin.',
          options: {
            variant: 'error',
          },
        }));
        break;
    }
  }).catch((err) => {
    dispatch(editBoxFail(err));
  });
};

const setNewFlashcardboxId = id => ({
  type: NEW_FLASHCARDBOX_ID,
  id,
});

export const setFlashcardboxId = (id) => dispatch => {
  dispatch(setNewFlashcardboxId(id));
};
