package server.modules.flashcardbox;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.entities.FlashCardBox;
import server.entities.User;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.dto.request.FlashCardBoxRequest;
import server.entities.dto.response.FlashCardBoxResponse;
import server.exceptions.FccExcpetion;
import server.exceptions.PermissionDeniedException;
import server.exceptions.UserNotFoundException;
import server.modules.authentication.Authenticator;
import server.modules.dbconnector.FlashCardBoxConnector;
import server.modules.dbconnector.FlashcardConnector;
import server.modules.dbconnector.UserConnector;
import server.modules.utils.DTOContentParser;
import server.modules.utils.StatusDTO;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FlashcardBoxService {

    private final Authenticator authenticator;
    private final FlashCardBoxConnector flashCardBoxConnector;
    private final FlashcardConnector flashcardConnector;
    private final UserConnector userConnector;

    @Autowired
    public FlashcardBoxService(Authenticator authenticator, FlashCardBoxConnector flashCardBoxConnector, FlashcardConnector flashcardConnector, UserConnector userConnector) {
        this.authenticator = authenticator;
        this.flashCardBoxConnector = flashCardBoxConnector;
        this.flashcardConnector = flashcardConnector;
        this.userConnector = userConnector;
    }

    public ResponseDTO addBox(RequestDTO requestDTO) throws FccExcpetion {

        User user = authenticator.authenticate(requestDTO);

        FlashCardBoxRequest flashCardBoxRequest = DTOContentParser.getFlashCardBox(requestDTO);

        FlashCardBox flashCardBox = new FlashCardBox(flashCardBoxRequest.getTitle(), flashCardBoxRequest.getDescription());
        flashCardBox.setOwner(user);
        flashCardBox.setCreationDate(LocalDateTime.now());
        flashCardBox.setLastChanged(LocalDateTime.now());
        return createResponseWithBoxes(flashCardBox);
    }

    public ResponseDTO getBox(RequestDTO requestDTO) throws FccExcpetion {

        User user = authenticator.authenticate(requestDTO);

        List<FlashCardBox> flashCardBoxes = flashCardBoxConnector.getAllBoxFromUser(user);
        flashCardBoxes.addAll(user.getViewableBoxes());
        flashCardBoxes.forEach(flashCardBox -> flashCardBox.setFlashcards(flashcardConnector));

        ResponseDTO responseDTO = StatusDTO.ok();
        responseDTO.setFlashCardBoxResponses(DTOContentParser.parseFlashcardBoxEntities(flashCardBoxes, user));

        return responseDTO;
    }

    public ResponseDTO editBox(RequestDTO requestDTO) throws FccExcpetion {
        User user = authenticator.authenticate(requestDTO);

        FlashCardBoxRequest flashCardBoxRequest = DTOContentParser.getFlashCardBox(requestDTO);

        FlashCardBox flashCardBox = flashCardBoxConnector.getBoxByIdAndUser(flashCardBoxRequest.getId(), user);

        if (flashCardBox == null) {
            throw new PermissionDeniedException();
        }

        if (flashCardBoxRequest.getTitle() != null) {
            flashCardBox.setTitle(flashCardBoxRequest.getTitle());
            flashCardBox.setLastChanged(LocalDateTime.now());
        }
        if (flashCardBoxRequest.getDescription() != null) {
            flashCardBox.setDescription(flashCardBoxRequest.getDescription());
            flashCardBox.setLastChanged(LocalDateTime.now());
        }
        return createResponseWithBoxes(flashCardBox);
    }

    public ResponseDTO deleteBox(RequestDTO requestDTO) throws FccExcpetion {
        User user = authenticator.authenticate(requestDTO);

        Long id = DTOContentParser.getFlashCardBoxID(requestDTO);

        flashcardConnector.deleteByFlashCardBox(flashCardBoxConnector.getBoxByIdAndUser(id,user));
        flashCardBoxConnector.deleteByIdAndUser(user, id);

        return StatusDTO.ok();
    }

    public ResponseDTO shareBox(RequestDTO requestDTO) throws FccExcpetion {
        User user = authenticator.authenticate(requestDTO);

        FlashCardBox box = determineSharedBox(requestDTO, user);
        User sharedUser = determineSharedUser(requestDTO);

        if (sharedUser == user) {
            //TODO Fehlermeldung?
        } else {
            sharedUser.getViewableBoxes().add(box);
            userConnector.save(sharedUser);
        }
        box.setFlashcards(flashcardConnector);

        ResponseDTO responseDTO = StatusDTO.ok();
        responseDTO.setFlashCardBoxResponses(new FlashCardBoxResponse(box, true));
        return responseDTO;
    }

    public ResponseDTO revertSharingBox(RequestDTO requestDTO) throws FccExcpetion {
        User user = authenticator.authenticate(requestDTO);

        FlashCardBox box = determineSharedBox(requestDTO, user);
        User sharedUser = determineSharedUser(requestDTO);

        if (sharedUser.getViewableBoxes().contains(box)){
            sharedUser.getViewableBoxes().remove(box);
            userConnector.save(sharedUser);
        } else {
            //TODO Fehlermeldung?
        }
        box.setFlashcards(flashcardConnector);

        ResponseDTO responseDTO = StatusDTO.ok();
        responseDTO.setFlashCardBoxResponses(new FlashCardBoxResponse(box, true));
        return responseDTO;
    }

    private ResponseDTO createResponseWithBoxes(FlashCardBox flashCardBox){
        FlashCardBox newBox = flashCardBoxConnector.save(flashCardBox);
        newBox.setFlashcards(flashcardConnector);
        ResponseDTO responseDTO = StatusDTO.ok();
        FlashCardBoxResponse flashCardBoxResponse = new FlashCardBoxResponse(newBox.getId(), newBox.getTitle(), newBox.getDescription(), newBox.getCreationDate(), newBox.getLastChanged(), newBox.getFlashcards(), new ArrayList<>(), true);
        responseDTO.setFlashCardBoxResponses(flashCardBoxResponse);

        return responseDTO;
    }

    private FlashCardBox determineSharedBox(RequestDTO requestDTO, User user) throws FccExcpetion {
        Long id = DTOContentParser.getFlashCardBoxID(requestDTO);
        FlashCardBox box = flashCardBoxConnector.getBoxByIdAndUser(id, user);
        if (box == null) {
            throw new PermissionDeniedException();
        }

        return box;
    }

    private User determineSharedUser(RequestDTO requestDTO) throws FccExcpetion {
        String sharedUserName = requestDTO.getFlashCardBoxRequest().getSharingUserName();
        User sharedUser = userConnector.getUserByName(sharedUserName);
        if (sharedUser == null) {
            throw new UserNotFoundException();
        }

        return sharedUser;
    }
}
