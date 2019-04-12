import {
  BACKEND_URL_GET_FLASHCARDBOXES,
  BACKEND_URL_CREATE_FLASHCARDBOX,
} from '../utils/const-paths';
import {
  GET_BOXES_START,
  GET_BOXES_SUCCESS,
  GET_BOXES_FAIL,
  CREATE_BOX_START,
  CREATE_BOX_SUCCESS,
  CREATE_BOX_FAIL,
} from '../utils/const-actiontypes';
import { enqueueSnackbar } from './notistack-snackbar-actions';
import { store } from '../store';

export const getBoxesStart = () => ({
  type: GET_BOXES_START,
});

export const getBoxesSuccess = flashcardboxes => ({
  type: GET_BOXES_SUCCESS,
  boxes: flashcardboxes,
});

export const getBoxesFail = errorarg => ({
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
  }).catch(err => {
    console.log(err);
  });
};

export const createBoxStart = () => ({
  type: CREATE_BOX_START,
});

export const createBoxSuccess = flashcardbox => ({
  type: CREATE_BOX_SUCCESS,
  box: flashcardbox,
});

export const createBoxFail = errorarg => ({
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
      flashcardbox,
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
  }).catch(err => {
    console.log(err);
  });
};
