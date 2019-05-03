import * as actionTypes from '../utils/const-actiontypes';
import {
  BACKEND_URL_ACCOUNT_RESET_PASSWORD,
  BACKEND_URL_LOGIN,
  BACKEND_URL_LOGOUT,
} from '../utils/const-paths';
import { enqueueSnackbar } from './notistack-snackbar-actions';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (sessionarg, hash, userIDarg, usernamearg) => ({
  type: actionTypes.AUTH_SUCCESS,
  sessionHash: hash,
  session: sessionarg,
  userID: userIDarg,
  username: usernamearg,
});

export const authFail = errorarg => ({
  type: actionTypes.AUTH_FAIL,
  error: errorarg,
});

export const logoutNoAuth = () => {
  localStorage.removeItem('session');
  localStorage.removeItem('sessionHash');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userID');
  localStorage.removeItem('username');

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const closeAccount = () => (dispatch) => {
  dispatch(enqueueSnackbar({
    message: `Your account has been closed. We will miss you, ${localStorage.getItem('username')}!`,
    options: {
      variant: 'success',
    },
  }));

  localStorage.removeItem('session');
  localStorage.removeItem('sessionHash');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userID');
  localStorage.removeItem('username');

  dispatch({
    type: actionTypes.AUTH_CLOSE,
  });
};

export const logout = () => {
  fetch(BACKEND_URL_LOGOUT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authentication: {
        session: localStorage.getItem('session'),
        hash: localStorage.getItem('sessionHash'),
      },
    }),
  });

  return (dispatch) => {
    dispatch(enqueueSnackbar({
      message: `You are now logged out. See you, ${localStorage.getItem('username')}!`,
      options: {
        variant: 'success',
      },
    }));

    localStorage.removeItem('session');
    localStorage.removeItem('sessionHash');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userID');
    localStorage.removeItem('username');

    dispatch({
      type: actionTypes.AUTH_LOGOUT,
    });
  };
};

export const checkAuthTimeout = expirationTime => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (usernamearg, passwordarg) => (dispatch) => {
  dispatch(authStart());
  fetch(BACKEND_URL_LOGIN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username: usernamearg,
        password: passwordarg,
      },
    }),
  })
    .then(results => results.json())
    .then((result) => {
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      switch (result.status.code) {
        case 200:
          localStorage.setItem('session', result.status.session.session);
          localStorage.setItem('expirationDate', expirationDate);
          localStorage.setItem('userID', result.status.session.id);
          localStorage.setItem('username', result.status.session.username);
          localStorage.setItem('sessionHash', result.status.session.hash);
          dispatch(authSuccess(result.status.session.session, result.status.session.hash,
            result.status.session.id, result.status.session.username));
          dispatch(enqueueSnackbar({
            message: `You are now logged in, ${result.status.session.username}!`,
            options: {
              variant: 'success',
            },
          }));
          break;

        case 404:
          dispatch(authFail('Invalid username or password.'));
          dispatch(enqueueSnackbar({
            message: 'Invalid username or password.',
            options: {
              variant: 'error',
            },
          }));
          break;

        case 405:
          dispatch(authFail('Your account is not verified yet.'));
          dispatch(enqueueSnackbar({
            message: 'Your account is not verified yet.',
            options: {
              variant: 'error',
            },
          }));
          break;

        case 500:
          dispatch(authFail('Invalid input. Are you sure that you used your username or E-Mail?'));
          dispatch(enqueueSnackbar({
            message: 'Invalid input. Are you sure that you used your username or E-Mail?',
            options: {
              variant: 'error',
            },
          }));
          break;

        default:
          dispatch(authFail('This should not happen. Please contact system admin.'));
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
      dispatch(authFail('This should not happen. Please contact system admin.'));
      dispatch(enqueueSnackbar({
        message: 'This should not happen. Please contact system admin.',
        options: {
          variant: 'error',
        },
      }));
    });
};

export const authCheckState = () => (dispatch) => {
  const session = localStorage.getItem('session');
  if (!session) {
    dispatch(logoutNoAuth());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      dispatch(enqueueSnackbar({
        message: `You got logged out automatically. See you, ${localStorage.getItem('username')}!`,
        options: {
          variant: 'success',
        },
      }));
      dispatch(logoutNoAuth());
    } else {
      const userID = localStorage.getItem('userID');
      const username = localStorage.getItem('username');
      const sessionHash = localStorage.getItem('sessionHash');
      dispatch(authSuccess(session, sessionHash, userID, username));
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }
};

export const resetPassword = (email, callback) => {
  fetch(BACKEND_URL_ACCOUNT_RESET_PASSWORD, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
    //TODO: Add API-Body

  })
    .then(results => results.json(),
    )
    .then(result => {
      callback(result);
    })
    .catch(err => {
      callback({
        status: {
          code: 403,
        },
        errorDetail: {
          err,
        },
      });
    });

};
