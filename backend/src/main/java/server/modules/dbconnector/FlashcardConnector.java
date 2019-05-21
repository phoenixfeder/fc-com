package server.modules.dbconnector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import server.entities.FlashCard;
import server.entities.FlashCardBox;
import server.entities.repositories.FlashCardRepository;

import java.util.List;

@Component
public class FlashcardConnector {

    private final FlashCardRepository flashCardRepository;

    @Autowired
    public FlashcardConnector(FlashCardRepository flashCardRepository) {
        this.flashCardRepository = flashCardRepository;
    }

    public FlashCard save(FlashCard flashCard) {
        return flashCardRepository.save(flashCard);
    }

    public FlashCard getById(Long id) {
        return flashCardRepository.findById(id).orElse(null);
    }

    public List<FlashCard> getByFlashCardBox(FlashCardBox flashCardBox) {
        return flashCardRepository.getAllByFlashcardBox(flashCardBox);
    }

    public void deleteById(Long id) {
        flashCardRepository.deleteById(id);
    }

    @Transactional
    public void deleteByFlashCardBox(FlashCardBox flashCardBox) {
        flashCardRepository.deleteAllByFlashcardBox(flashCardBox);
    }

    @Transactional
    public Long countFlashcards(FlashCardBox flashCardBox) {
        return flashCardRepository.countByFlashcardBox(flashCardBox);
    }
}
