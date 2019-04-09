package server.modules.flashcardbox;

import org.springframework.stereotype.Service;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.exceptions.FccExcpetion;
import server.modules.utils.StatusDTO;

@Service
public class FlashcardBoxService {
    public ResponseDTO addBox(RequestDTO requestDTO) throws FccExcpetion {

        //User = authenticate

        //format check

        //reate Box, set Owner

        return StatusDTO.OK();
    }

    public ResponseDTO getBox(RequestDTO requestDTO) throws FccExcpetion {

        //User = authenticate

        //format check

        //Get Boxes where User == owner and Viewable Rights

        //Return List DTO

        return StatusDTO.OK();
    }

    public ResponseDTO editBox(RequestDTO requestDTO) throws FccExcpetion {
        return StatusDTO.OK();
    }

    public ResponseDTO deleteBox(RequestDTO requestDTO) throws FccExcpetion {
        return StatusDTO.OK();
    }
}
