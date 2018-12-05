package server.services.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import server.config.StatusCode;
import server.entities.dto.ResponseDTO;
import server.entities.dto.request.Session;
import server.entities.dto.response.StatusResponse;
import server.entities.repositories.SessionRepository;

import java.util.Calendar;

@Component
public class Authentication {
    final
    SessionRepository sessionRepository;

    final
    PasswordEncoder passwordEncoder;

    @Autowired
    public Authentication(SessionRepository sessionRepository, PasswordEncoder passwordEncoder) {
        this.sessionRepository = sessionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean authenticate(Session session){
        if(session == null || session.getHash() == null || session.getSession() == null){
            return false;
        }

        if(!sessionRepository.existsBySession(session.getSession())){
            return false;
        }

        server.entities.Session authenticate = sessionRepository.findBySession(session.getSession());

        if(!passwordEncoder.matches(String.valueOf(authenticate.getId()), session.getHash())){
            return false;
        }

        if(authenticate.getExpiryDate().before(Calendar.getInstance().getTime())){
            sessionRepository.delete(authenticate);
            return false;
        }

        authenticate.updateExpireDate();
        sessionRepository.save(authenticate);
        return true;

    }
}
