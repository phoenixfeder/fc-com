package server.entities.repositories;

import org.springframework.data.repository.CrudRepository;
import server.entities.UserGroup;

public interface UserGroupRepository extends CrudRepository<UserGroup, Long> {
}
