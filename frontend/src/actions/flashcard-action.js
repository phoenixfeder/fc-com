import { FLASHCARD_GOTTEN } from '../utils/const-actiontypes';

export const flashCardGotten = flashcard => ({
  type: FLASHCARD_GOTTEN,
  payload: flashcard,
});

export const updateFlashcard = () => ({});
