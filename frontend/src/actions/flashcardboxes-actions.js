import {
  BACKEND_URL_FLASHCARDBOXES,
} from '../utils/const-paths';
import {
  GET_BOXES_START,
  GET_BOXES_SUCCESS,
  GET_BOXES_FAIL,
} from '../utils/const-actiontypes';
import { enqueueSnackbar } from './notistack-snackbar-actions';
import { authObject } from '../utils/various';

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
  dispatch(getBoxesStart());
  fetch(BACKEND_URL_FLASHCARDBOXES, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authObject,
    }),
  }).then(results => {
    results.json();
  }).then(result => {
    switch (result.status.code) {
      case 200:
        getBoxesSuccess(result.flashcardboxes);
        break;

      default:
        dispatch(enqueueSnackbar({
          message: 'This should not happen. Please contact system admin.',
          options: {
            variant: 'error',
          },
        }));
        break;
    }
  }).catch(err => {
    dispatch(getBoxesFail(err));
    dispatch(enqueueSnackbar({
      message: 'This should not happen. Please contact system admin.',
      options: {
        variant: 'error',
      },
    }));
  });
};
