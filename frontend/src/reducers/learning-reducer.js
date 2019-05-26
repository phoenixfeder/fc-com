import {
  SET_LEARNING_CARDS_START,
  SET_LEARNING_CARDS_SUCCESS,
  SET_LEARNING_CARDS_FAIL,
  ANSWER_CARD_START,
  ANSWER_CARD_SUCCESS,
  ANSWER_CARD_FAIL,
  LEARNING_FINISHED,
} from '../utils/const-actiontypes';

const initialState = {
  loading: false,
  answerLoading: false,
  learningFinished: false,
  error: false,
  cards: [],
};

const setLearningCardsStart = (state) => ({
  ...state,
  loading: true,
});

const setLearningCardsSuccess = (state, action) => ({
  ...state,
  loading: false,
  cards: action.cards,
});

const setLearningCardsFail = (state, action) => ({
  ...state,
  loading: false,
  error: action.error,
});

const answerCardStart = (state) => ({
  ...state,
  answerLoading: true,
});

const answerCardSuccess = (state, action) => {
  console.log(action);
  const indexToUpdate = state.cards.findIndex(card => card.id === action.card.id);
  const newCards = Array.from(state.cards);
  newCards[indexToUpdate] = action.card;

  return ({
    ...state,
    loading: false,
    cards: newCards,
  });
};

const answerCardFail = (state, action) => ({
  ...state,
  loading: false,
  error: action.error,
});

const setLearningFinished = (state, action) => ({
  ...state,
  learningFinished: action.learningFinished,
});

const learningReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEARNING_CARDS_START:
      return setLearningCardsStart(state);
    case SET_LEARNING_CARDS_SUCCESS:
      return setLearningCardsSuccess(state, action);
    case SET_LEARNING_CARDS_FAIL:
      return setLearningCardsFail(state, action);
    case ANSWER_CARD_START:
      return answerCardStart(state);
    case ANSWER_CARD_SUCCESS:
      return answerCardSuccess(state, action);
    case ANSWER_CARD_FAIL:
      return answerCardFail(state, action);
    case LEARNING_FINISHED:
      return setLearningFinished(state, action);
    default:
      return state;
  }
};

export default learningReducer;
