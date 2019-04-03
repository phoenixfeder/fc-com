import {
  BACKEND_URL_ACCOUNT_NEW,
  BACKEND_URL_ACCOUNT_VERIFY,
  BACKEND_URL_REGISTER_NEW_VERIFICATION_TOKEN,
} from '../utils/const-paths';

export const fetchRegister = (state, callback) => {

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
      callback(result);
    });

};

export const fetchVerify = (parameters, callback) => {

  fetch(BACKEND_URL_ACCOUNT_VERIFY(parameters), {
    method: 'PUT',
  })
    .then(results => results.json(),
    )
    .then(result => {
      callback(result);
    });
};

export const fetchNewVerifyToken = (state, callback) => {

  fetch(BACKEND_URL_REGISTER_NEW_VERIFICATION_TOKEN, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      register: {
        user: {
          email: this.state.email,
        },
      },
    }),

  })
    .then(results => results.json(),
    )
    .then(result => {
      callback(result);
    });

};
