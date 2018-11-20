import {combineReducers} from 'redux';
import flashcardReducer from './flashcard-reducers'
import snackbarReducer from "./notistack-snackbar-reducers";

const allReducers = combineReducers({flashcards: flashcardReducer, snackbars: snackbarReducer});

export default allReducers;