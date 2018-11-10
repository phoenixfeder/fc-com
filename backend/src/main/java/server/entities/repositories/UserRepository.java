package server.entities.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import server.entities.User;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
    User findUserByUsername(String username);
    User findUserByEmail(String email);
}
