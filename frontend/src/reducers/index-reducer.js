import { combineReducers } from 'redux';
import flashcardReducer from './flashcard-reducers';
import snackbarReducer from './notistack-snackbar-reducers';
import authReducer from './auth-reducer';

const allReducers = combineReducers({
  flashcards: flashcardReducer,
  snackbars: snackbarReducer,
  auth: authReducer,
});

export default allReducers;
