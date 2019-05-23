import * as actionTypes from '../utils/const-actiontypes';
import {
  BACKEND_URL_ACCOUNT_NEW,
  BACKEND_URL_ACCOUNT_NEW_VERIFICATION_TOKEN,
  BACKEND_URL_ACCOUNT_VERIFY,
} from '../utils/const-paths';

const authStart = () => ({
  type: actionTypes.AUTH_START,
});

const authEnd = () => ({
  type: actionTypes.AUTH_END,
});

export const fetchRegister = (state, callback) => (dispatch) => {
  dispatch(authStart());
  fetch(BACKEND_URL_ACCOUNT_NEW, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      register: {
        user: {
          username: state.username,
          email: state.mail,
          password: state.password,
        },
      },
    }),
  })
    .then(results => results.json())
    .then(result => {
      dispatch(authEnd());
      callback(result);
    });
};

export const fetchVerify = (parameters, callback) => (dispatch) => {
  dispatch(authStart());
  fetch(BACKEND_URL_ACCOUNT_VERIFY(parameters), {
    method: 'PUT',
  })
    .then(results => results.json(),
    )
    .then(result => {
      callback(result);
      dispatch(authEnd());
    });
};

export const fetchNewVerifyToken = (state, callback) => (dispatch) => {
  dispatch(authStart());
  fetch(BACKEND_URL_ACCOUNT_NEW_VERIFICATION_TOKEN, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      register: {
        user: {
          email: state.email,
        },
      },
    }),

  })
    .then(results => results.json(),
    )
    .then(result => {
      callback(result);
      dispatch(authEnd());
    });
};
