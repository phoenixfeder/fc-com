package server.modules.learning;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.config.StatusCode;
import server.entities.User;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.exceptions.FccExcpetion;
import server.modules.authentication.Authenticator;
import server.modules.utils.StatusDTO;

@Service
public class LearningService {

    private final Authenticator authenticator;

    @Autowired
    public LearningService(Authenticator authenticator) {
        this.authenticator = authenticator;
    }

    public ResponseDTO learned(RequestDTO requestDTO) throws FccExcpetion {
        User user = authenticator.authenticate(requestDTO);

        return StatusDTO.ok();
    }
}
