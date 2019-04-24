import {
  CREATE_BOX_FAIL,
  CREATE_BOX_START,
  CREATE_BOX_SUCCESS,
  DELETE_BOX_FAIL,
  DELETE_BOX_START,
  DELETE_BOX_SUCCESS,
  EDIT_BOX_FAIL,
  EDIT_BOX_START,
  EDIT_BOX_SUCCESS,
  GET_BOXES_FAIL,
  GET_BOXES_START,
  GET_BOXES_SUCCESS,
} from '../utils/const-actiontypes';

const initialState = {
  loading: false,
  createLoading: false,
  deleteLoading: false,
  editLoading: false,
  error: false,
  boxes: [],
};

const getBoxesStart = state => ({ ...state, loading: true });

const getBoxesSuccess = (state, action) => ({
  ...state,
  boxes: action.boxes,
  loading: false,
});

const getBoxesFail = (state, action) => ({
  ...state,
  error: action.error,
  loading: false,
});

const createBoxStart = state => ({ ...state, createLoading: true });

const createBoxSuccess = (state, action) => ({
  ...state,
  boxes: state.boxes.concat(action.box),
  createLoading: false,
});

const createBoxesFail = (state, action) => ({
  ...state,
  error: action.error,
  createLoading: false,
});

const deleteBoxStart = state => ({ ...state, deleteLoading: true });

const deleteBoxSuccess = (state, action) => {
  const indexToRemove = state.boxes.map(box => box.id).indexOf(action.id);
  const newBoxesArray = Array.from(state.boxes); // Deep copy so Redux can detect changes
  newBoxesArray.splice(indexToRemove, 1);
  return ({
    ...state,
    boxes: newBoxesArray,
    deleteLoading: false,
  });
};

const deleteBoxesFail = (state, action) => ({
  ...state,
  error: action.error,
  deleteLoading: false,
});

const editBoxStart = state => ({ ...state, editLoading: true });

const editBoxSuccess = (state, action) => {
  const indexToEdit = state.boxes.map(box => box.id).indexOf(action.box.flashcardbox.id);
  const newBoxesArray = Array.from(state.boxes); // Deep copy so Redux can detect changes

  newBoxesArray[indexToEdit] = { ...newBoxesArray[indexToEdit], ...action.box.flashcardbox };
  return ({
    ...state,
    boxes: newBoxesArray,
    editLoading: false,
  });
};

const editBoxesFail = (state, action) => ({
  ...state,
  error: action.error,
  editLoading: false,
});

const boxesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOXES_START:
      return getBoxesStart(state);
    case GET_BOXES_SUCCESS:
      return getBoxesSuccess(state, action);
    case GET_BOXES_FAIL:
      return getBoxesFail(state, action);
    case CREATE_BOX_START:
      return createBoxStart(state);
    case CREATE_BOX_SUCCESS:
      return createBoxSuccess(state, action);
    case CREATE_BOX_FAIL:
      return createBoxesFail(state, action);
    case DELETE_BOX_START:
      return deleteBoxStart(state);
    case DELETE_BOX_SUCCESS:
      return deleteBoxSuccess(state, action);
    case DELETE_BOX_FAIL:
      return deleteBoxesFail(state, action);
    case EDIT_BOX_START:
      return editBoxStart(state);
    case EDIT_BOX_SUCCESS:
      return editBoxSuccess(state, action);
    case EDIT_BOX_FAIL:
      return editBoxesFail(state, action);
    default:
      return state;
  }
};

export default boxesReducer;
