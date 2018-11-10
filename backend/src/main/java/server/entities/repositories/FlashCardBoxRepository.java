package server.entities.repositories;

import org.springframework.data.repository.CrudRepository;
import server.entities.FlashCardBox;

public interface FlashCardBoxRepository extends CrudRepository<FlashCardBox, Integer> {
}
