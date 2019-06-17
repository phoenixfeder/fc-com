import statReducer from '../reducers/stat-reducer';
import * as actionTypes from '../utils/const-actiontypes';

// Get a clean new state before each new test
let initialState = {};

beforeEach(() => {
  initialState = {
    statistics: {},
    loading: false,
    error: null,
  };
});

// Test statsStart
test('getting stats starts and thus starts loading', () => {
  const action = {
    type: actionTypes.STATS_START,
  };

  const newState = statReducer(initialState, action);
  expect(newState.loading)
    .toBeTruthy();
});

// Test statsSuccess
test('getting stats success and thus sets user statistics and stops loading', () => {
  const action = {
    type: actionTypes.STATS_SUCCESS,
    statistics: {
      boxes: 5,
      cards: 7,
      successRate: 64,
    },
    loading: false,
  };

  const newState = statReducer(initialState, action);
  expect(newState)
    .toEqual({
      statistics: {
        boxes: 5,
        cards: 7,
        successRate: 64,
      },
      loading: false,
      error: null,
    });
});

// Test statsFail
test('authorization fails and thus error message is set and stops loading', () => {
  const action = {
    type: actionTypes.STATS_FAIL,
    error: 'ERROR!',
    loading: false,
  };

  const newState = statReducer(initialState, action);
  expect(newState.error)
    .toBe('ERROR!');
  expect(newState.loading)
    .toBeFalsy();
});
