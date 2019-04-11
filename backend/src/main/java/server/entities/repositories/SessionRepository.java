package server.entities.repositories;

import org.springframework.data.repository.CrudRepository;
import server.entities.Session;
import server.entities.User;

public interface SessionRepository extends CrudRepository<Session, Long> {

    boolean existsBySession(String session);

    Session findBySession(String session);

    void deleteBySession(String session);

    void deleteByUser(User user);
}
