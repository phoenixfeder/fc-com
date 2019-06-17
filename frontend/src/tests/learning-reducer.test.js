import learningReducer from '../reducers/learning-reducer';
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

// Test setCardsStart
test('starts setting cards to learn and thus starts loading', () => {
  const action = {
    type: actionTypes.SET_LEARNING_CARDS_START,
  };

  const newState = learningReducer(initialState, action);
  expect(newState.loading)
    .toBeTruthy();
});
