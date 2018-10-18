package server.entities;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<FlashCard, Long> {
}
