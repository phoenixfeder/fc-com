import * as actionTypes from '../utils/const-actiontypes';
import flashcardboxesReducer from '../reducers/flashcardboxes-reducer';

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
test('getting boxes starts and thus starts loading', () => {
  const action = {
    type: actionTypes.GET_BOXES_START,
  };

  const newState = flashcardboxesReducer(initialState, action);
  expect(newState.loading).toBeTruthy();
});

test('boxes from action are set correctly', () => {
  const testBoxes =[{title: 'testBoxTitle'}];
  const action = {
    type: actionTypes.GET_BOXES_SUCCESS,
    boxes: testBoxes,
  };

  const newState = flashcardboxesReducer(initialState, action);
  expect(newState.loading).toBeFalsy();
  expect(newState.boxes).toBe(testBoxes);
});

test('Getting boxes failed', () => {
  const testError = 'Getting boxes failed';
  const action = {
    type: actionTypes.GET_BOXES_FAIL,
    error: testError,
  };

  const newState = flashcardboxesReducer(initialState, action);
  expect(newState.loading).toBeFalsy();
  expect(newState.error).toBe(testError);
});

test('creating boxes starts and thus starts loading', () => {
  const action = {
    type: actionTypes.CREATE_BOX_START,
  };

  const newState = flashcardboxesReducer(initialState, action);
  expect(newState.createLoading).toBeTruthy();
});

test('creating boxes starts and thus starts loading', () => {
  const testBox = {testBoxTitle: 'test title'};
  const initialBoxes = [{existingBoxTitle: 'existing title'}];

  const action = {
    type: actionTypes.CREATE_BOX_SUCCESS,
    box: testBox
  };

  initialState = {...initialState, boxes: initialBoxes};

  const newState = flashcardboxesReducer(initialState, action);
  expect(newState.createLoading).toBeFalsy();
  //expect(newState.boxes).toBe([{existingBoxTitle: 'existing title'}, {testBoxTitle: 'test title'}])
});

/*
del start
del succ
del fail
edit start
edit succ
edit fail
new id
new title
share start
share succ
share fail
stop start
stop succ
stop fail
unfollow start
unfollow succ
unfollow fail
default
*/
