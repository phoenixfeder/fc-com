package server.modules.dbconnector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import server.entities.Session;
import server.entities.User;
import server.entities.repositories.SessionRepository;

@Component
public class SessionConnector {
    private final SessionRepository sessionRepository;

    @Autowired
    public SessionConnector(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public boolean existsBySession(String session) {
        return sessionRepository.existsBySession(session);
    }

    public Session save(Session session) {
        return sessionRepository.save(session);
    }

    public void delete(Session authenticate) {
        sessionRepository.delete(authenticate);
    }

    public Session findBySession(String session) {
        return sessionRepository.findBySession(session);
    }

    @Transactional
    public void deleteByUser(User user) {
        sessionRepository.deleteByUser(user);
    }
}
