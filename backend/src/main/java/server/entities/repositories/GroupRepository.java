package server.entities.repositories;

import org.springframework.data.repository.CrudRepository;
import server.entities.UserGroup;

public interface GroupRepository extends CrudRepository<UserGroup, Long> {
}
