package server.modules.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import server.entities.User;
import server.entities.dto.RequestDTO;
import server.entities.dto.request.Session;
import server.entities.repositories.SessionRepository;
import server.exceptions.PermissionDeniedException;
import server.modules.dbConnector.UserConnector;

import java.time.LocalDateTime;

@Component
public class Authenticator {

    final private SessionRepository sessionRepository;
    final private PasswordEncoder passwordEncoder;
    final private UserConnector userConnector;

    @Autowired
    public Authenticator(SessionRepository sessionRepository, PasswordEncoder passwordEncoder, UserConnector userConnector) {
        this.sessionRepository = sessionRepository;
        this.passwordEncoder = passwordEncoder;
        this.userConnector = userConnector;
    }

    public User authenticate(RequestDTO requestDTO) throws PermissionDeniedException {
        //TODO REPOSITORY AUSTAUSCHEN

        try{
            Session sessionObj = requestDTO.getSession();
            String session = sessionObj.getSession();
            String hash = sessionObj.getHash();

            if(session == null || hash == null || !sessionRepository.existsBySession(session)){
                throw new PermissionDeniedException();
            }

            server.entities.Session authenticate = sessionRepository.findBySession(session);

            if(!passwordEncoder.matches(String.valueOf(authenticate.getId()), hash)){
                throw new PermissionDeniedException();
            }

            if(authenticate.getExpiryDate().isBefore(LocalDateTime.now())){
                sessionRepository.delete(authenticate);
                throw new PermissionDeniedException();
            }
            authenticate.updateExpireDate();
            authenticate = sessionRepository.save(authenticate);

            return userConnector.getUserByID(authenticate.getId());

        }catch(Exception e){
            throw new PermissionDeniedException();
        }
    }
}
