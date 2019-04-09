package server.modules.dbConnector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import server.entities.Session;
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

    public void deleteBySession(String session) {
        sessionRepository.deleteBySession(session);
    }
}
