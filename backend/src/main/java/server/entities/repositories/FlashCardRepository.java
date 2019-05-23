package server.entities.repositories;

import org.springframework.data.repository.CrudRepository;
import server.entities.FlashCard;
import server.entities.FlashCardBox;

import java.util.List;

public interface FlashCardRepository extends CrudRepository<FlashCard, Long> {
    List<FlashCard> getAllByFlashcardBox(FlashCardBox flashCardBox);

    long countByFlashcardBox(FlashCardBox box);
}
