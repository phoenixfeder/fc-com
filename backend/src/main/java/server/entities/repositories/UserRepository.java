package server.entities.repositories;

import org.springframework.data.repository.CrudRepository;
import server.entities.FlashCard;

public interface UserRepository extends CrudRepository<FlashCard, Long> {
}
