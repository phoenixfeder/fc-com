import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import flashcardReducer from './flashcard-reducers';
import snackbarReducer from './notistack-snackbar-reducers';

const allReducers = combineReducers({
  flashcards: flashcardReducer,
  snackbars: snackbarReducer,
  auth: authReducer,
});

export default allReducers;
