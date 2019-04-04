package server.modules.authentication;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.exceptions.WrongFormatException;
import server.modules.utils.StatusDTO;

@Service
public class AuthService {
    public ResponseDTO login(RequestDTO requestDTO) throws WrongFormatException {
        throw new WrongFormatException();
        //return StatusDTO.OK();
    }

    public ResponseDTO logout(RequestDTO requestDTO) {
        return StatusDTO.OK();
    }
}
