package server.entities.repositories;

import org.springframework.data.repository.CrudRepository;
import server.entities.FlashCard;
import server.entities.FlashCardBox;

import java.util.List;

public interface FlashCardRepository extends CrudRepository<FlashCard, Long> {
    FlashCard findByIdAndFlashcardBox(long id, FlashCardBox flashCardBox);

    List<FlashCard> getAllByFlashcardBox(FlashCardBox flashCardBox);

    void deleteByIdAndFlashcardBox(long id, FlashCardBox flashCardBox);

    void deleteAllByFlashcardBox(FlashCardBox flashCardBox);

    long countByFlashcardBox(FlashCardBox box);
}
