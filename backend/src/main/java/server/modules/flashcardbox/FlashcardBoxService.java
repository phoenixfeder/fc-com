package server.modules.flashcardbox;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.entities.FlashCardBox;
import server.entities.User;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.dto.request.FlashCardBoxRequest;
import server.entities.dto.response.Box;
import server.exceptions.FccExcpetion;
import server.exceptions.PermissionDeniedException;
import server.modules.authentication.Authenticator;
import server.modules.dbconnector.FlashCardBoxConnector;
import server.modules.dbconnector.FlashcardConnector;
import server.modules.utils.DTOContentParser;
import server.modules.utils.StatusDTO;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FlashcardBoxService {

    private final Authenticator authenticator;
    private final FlashCardBoxConnector flashCardBoxConnector;
    private final FlashcardConnector flashcardConnector;


    @Autowired
    public FlashcardBoxService(Authenticator authenticator, FlashCardBoxConnector flashCardBoxConnector, FlashcardConnector flashcardConnector) {
        this.authenticator = authenticator;
        this.flashCardBoxConnector = flashCardBoxConnector;
        this.flashcardConnector = flashcardConnector;
    }

    public ResponseDTO addBox(RequestDTO requestDTO) throws FccExcpetion {

        User user = authenticator.authenticate(requestDTO);

        FlashCardBoxRequest flashCardBoxRequest = DTOContentParser.getFlashCardBox(requestDTO);

        FlashCardBox flashCardBox = new FlashCardBox(flashCardBoxRequest.getTitle(), flashCardBoxRequest.getDescription());
        flashCardBox.setOwner(user);
        flashCardBox.setCreationDate(LocalDateTime.now());
        flashCardBox.setLastChanged(LocalDateTime.now());
        FlashCardBox newBox = flashCardBoxConnector.save(flashCardBox);
        newBox.setFlashcards(flashcardConnector);

        ResponseDTO responseDTO = StatusDTO.ok();
        Box box = new Box(newBox.getId(), newBox.getTitle(), newBox.getDescription(), newBox.getCreationDate(), newBox.getLastChanged(), newBox.getFlashcards());
        responseDTO.setBoxes(box);
        return responseDTO;
    }

    public ResponseDTO getBox(RequestDTO requestDTO) throws FccExcpetion {

        User user = authenticator.authenticate(requestDTO);

        List<FlashCardBox> flashCardBoxes = flashCardBoxConnector.getAllBoxFromUser(user);
        flashCardBoxes.forEach(flashCardBox -> flashCardBox.setFlashcards(flashcardConnector));

        ResponseDTO responseDTO = StatusDTO.ok();
        responseDTO.setBoxes(DTOContentParser.parseFlashcardBoxEntities(flashCardBoxes));

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


        FlashCardBox newBox = flashCardBoxConnector.save(flashCardBox);
        newBox.setFlashcards(flashcardConnector);
        ResponseDTO responseDTO = StatusDTO.ok();
        Box box = new Box(newBox.getId(), newBox.getTitle(), newBox.getDescription(), newBox.getCreationDate(), newBox.getLastChanged(), newBox.getFlashcards());
        responseDTO.setBoxes(box);

        return responseDTO;
    }

    public ResponseDTO deleteBox(RequestDTO requestDTO) throws FccExcpetion {
        User user = authenticator.authenticate(requestDTO);

        Long id = DTOContentParser.getFlashCardBoxID(requestDTO);

        flashcardConnector.deleteByFlashCardBox(flashCardBoxConnector.getBoxByIdAndUser(id,user));
        flashCardBoxConnector.deleteByIdAndUser(user, id);

        return StatusDTO.ok();
    }
}
