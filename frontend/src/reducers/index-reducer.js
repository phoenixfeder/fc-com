import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import flashcardReducer from './flashcard-reducers';
import snackbarReducer from './notistack-snackbar-reducers';
import boxesReducer from './flashcardboxes-reducer';

const allReducers = combineReducers({
  flashcards: flashcardReducer,
  flashcardboxes: boxesReducer,
  snackbars: snackbarReducer,
  auth: authReducer,
});

export default allReducers;
