import authReducer from '../reducers/auth-reducer';
import * as actionTypes from '../utils/const-actiontypes';

// Get a clean new state before each new test
let initialState = {};

beforeEach(() => {
  initialState = {
    session: null,
    sessionHash: null,
    userID: null,
    username: null,
    loading: false,
    error: null,
  };
});

// Test authStart
test('authorization starts and thus starts loading',
  () => {
    const action = {
      type: actionTypes.AUTH_START,
    };

    const newState = authReducer(initialState, action);
    expect(newState.loading)
      .toBeTruthy();
  });

// Test authSuccess
test('authorization success and thus sets user credentials and stops loading',
  () => {
    const action = {
      type: actionTypes.AUTH_SUCCESS,
      session: 'SESSION',
      sessionHash: 'SESSIONHASH',
      userID: 1,
      username: 'TESTUSER',
      loading: false,
    };

    const newState = authReducer(initialState, action);
    expect(newState)
      .toEqual({
        session: 'SESSION',
        sessionHash: 'SESSIONHASH',
        userID: 1,
        username: 'TESTUSER',
        loading: false,
        error: null,
      });
  });

// Test authFail
test('authorization fails and thus error message is set and stops loading',
  () => {
    const action = {
      type: actionTypes.AUTH_FAIL,
      error: 'ERROR!',
      loading: false,
    };

    const newState = authReducer(initialState, action);
    expect(newState.error)
      .toBe('ERROR!');
    expect(newState.loading)
      .toBeFalsy();
  });

test('logs the user out and removes all data',
  () => {
    const action = {
      type: actionTypes.AUTH_LOGOUT,
    };

    const newState = authReducer(initialState, action);
    expect(newState.session)
      .toBe(null);
    expect(newState.sessionHash)
      .toBe(null);
    expect(newState.userID)
      .toBe(null);
    expect(newState.username)
      .toBe(null);
  });

test('closes the account and removes all data',
  () => {
    const action = {
      type: actionTypes.AUTH_CLOSE,
    };

    const newState = authReducer(initialState, action);
    expect(newState.session)
      .toBe(null);
    expect(newState.sessionHash)
      .toBe(null);
    expect(newState.userID)
      .toBe(null);
    expect(newState.username)
      .toBe(null);
    expect(newState.loading)
      .toBeFalsy();
  });

test('ends a request', () => {
  const action = {
    type: actionTypes.AUTH_END,
  };

  const newState = authReducer(initialState, action);
  expect(newState.loading)
    .toBeFalsy();
});

test('default does not change the state',
  () => {
    const action = {
      type: 'DEFAULT_ACTION',
    };

    const newState = authReducer(initialState, action);
    expect(newState)
      .toBe(initialState);
  });
