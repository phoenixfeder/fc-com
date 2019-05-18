package server.modules.learning;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.entities.FlashCard;
import server.entities.FlashCardStatistics;
import server.entities.User;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.dto.request.Flashcard;
import server.exceptions.FccExcpetion;
import server.exceptions.PermissionDeniedException;
import server.exceptions.WrongFormatException;
import server.modules.authentication.Authenticator;
import server.modules.dbconnector.FlashCardStatisticsConnector;
import server.modules.dbconnector.FlashcardConnector;
import server.modules.utils.StatusDTO;

import java.util.ArrayList;
import java.util.List;

@Service
public class LearningService {

    private final Authenticator authenticator;
    private final FlashcardConnector flashcardConnector;
    private final FlashCardStatisticsConnector flashCardStatisticsConnector;

    @Autowired
    public LearningService(Authenticator authenticator, FlashcardConnector flashcardConnector, FlashCardStatisticsConnector flashCardStatisticsConnector) {
        this.authenticator = authenticator;
        this.flashcardConnector = flashcardConnector;
        this.flashCardStatisticsConnector = flashCardStatisticsConnector;
    }

    public ResponseDTO learned(RequestDTO requestDTO) throws FccExcpetion {
        User user = authenticator.authenticate(requestDTO);

        List<Flashcard> flashcardList = requestDTO.getFlashcardList();

        if(flashcardList == null){
            throw new WrongFormatException();
        }

        //update every CardStatistic
        List<server.entities.dto.response.Flashcard> flashcards = new ArrayList<>();
        flashcardList.forEach(flashcard -> {
            server.entities.dto.response.Flashcard flashcardResponse = updateStatistic(flashcard, user);
            if(flashcardResponse != null) {
                flashcards.add(flashcardResponse);
            }
        });

        ResponseDTO responseDTO = StatusDTO.ok();
        responseDTO.setFlashCards(flashcards);
        return responseDTO;
    }

    private server.entities.dto.response.Flashcard updateStatistic(Flashcard flashcard, User user){
        FlashCard flashCard = flashcardConnector.getById(flashcard.getId());
        FlashCardStatistics flashCardStatistics = flashCardStatisticsConnector.getStatisticsByFlashCardAndUser(flashCard, user);
        if(flashCardStatistics == null){
            return null;
        }
        flashCardStatistics = CardManipulator.manipulate(flashCardStatistics, flashcard.isCorrect());
        flashCardStatistics = flashCardStatisticsConnector.saveStatistics(flashCardStatistics);
        return new server.entities.dto.response.Flashcard(flashCard.getId(), flashCard.getTitle(), flashCard.getFrontText(), flashCard.getBackText(), flashCardStatistics.getDeck());
    }
}
