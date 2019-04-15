import {
  BACKEND_URL_GET_FLASHCARDBOXES,
} from '../utils/const-paths';
import {
  GET_BOXES_START,
  GET_BOXES_SUCCESS,
  GET_BOXES_FAIL,
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
