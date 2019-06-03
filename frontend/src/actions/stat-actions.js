import * as actionTypes from '../utils/const-actiontypes';
import { BACKEND_URL_ACCOUNT_STATISTICS } from '../utils/const-paths';
import { store } from '../store';
import { enqueueSnackbar } from './notistack-snackbar-actions';

const statStart = () => ({
  type: actionTypes.STATS_START,
});

const statSuccess = (stats) => ({
  type: actionTypes.STATS_SUCCESS,
  statistics: stats,
});

const statFail = (err) => ({
  type: actionTypes.STATS_FAIL,
  error: err,
});

export const getStatistics = () => dispatch => {
  dispatch(statStart());
  const authState = store.getState().auth;
  fetch(BACKEND_URL_ACCOUNT_STATISTICS, {
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
  }).then(results => results.json()).then((result) => {
    switch (result.status.code) {
      case 200:
        dispatch(statSuccess(result.statistics));
        break;

      default:
        dispatch(statFail(result.status.message));
        dispatch(enqueueSnackbar({
          message: 'This should not happen. Please contact system admin.',
          options: {
            variant: 'error',
          },
        }));
        break;
    }
  }).catch((err) => {
    dispatch(statFail(err));
  });
};
