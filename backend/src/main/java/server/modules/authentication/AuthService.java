package server.modules.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.entities.Session;
import server.entities.User;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.dto.request.UserRequest;
import server.exceptions.FccExcpetion;
import server.exceptions.UserNotEnabledException;
import server.exceptions.WrongUsernameOrPasswordException;
import server.modules.dbconnector.SessionConnector;
import server.modules.dbconnector.UserConnector;
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
        if (!authenticator.isPasswordCorrect(user, userRequest.getPassword())) {
            throw new WrongUsernameOrPasswordException();
        }

        if (!user.isEnabled()) {
            throw new UserNotEnabledException();
        }

        String session;
        do {
            session = UUID.randomUUID().toString();
        } while (sessionConnector.existsBySession(session));
        Session newSession = sessionConnector.save(new Session(session, user));

        return StatusDTO.okWithSession(authenticator.encodePassword(String.valueOf(newSession.getId())), session, user.getUsername(), user.getId());
    }

    public ResponseDTO logout(RequestDTO requestDTO) throws FccExcpetion {
        User user = authenticator.authenticate(requestDTO);
        sessionConnector.deleteByUser(user);
        return StatusDTO.ok();
    }
}
