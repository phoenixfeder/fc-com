import {
  BACKEND_URL_EDIT_CLOSE_ACCOUNT,
  BACKEND_URL_EDIT_GET_ACCOUNT,
  BACKEND_URL_EDIT_UPDATE_ACCOUNT,
} from '../utils/const-paths';

export const fetchUpdateAccount = (state, callback) => {

  fetch(BACKEND_URL_EDIT_UPDATE_ACCOUNT, {
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
  }).catch(() => {
    callback({
      status: {
        code: 418,
      },
    });
    /* enqueueSnackbar({
       message: 'This should not happen. Please contact system admin.',
       options: {
         variant: 'error',
       },
     }); */
  });
};

export const fetchGetAccountData = (state, callback) => {
  fetch(BACKEND_URL_EDIT_GET_ACCOUNT, {
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
  })
    .then(results => results.json())
    .then((result) => {
      callback(result);
    }).catch(() => {
      callback({
        status: {
          code: 418,
        },
      });
    },
  );
};

export const fetchCloseAccount = (state, callback) => {
  fetch(BACKEND_URL_EDIT_CLOSE_ACCOUNT, {
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
        oldPassword: state.closeAccountPassword,
      },
    }),
  }).then((results) => results.json()).then((result) => {
    callback(result);
  });
};
