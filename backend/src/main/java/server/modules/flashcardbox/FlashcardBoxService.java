package server.modules.flashcardbox;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.entities.FlashCardBox;
import server.entities.User;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.repositories.UserRepository;
import server.exceptions.FccExcpetion;
import server.modules.authentication.Authenticator;
import server.modules.dbConnector.FlashCardBoxConnector;
import server.modules.utils.DTOContentParser;
import server.modules.utils.StatusDTO;

import java.util.List;
import java.util.Set;

@Service
public class FlashcardBoxService {

    private final Authenticator authenticator;
    private final FlashCardBoxConnector flashCardBoxConnector;

    private final UserRepository userRepository;

    @Autowired
    public FlashcardBoxService(Authenticator authenticator, FlashCardBoxConnector flashCardBoxConnector, UserRepository userRepository) {
        this.authenticator = authenticator;
        this.flashCardBoxConnector = flashCardBoxConnector;
        this.userRepository = userRepository;
    }

    public ResponseDTO addBox(RequestDTO requestDTO) throws FccExcpetion {

        //User = authenticate
        User user = authenticator.authenticate(requestDTO);

        //format check

        //Create Box, set Owner

        return StatusDTO.OK();
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
        return StatusDTO.OK();
    }
}
