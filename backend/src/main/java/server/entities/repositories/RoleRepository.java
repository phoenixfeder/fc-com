package server.entities.repositories;

import org.springframework.data.repository.CrudRepository;
import server.entities.Role;

public interface RoleRepository extends CrudRepository<Role, Integer> {
}
