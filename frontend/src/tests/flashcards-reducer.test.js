import * as actionTypes from '../utils/const-actiontypes';
import flashcardsReducer from '../reducers/flashcards-reducer';

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

// Test getBoxesStart
test('authorization starts and thus starts loading', () => {
  const action = {
    type: actionTypes.GET_FLASHCARDS_START,
  };

  const newState = flashcardsReducer(initialState, action);
  expect(newState.loading).toBeTruthy();
});
