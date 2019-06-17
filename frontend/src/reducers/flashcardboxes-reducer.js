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
  NEW_FLASHCARDBOX_ID,
  NEW_FLASHCARDBOX_TITLE,
  SHARE_BOX_FAIL,
  SHARE_BOX_START,
  SHARE_BOX_SUCCESS,
  STOP_SHARE_BOX_FAIL,
  STOP_SHARE_BOX_START,
  STOP_SHARE_BOX_SUCCESS,
  UNFOLLOW_BOX_FAIL,
  UNFOLLOW_BOX_START,
  UNFOLLOW_BOX_SUCCESS,
} from '../utils/const-actiontypes';

const initialState = {
  loading: false,
  createLoading: false,
  deleteLoading: false,
  editLoading: false,
  shareLoading: false,
  error: false,
  boxes: [],
  flashcardboxId: 0,
};

const getBoxesStart = state => ({
  ...state,
  loading: true,
});

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

const createBoxStart = state => ({
  ...state,
  createLoading: true,
});

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

const deleteBoxStart = state => ({
  ...state,
  deleteLoading: true,
});

const deleteBoxSuccess = (state, action) => {
  const indexToRemove = state.boxes.map(box => box.id)
    .indexOf(action.id);
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

const editBoxStart = state => ({
  ...state,
  editLoading: true,
});

const editBoxSuccess = (state, action) => {
  const indexToEdit = state.boxes.map(box => box.id)
    .indexOf(action.box.flashcardbox.id);
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

const newFlashcardboxId = (state, action) => ({
  ...state,
  flashcardboxId: action.id,
});
const newFlashcardboxTitle = (state, action) => ({
  ...state,
  flashcardboxTitle: action.title,
});

const shareBoxStart = state => ({
  ...state,
  shareLoading: true,
});

const shareBoxSuccess = (state, action) => {
  const indexToUpdate = state.boxes.findIndex(box => box.id === action.flashcardbox.id);
  const newFlashcardboxes = Array.from(state.boxes);
  newFlashcardboxes[indexToUpdate] = action.flashcardbox;

  return ({
    ...state,
    boxes: newFlashcardboxes,
    shareLoading: false,
    error: action.error,
  });
};

const shareBoxFail = (state, action) => ({
  ...state,
  shareLoading: false,
  error: action.error,
});

const stopShareBoxStart = state => ({
  ...state,
  shareLoading: true,
});

const stopShareBoxSuccess = (state, action) => {
  const indexToUpdate = state.boxes.findIndex(box => box.id === action.flashcardbox.id);
  const newFlashcardboxes = Array.from(state.boxes);
  newFlashcardboxes[indexToUpdate] = action.flashcardbox;

  return ({
    ...state,
    boxes: newFlashcardboxes,
    shareLoading: false,
    error: action.error,
  });
};

const stopShareBoxFail = (state, action) => ({
  ...state,
  shareLoading: false,
  error: action.error,
});

const unfollowBoxStart = state => ({
  ...state,
  shareLoading: true,
});

const unfollowBoxSuccess = (state, action) => {
  const indexToRemove = state.boxes.findIndex(box => box.id === action.flashcardbox);
  const newFlashcardboxes = Array.from(state.boxes);
  newFlashcardboxes.splice(indexToRemove, 1);

  return ({
    ...state,
    boxes: newFlashcardboxes,
    shareLoading: false,
    error: action.error,
  });
};

const unfollowBoxFail = (state, action) => ({
  ...state,
  shareLoading: false,
  error: action.error,
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
    case NEW_FLASHCARDBOX_ID:
      return newFlashcardboxId(state, action);
    case NEW_FLASHCARDBOX_TITLE:
      return newFlashcardboxTitle(state, action);
    case SHARE_BOX_START:
      return shareBoxStart(state);
    case SHARE_BOX_SUCCESS:
      return shareBoxSuccess(state, action);
    case SHARE_BOX_FAIL:
      return shareBoxFail(state, action);
    case STOP_SHARE_BOX_START:
      return stopShareBoxStart(state);
    case STOP_SHARE_BOX_SUCCESS:
      return stopShareBoxSuccess(state, action);
    case STOP_SHARE_BOX_FAIL:
      return stopShareBoxFail(state, action);
    case UNFOLLOW_BOX_START:
      return unfollowBoxStart(state);
    case UNFOLLOW_BOX_SUCCESS:
      return unfollowBoxSuccess(state, action);
    case UNFOLLOW_BOX_FAIL:
      return unfollowBoxFail(state, action);
    default:
      return state;
  }
};

export default boxesReducer;
