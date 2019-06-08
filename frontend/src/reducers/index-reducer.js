import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import flashcardsReducer from './flashcards-reducer';
import snackbarReducer from './notistack-snackbar-reducers';
import boxesReducer from './flashcardboxes-reducer';
import learningReducer from './learning-reducer';
import statReducer from './stat-reducer';

const allReducers = combineReducers({
  flashcardsOverview: flashcardsReducer,
  flashcardboxes: boxesReducer,
  learning: learningReducer,
  snackbars: snackbarReducer,
  auth: authReducer,
  stats: statReducer,
});

export default allReducers;
