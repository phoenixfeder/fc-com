package server.modules.flashcardbox;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.entities.FlashCard;
import server.entities.FlashCardBox;
import server.entities.User;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.dto.request.FlashCardBoxRequest;
import server.entities.dto.response.Box;
import server.entities.repositories.UserRepository;
import server.exceptions.FccExcpetion;
import server.modules.authentication.Authenticator;
import server.modules.dbConnector.FlashCardBoxConnector;
import server.modules.utils.DTOContentParser;
import server.modules.utils.StatusDTO;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class FlashcardBoxService {

    private final Authenticator authenticator;
    private final FlashCardBoxConnector flashCardBoxConnector;


    @Autowired
    public FlashcardBoxService(Authenticator authenticator, FlashCardBoxConnector flashCardBoxConnector) {
        this.authenticator = authenticator;
        this.flashCardBoxConnector = flashCardBoxConnector;
    }

    public ResponseDTO addBox(RequestDTO requestDTO) throws FccExcpetion {

        User user = authenticator.authenticate(requestDTO);

        FlashCardBoxRequest flashCardBoxRequest = DTOContentParser.getFlashCardBox(requestDTO);

        FlashCardBox flashCardBox = new FlashCardBox(flashCardBoxRequest.getTitle(), flashCardBoxRequest.getDescription());
        flashCardBox.setOwner(user);
        flashCardBox.setCreationDate(LocalDateTime.now());
        flashCardBox.setLastChanged(LocalDateTime.now());
        flashCardBox = flashCardBoxConnector.save(flashCardBox);

        ResponseDTO responseDTO = StatusDTO.OK();
        Box box = new Box(flashCardBox.getId(), flashCardBox.getTitle(), flashCardBox.getDescription(), flashCardBox.getCreationDate(), flashCardBox.getLastChanged());
        responseDTO.setBoxes(box);
        return responseDTO;
    }

    public ResponseDTO getBox(RequestDTO requestDTO) throws FccExcpetion {

        User user = authenticator.authenticate(requestDTO);

        List<FlashCardBox> flashCardBoxes = flashCardBoxConnector.getAllBoxFromUser(user);

        ResponseDTO responseDTO = StatusDTO.OK();
        responseDTO.setBoxes(DTOContentParser.parseFlashcardBoxEntities(flashCardBoxes));

        return responseDTO;
    }

    public ResponseDTO editBox(RequestDTO requestDTO) throws FccExcpetion {
        return StatusDTO.OK();
    }

    public ResponseDTO deleteBox(RequestDTO requestDTO) throws FccExcpetion {
        User user = authenticator.authenticate(requestDTO);

        Long id = DTOContentParser.getFlashCardBoxID(requestDTO);
        flashCardBoxConnector.deleteByIdAndUser(user, id);

        return StatusDTO.OK();
    }
}
