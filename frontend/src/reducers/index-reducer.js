import {combineReducers} from 'redux';
import flashcardReducer from './flashcard-reducers'

const allReducers = combineReducers({flashcardReducer});

export default allReducers;