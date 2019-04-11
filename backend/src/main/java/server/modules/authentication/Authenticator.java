package server.modules.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import server.entities.User;
import server.entities.dto.RequestDTO;
import server.entities.dto.request.Session;
import server.exceptions.PermissionDeniedException;
import server.exceptions.WrongFormatException;
import server.exceptions.WrongPasswordException;
import server.modules.dbConnector.SessionConnector;
import server.modules.dbConnector.UserConnector;

import java.time.LocalDateTime;

@Component
public class Authenticator {

    final private SessionConnector sessionConnector;
    final private PasswordEncoder passwordEncoder;
    final private UserConnector userConnector;

    @Autowired
    public Authenticator(SessionConnector sessionConnector, PasswordEncoder passwordEncoder, UserConnector userConnector) {
        this.sessionConnector = sessionConnector;
        this.passwordEncoder = passwordEncoder;
        this.userConnector = userConnector;
    }

    public User authenticate(RequestDTO requestDTO) throws PermissionDeniedException {
        try {
            Session sessionObj = requestDTO.getSession();
            String session = sessionObj.getSession();
            String hash = sessionObj.getHash();

            if (session == null || hash == null || !sessionConnector.existsBySession(session)) {
                throw new PermissionDeniedException();
            }

            server.entities.Session authenticate = sessionConnector.findBySession(session);

            if (!passwordEncoder.matches(String.valueOf(authenticate.getId()), hash)) {
                throw new PermissionDeniedException();
            }

            if (authenticate.getExpiryDate().isBefore(LocalDateTime.now())) {
                sessionConnector.delete(authenticate);
                throw new PermissionDeniedException();
            }
            authenticate.updateExpireDate();
            authenticate = sessionConnector.save(authenticate);

            return userConnector.getUserByID(authenticate.getId());

        } catch (Exception e) {
            throw new PermissionDeniedException();
        }
    }

    public boolean isPasswordCorrect(User user, String password) {
        if(password == null) {
            return false;
        }
        return passwordEncoder.matches(password, user.getPassword());
    }
}
