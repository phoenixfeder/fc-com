package server.modules.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import server.config.StatusCode;
import server.entities.Session;
import server.entities.User;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.dto.request.UserRequest;
import server.entities.dto.response.StatusResponse;
import server.exceptions.FccExcpetion;
import server.exceptions.UserNotEnabledException;
import server.exceptions.WrongFormatException;
import server.exceptions.WrongUsernameOrPasswordException;
import server.modules.dbConnector.SessionConnector;
import server.modules.dbConnector.UserConnector;
import server.modules.utils.DTOContentParser;
import server.modules.utils.StatusDTO;

import java.util.UUID;

@Service
public class AuthService {

    private final Authenticator authenticator;
    private final SessionConnector sessionConnector;
    private final UserConnector userConnector;

    @Autowired
    public AuthService(Authenticator authenticator, SessionConnector sessionConnector, UserConnector userConnector) {
        this.authenticator = authenticator;
        this.sessionConnector = sessionConnector;
        this.userConnector = userConnector;
    }

    public ResponseDTO login(RequestDTO requestDTO) throws FccExcpetion {
        UserRequest userRequest = DTOContentParser.getUserRequest(requestDTO);
        User user = userConnector.getUserByNameOrEmail(userRequest);
        if(authenticator.isPasswordCorrect(user, userRequest.getPassword())){
            throw new WrongUsernameOrPasswordException();
        }

        if(!user.isEnabled()){
            throw new UserNotEnabledException();
        }

        String session;
        do{
            session = UUID.randomUUID().toString();
        }while(sessionConnector.existsBySession(session));
        Session newSession = sessionConnector.save(new Session(session, user));

        return StatusDTO.OKWITHSESSION(authenticator.encodePassword(String.valueOf(newSession.getId())), session, user.getUsername(), user.getId());
    }

    public ResponseDTO logout(RequestDTO requestDTO) throws FccExcpetion {
        User user = authenticator.authenticate(requestDTO);
        sessionConnector.deleteByUser(user);
        return StatusDTO.OK();
    }
}
