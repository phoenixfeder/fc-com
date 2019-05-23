import * as actionTypes from '../utils/const-actiontypes';
import {
  BACKEND_URL_ACCOUNT_CLOSE,
  BACKEND_URL_ACCOUNT_GET,
  BACKEND_URL_ACCOUNT_UPDATE,
} from '../utils/const-paths';

const authStart = () => ({
  type: actionTypes.AUTH_START,
});

const authEnd = () => ({
  type: actionTypes.AUTH_END,
});

export const fetchUpdateAccount = (state, callback) => dispatch => {
  dispatch(authStart());
  fetch(BACKEND_URL_ACCOUNT_UPDATE, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authentication: {
        session: state.session,
        hash: state.sessionHash,
      },
      user: {
        userID: state.userID,
        oldPassword: state.oldPassword,
        password: ((state.newPassword === '') ? state.oldPassword : state.newPassword),
        email: state.newEmail,
      },
    }),
  }).then(results => results.json()).then((result) => {
    callback(result);
    dispatch(authEnd());
  }).catch(() => {
    callback({
      status: {
        code: 418,
      },
    });
    dispatch(authEnd());
  });
};

export const fetchUpdateUser = (state, callback) => dispatch => {
  dispatch(authStart());
  fetch(BACKEND_URL_ACCOUNT_UPDATE, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authentication: {
        session: state.session,
        hash: state.sessionHash,
      },
      user: {
        userID: state.userID,
        realName: state.realName,
        interest: state.interest,
        dateOfBirth: state.birthday,
      },
    }),
  }).then(results => results.json()).then((result) => {
    callback(result);
    dispatch(authEnd());
  }).catch(() => {
    callback({
      status: {
        code: 418,
      },
    });
    dispatch(authEnd());
  });
};

export const fetchGetAccountData = (state, callback) => dispatch => {
  dispatch(authStart());
  fetch(BACKEND_URL_ACCOUNT_GET, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authentication: {
        session: state.session,
        hash: state.sessionHash,
      },
      user: {
        userID: state.userID,
      },
    }),
  }).then(results => results.json()).then((result) => {
    callback(result);
    dispatch(authEnd());
  }).catch(() => {
    callback({
      status: {
        code: 418,
      },
    });
    dispatch(authEnd());
  });
};

export const fetchCloseAccount = (state, callback) => dispatch => {
  dispatch(authStart());
  fetch(BACKEND_URL_ACCOUNT_CLOSE, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authentication: {
        session: state.session,
        hash: state.sessionHash,
      },
      user: {
        oldPassword: state.closeAccountPassword,
      },
    }),
  }).then((results) => results.json()).then((result) => {
    callback(result);
    dispatch(authEnd());
  }).catch(() => {
    callback({
      status: {
        code: 418,
      },
    });
    dispatch(authEnd());
  });
};
