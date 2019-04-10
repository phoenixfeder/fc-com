import {
  GET_BOXES_START,
  GET_BOXES_SUCCESS,
  GET_BOXES_FAIL,
} from '../utils/const-actiontypes';

const initialState = {
  loading: false,
  error: false,
  boxes: [],
};

const getBoxesStart = state => ({ ...state, loading: true });

const getBoxesSuccess = (state, action) => ({
  ...state,
  boxes: action.flashcardboxes,
  loading: false,
});

const getBoxesFail = (state, action) => ({
  ...state,
  error: action.error,
  loading: false,
});

const boxesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOXES_START:
      return getBoxesStart(state, action);
    case GET_BOXES_SUCCESS:
      return getBoxesSuccess(state, action);
    case GET_BOXES_FAIL:
      return getBoxesFail(state, action);
    default:
      return state;
  }
};

export default boxesReducer;
