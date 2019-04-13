import {
  GET_BOXES_START,
  GET_BOXES_SUCCESS,
  GET_BOXES_FAIL,
  CREATE_BOX_START,
  CREATE_BOX_SUCCESS,
  CREATE_BOX_FAIL,
} from '../utils/const-actiontypes';

const initialState = {
  loading: false,
  createLoading: false,
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
  loading: false,
});

const createBoxesFail = (state, action) => ({
  ...state,
  error: action.error,
  createLoading: false,
});

const boxesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOXES_START:
      return getBoxesStart(state, action);
    case GET_BOXES_SUCCESS:
      return getBoxesSuccess(state, action);
    case GET_BOXES_FAIL:
      return getBoxesFail(state, action);
    case CREATE_BOX_START:
      return createBoxStart(state, action);
    case CREATE_BOX_SUCCESS:
      return createBoxSuccess(state, action);
    case CREATE_BOX_FAIL:
      return createBoxesFail(state, action);
    default:
      return state;
  }
};

export default boxesReducer;
