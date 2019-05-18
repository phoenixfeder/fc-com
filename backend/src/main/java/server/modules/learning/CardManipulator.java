package server.modules.learning;

import server.entities.FlashCardStatistics;

public class CardManipulator {
    private static char[] bounds = {'A', 'E'};

    public static FlashCardStatistics manipulate(FlashCardStatistics flashCardStatistics, boolean correct){
        if(correct){
            return cardWasCorrect(flashCardStatistics);
        }
        return cardWasIncorrect(flashCardStatistics);
    }

    private static FlashCardStatistics cardWasCorrect(FlashCardStatistics flashCardStatistics) {
        flashCardStatistics.setDeck(stayInBoundAdding(flashCardStatistics.getDeck()));
        addTrial(flashCardStatistics);
        return flashCardStatistics;
    }

    private static FlashCardStatistics cardWasIncorrect(FlashCardStatistics flashCardStatistics) {
        flashCardStatistics.setDeck(bounds[0]);
        addFailedTrial(flashCardStatistics);
        return flashCardStatistics;
    }

    private static char stayInBoundAdding(char deck) {
        deck = (char) (deck + 1);
        if (deck > bounds[1]) {
            deck = bounds[1];
        }
        return deck;
    }

    private static void addTrial(FlashCardStatistics flashCardStatistics) {
        flashCardStatistics.setTrials(flashCardStatistics.getTrials() + 1);
    }

    private static void addFailedTrial(FlashCardStatistics flashCardStatistics) {
        flashCardStatistics.setFailedTrials(flashCardStatistics.getFailedTrials() + 1);
        addTrial(flashCardStatistics);
    }
}
