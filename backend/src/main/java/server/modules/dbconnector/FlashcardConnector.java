package server.modules.dbconnector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import server.entities.FlashCard;
import server.entities.FlashCardBox;
import server.entities.FlashCardStatistics;
import server.entities.User;
import server.entities.repositories.FlashCardRepository;
import server.entities.repositories.FlashCardStatisticsRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class FlashcardConnector {

    private final FlashCardRepository flashCardRepository;
    private final FlashCardStatisticsRepository flashCardStatisticsRepository;

    @Autowired
    public FlashcardConnector(FlashCardRepository flashCardRepository, FlashCardStatisticsRepository flashCardStatisticsRepository) {
        this.flashCardRepository = flashCardRepository;
        this.flashCardStatisticsRepository = flashCardStatisticsRepository;
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
    public Long countFlashcards(FlashCardBox flashCardBox){
        return flashCardRepository.countByFlashcardBox(flashCardBox);
    }
}
