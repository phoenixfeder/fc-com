import {
  BACKEND_URL_LEARNING_ANSWER,
  BACKEND_URL_GET_FLASHCARDS,
} from '../utils/const-paths';

import {
  SET_LEARNING_CARDS_START,
  SET_LEARNING_CARDS_SUCCESS,
  SET_LEARNING_CARDS_FAIL,
  ANSWER_CARD_START,
  ANSWER_CARD_SUCCESS,
  ANSWER_CARD_FAIL,
} from '../utils/const-actiontypes';
import { enqueueSnackbar } from './notistack-snackbar-actions';
import { store } from '../store';

const setLearningCardsStart = () => ({
  type: SET_LEARNING_CARDS_START,
});

const setLearningCardsSuccess = cards => ({
  type: SET_LEARNING_CARDS_SUCCESS,
  cards,
});

const setLearningCardsFail = errorarg => ({
  type: SET_LEARNING_CARDS_FAIL,
  error: errorarg,
});

/*
  decks: [
    {
      id: 123,
      decks: ["A", "B", "F"],
    },
    {
      id: 2,
      decks: ["B"],
    }
  ]
*/
export const setLearningCards = decks => dispatch => {
  dispatch(setLearningCardsStart());
  const authState = store.getState().auth;
  let cardsToLearn = [];
  const promises = []; // Push all fetches in this array

  decks.forEach(box => {
    promises.push(
      fetch(BACKEND_URL_GET_FLASHCARDS, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authentication: {
            session: authState.session,
            hash: authState.sessionHash,
          },
          flashcardboxes: {
            id: box.id,
          },
        }),
      })
        .then(results => results.json())
        .then(result => {
          switch (result.status.code) {
            case 200:
              // Adds all flashcards to the array that have the same deck as the given deck array of a box
              // Heftig was so in einer Zeile geht, einfach krank.
              cardsToLearn = cardsToLearn.concat(result.flashcards.filter(flashcard => box.decks.includes(flashcard.deck)));
              break;

            default:
              dispatch(setLearningCardsFail(result.status.message));
              dispatch(enqueueSnackbar({
                message: 'This should not happen. Please contact system admin.',
                options: {
                  variant: 'error',
                },
              }));
              break;
          }
        })
        .catch(err => {
          dispatch(setLearningCardsFail(err));
          dispatch(enqueueSnackbar({
            message: 'This should not happen. Please contact system admin.',
            options: {
              variant: 'error',
            },
          }));
        }),
    );
  });

  // Waits for all fetches to be finished
  Promise.all(promises).then(() => {
    // Shuffle cards array here?
    console.log(cardsToLearn);
    dispatch(setLearningCardsSuccess(cardsToLearn));
  });
};

const answerCardStart = () => ({
  type: ANSWER_CARD_START,
});

const answerCardSuccess = card => ({
  type: ANSWER_CARD_SUCCESS,
  card,
});

const answerCardFail = errorarg => ({
  type: ANSWER_CARD_FAIL,
  error: errorarg,
});

/*
  card: {
    id: 12345,
    correct: true
  }
*/
export const answerCard = card => dispatch => {
  const authState = store.getState().auth;
  dispatch(answerCardStart());

  fetch(BACKEND_URL_LEARNING_ANSWER, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authentication: {
        session: authState.session,
        hash: authState.sessionHash,
      },
      flashcards: [
        card,
      ],
    }),
  })
    .then(results => results.json())
    .then(result => {
      switch (result.status.code) {
        case 200:
          dispatch(answerCardSuccess(result.flashcards[0]));
          break;

        default:
          dispatch(answerCardFail(result.status.message));
          dispatch(enqueueSnackbar({
            message: 'This should not happen. Please contact system admin.',
            options: {
              variant: 'error',
            },
          }));
          break;
      }
    })
    .catch(err => {
      dispatch(answerCardFail(err));
      dispatch(enqueueSnackbar({
        message: 'This should not happen. Please contact system admin.',
        options: {
          variant: 'error',
        },
      }));
    });
};
