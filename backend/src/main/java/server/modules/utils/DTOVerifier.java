package server.modules.utils;

import org.springframework.stereotype.Component;
import server.entities.dto.RequestDTO;
import server.exceptions.WrongFormatException;

@Component
public class DTOVerifier {

    public boolean isFormatForRegisterCorrect(RequestDTO requestDTO) {
        if(requestDTO == null || requestDTO.getRegisterRequest() == null
                || requestDTO.getRegisterRequest().getUserRequest() == null
                || requestDTO.getRegisterRequest().getUserRequest().getUsername() == null
                || requestDTO.getRegisterRequest().getUserRequest().getEmail() == null
                || requestDTO.getRegisterRequest().getUserRequest().getPassword() == null){
            return false;
        }

        return true;
    }
}
