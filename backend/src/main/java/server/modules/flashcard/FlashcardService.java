package server.modules.flashcard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.entities.FlashCard;
import server.entities.FlashCardBox;
import server.entities.FlashCardStatistics;
import server.entities.User;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.dto.request.FlashcardRequest;
import server.entities.dto.response.Flashcard;
import server.exceptions.FccExcpetion;
import server.exceptions.PermissionDeniedException;
import server.modules.authentication.Authenticator;
import server.modules.dbconnector.FlashCardBoxConnector;
import server.modules.dbconnector.FlashCardStatisticsConnector;
import server.modules.dbconnector.FlashcardConnector;
import server.modules.utils.DTOContentParser;
import server.modules.utils.StatusDTO;

import java.util.ArrayList;
import java.util.List;

@Service
public class FlashcardService {

    private final Authenticator authenticator;
    private final FlashcardConnector flashCardConnector;
    private final FlashCardBoxConnector flashCardBoxConnector;
    private final FlashCardStatisticsConnector flashCardStatisticsConnector;

    @Autowired
    public FlashcardService(Authenticator authenticator, FlashcardConnector flashCardConnector, FlashCardBoxConnector flashCardBoxConnector, FlashCardStatisticsConnector flashCardStatisticsConnector) {
        this.authenticator = authenticator;
        this.flashCardConnector = flashCardConnector;
        this.flashCardBoxConnector = flashCardBoxConnector;
        this.flashCardStatisticsConnector = flashCardStatisticsConnector;
    }

    public ResponseDTO addFlashcard(RequestDTO requestDTO) throws FccExcpetion {
        User user = authenticator.authenticate(requestDTO);

        Long boxId = DTOContentParser.getFlashcardRequestBoxID(requestDTO);
        FlashCardBox flashCardBox = flashCardBoxConnector.getBoxByIdAndUser(boxId, user);

        if (flashCardBox == null) {
            throw new PermissionDeniedException();
        }

        FlashcardRequest flashcardRequest = DTOContentParser.getFlashCard(requestDTO);
        FlashCard flashcard = new FlashCard(flashcardRequest.getTitle(), flashcardRequest.getFront(), flashcardRequest.getBack());
        flashcard.setFlashcardBox(flashCardBox);
        FlashCard newFlashCard = flashCardConnector.save(flashcard);

        FlashCardStatistics statistics = new FlashCardStatistics(flashcard, user);
        flashCardStatisticsConnector.saveStatistics(statistics);
        for (User sharedUser : flashCardBox.getSharedToUsers()) {
            statistics = new FlashCardStatistics(flashcard, sharedUser);
            flashCardStatisticsConnector.saveStatistics(statistics);
        }

        ResponseDTO responseDTO = StatusDTO.ok();
        Flashcard responseFlashcard = new Flashcard(newFlashCard.getId(), newFlashCard.getTitle(), newFlashCard.getFrontText(), newFlashCard.getBackText(), statistics.getDeck());
        responseDTO.setFlashCards(responseFlashcard);
        return responseDTO;
    }

    public ResponseDTO editFlashcard(RequestDTO requestDTO) throws FccExcpetion {
        User user = authenticator.authenticate(requestDTO);

        FlashcardRequest flashcardRequest = requestDTO.getFlashcardRequest();
        FlashCard flashCard = flashCardConnector.getById(flashcardRequest.getId());
        if (flashCard == null) {
            throw new PermissionDeniedException();
        }

        checkFlashCardBoxPermission(user, flashCard);
        if (flashcardRequest.getTitle() != null) {
            flashCard.setTitle(flashcardRequest.getTitle());
        }
        if(flashcardRequest.getBack() != null) {
            flashCard.setBackText(flashcardRequest.getBack());
        }
        if(flashcardRequest.getFront() != null) {
            flashCard.setFrontText(flashcardRequest.getFront());
        }

        FlashCard editedFlashCard = flashCardConnector.save(flashCard);

        ResponseDTO responseDTO = StatusDTO.ok();
        FlashCardStatistics flashCardStatistics = flashCardStatisticsConnector.getStatisticsByFlashCardAndUser(editedFlashCard, user);
        Flashcard responseFlashcard = new Flashcard(editedFlashCard.getId(), editedFlashCard.getTitle(), editedFlashCard.getFrontText(), editedFlashCard.getBackText(), flashCardStatistics.getDeck());
        responseDTO.setFlashCards(responseFlashcard);
        return responseDTO;
    }

    public ResponseDTO deleteFlashcardById(RequestDTO requestDTO) throws FccExcpetion {
        User user = authenticator.authenticate(requestDTO);

        FlashCard flashCard = flashCardConnector.getById(requestDTO.getFlashcardRequest().getId());
        if (flashCard == null) {
            throw new PermissionDeniedException();
        }

        checkFlashCardBoxPermission(user, flashCard);
        flashCardConnector.deleteById(flashCard.getId());

        return StatusDTO.ok();
    }

    public ResponseDTO getFlashCardsOfFlashCardBox(RequestDTO requestDTO) throws FccExcpetion {
        User user = authenticator.authenticate(requestDTO);

        Long boxId = DTOContentParser.getFlashCardBoxID(requestDTO);
        FlashCardBox flashCardBox = flashCardBoxConnector.getBoxByIdAndUser(boxId, user);
        if (flashCardBox == null) {
            flashCardBox = flashCardBoxConnector.getSharedBoxByIdAndUser(boxId, user);
            if (flashCardBox == null) {
                throw new PermissionDeniedException();
            }
        }

        List<FlashCard> flashCards = flashCardConnector.getByFlashCardBox(flashCardBox);
        List<Flashcard> responseCards = new ArrayList<>();

        flashCards.forEach(flashCard -> {
            FlashCardStatistics flashCardStatistics = flashCardStatisticsConnector.getStatisticsByFlashCardAndUser(flashCard, user);
            responseCards.add(new Flashcard(flashCard.getId(), flashCard.getTitle(), flashCard.getFrontText(), flashCard.getBackText(), flashCardStatistics.getDeck()));
        });

        ResponseDTO responseDTO = StatusDTO.ok();
        responseDTO.setFlashCards(responseCards);
        return responseDTO;
    }

    private void checkFlashCardBoxPermission(User user, FlashCard flashCard) throws FccExcpetion {
        FlashCardBox flashCardBox = flashCard.getFlashcardBox();
        if (flashCardBox.getOwner() != user) {
            throw new PermissionDeniedException();
        }
    }
}
