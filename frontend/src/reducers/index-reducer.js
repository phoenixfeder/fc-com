import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import flashcardReducer from './flashcard-reducers';
import flashcardsReducer from './flashcards-reducer';
import snackbarReducer from './notistack-snackbar-reducers';
import boxesReducer from './flashcardboxes-reducer';


const allReducers = combineReducers({
  flashcards: flashcardReducer,
  flashcardsOverview: flashcardsReducer,
  flashcardboxes: boxesReducer,
  snackbars: snackbarReducer,
  auth: authReducer,
});

export default allReducers;
