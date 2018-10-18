package server.entities.repositories;

import org.springframework.data.repository.CrudRepository;
import server.entities.FlashCard;

public interface FlashCardRepository extends CrudRepository<FlashCard, Long> {
}
