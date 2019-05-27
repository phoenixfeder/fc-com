package server.modules.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
import server.modules.utils.StatusDTO;

import java.util.List;

@Service
public class DashboardService {

    private Authenticator authenticator;
    private FlashCardBoxConnector flashCardBoxConnector;
    private FlashCardStatisticsConnector flashCardStatisticsConnector;

    @Autowired
    public DashboardService(Authenticator authenticator, FlashCardBoxConnector flashCardBoxConnector, FlashCardStatisticsConnector flashCardStatisticsConnector) {
        this.authenticator = authenticator;
        this.flashCardBoxConnector = flashCardBoxConnector;
        this.flashCardStatisticsConnector = flashCardStatisticsConnector;
    }

    public ResponseDTO getDashBoard(RequestDTO requestDTO) throws FccExcpetion {
        User user = authenticator.authenticate(requestDTO);

        ResponseDTO responseDTO = StatusDTO.ok();

        List<FlashCardStatistics> flashCardStatistics = flashCardStatisticsConnector.getStatisticsByUser(user);
        DashboardResponse dashboardResponse = getDashboardResponseOfStatistics(flashCardStatistics);
        dashboardResponse.setOwnBoxes(getNumberOfOwnBoxes(user));
        dashboardResponse.setAccesToForeignBoxes(getNumberOfForeignBoxes(user));
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

    private Long getNumberOfOwnBoxes(User user) {
        List<FlashCardBox> boxList = flashCardBoxConnector.getAllBoxFromUser(user);
        return (long) boxList.size();
    }

    private Long getNumberOfForeignBoxes(User user) {
        return (long) user.getViewableBoxes().size();
    }
}
