import {combineReducers} from 'redux';
import flashcardReducer from './flashcard-reducers'

const allReducers = combineReducers({flashcards: flashcardReducer});

export default allReducers;