package server.modules.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.entities.FlashCard;
import server.entities.FlashCardBox;
import server.entities.FlashCardStatistics;
import server.entities.User;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.dto.response.DashboardResponse;
import server.exceptions.FccExcpetion;
import server.modules.authentication.Authenticator;
import server.modules.dbconnector.FlashCardBoxConnector;
import server.modules.dbconnector.FlashCardStatisticsConnector;
import server.modules.dbconnector.FlashcardConnector;
import server.modules.utils.StatusDTO;

import java.util.Collection;
import java.util.List;

@Service
public class DashboardService {

    private Authenticator authenticator;
    private FlashCardBoxConnector flashCardBoxConnector;
    private FlashcardConnector flashcardConnector;
    private FlashCardStatisticsConnector flashCardStatisticsConnector;

    @Autowired
    public DashboardService(Authenticator authenticator, FlashCardBoxConnector flashCardBoxConnector, FlashcardConnector flashcardConnector, FlashCardStatisticsConnector flashCardStatisticsConnector) {
        this.authenticator = authenticator;
        this.flashCardBoxConnector = flashCardBoxConnector;
        this.flashcardConnector = flashcardConnector;
        this.flashCardStatisticsConnector = flashCardStatisticsConnector;
    }

    public ResponseDTO getDashBoard(RequestDTO requestDTO) throws FccExcpetion {
        User user = authenticator.authenticate(requestDTO);

        ResponseDTO responseDTO = StatusDTO.ok();

        List<FlashCardStatistics> flashCardStatistics = flashCardStatisticsConnector.getStatisticsByUser(user);
        DashboardResponse dashboardResponse = getDashboardResponseOfStatistics(flashCardStatistics);
        handleUsersOwnBoxes(user, dashboardResponse);
        handleUsersForeignBoxes(user, dashboardResponse);
        correctNumberOfCardsInDeckA(dashboardResponse);
        responseDTO.setDashboard(dashboardResponse);

        return responseDTO;
    }

    private DashboardResponse getDashboardResponseOfStatistics(List<FlashCardStatistics> statistics) {
        DashboardResponse response = new DashboardResponse();

        long total = 0L;
        long successes = 0L;
        long failed = 0l;
        long[] inDeck = new long[5];
        for (FlashCardStatistics statistic : statistics) {
            total += statistic.getTrials();
            successes += statistic.getTrials() - statistic.getFailedTrials();
            failed += statistic.getFailedTrials();
            int deckIndex = statistic.getDeck() - 'A';
            inDeck[deckIndex]++;
        }

        response.setTotalTrials(total);
        response.setSuccessfulTrials(successes);
        response.setFailedTrials(failed);
        response.setCardsInDecks(inDeck);

        return response;
    }

    private void handleUsersOwnBoxes(User user, DashboardResponse dashboardResponse) {
        List<FlashCardBox> ownBoxesList = flashCardBoxConnector.getAllBoxFromUser(user);
        dashboardResponse.setOwnCards ((long) ownBoxesList.size());
        dashboardResponse.setOwnCards(getNumberOfCardsInBoxes(ownBoxesList));
    }

    private void handleUsersForeignBoxes(User user, DashboardResponse dashboardResponse) {
        dashboardResponse.setAccessToForeignBoxes((long) user.getViewableBoxes().size());
        dashboardResponse.setAccessToForeignCards(getNumberOfCardsInBoxes(user.getViewableBoxes()));
    }

    private long getNumberOfCardsInBoxes(Collection<FlashCardBox> boxList) {
        long total = 0;
        for (FlashCardBox box : boxList) {
            List<FlashCard> flashCards = flashcardConnector.getByFlashCardBox(box);
            total = flashCards.size();
        }

        return total;
    }

    private void correctNumberOfCardsInDeckA(DashboardResponse dashboardResponse) {
        long cardsNotInDeckA = 0;
        Long[] cardsInDecks = dashboardResponse.getCardsInDecks();
        for (int i = 1; i < cardsInDecks.length; i++) {
            cardsNotInDeckA += cardsInDecks[i];
        }
        cardsInDecks[0] = dashboardResponse.getOwnCards() + dashboardResponse.getAccessToForeignCards() - cardsNotInDeckA;
    }
}
