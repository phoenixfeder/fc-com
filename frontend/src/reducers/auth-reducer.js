import * as actionTypes from '../utils/const-actiontypes';

const initialState = {
  session: null,
  sessionHash: null,
  userID: null,
  username: null,
  loading: false,
  error: null,
};

const authStart = state => ({
  ...state,
  loading: true,
});

const authSuccess = (state, action) => ({
  ...state,
  session: action.session,
  sessionHash: action.sessionHash,
  userID: action.userID,
  username: action.username,
  loading: false,
});

const authFail = (state, action) => ({
  ...state,
  error: action.error,
  loading: false,
});

const authLogout = state => ({
  ...state,
  session: null,
  sessionHash: null,
  userID: null,
  username: null,
});

const authCloseAccount = state => ({
  ...state,
  session: null,
  sessionHash: null,
  userID: null,
  username: null,
  loading: false,
});

const authEnd = state => ({
  ...state,
  loading: false,
}); // Used to still have loading as a global state for old actions

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.AUTH_CLOSE:
      return authCloseAccount(state);
    case actionTypes.AUTH_END:
      return authEnd(state);
    default:
      return state;
  }
};

export default authReducer;
