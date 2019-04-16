package server.modules.dbConnector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import server.entities.FlashCardBox;
import server.entities.User;
import server.entities.repositories.FlashCardBoxRepository;

import java.util.List;

@Component
public class FlashCardBoxConnector {
    private final FlashCardBoxRepository flashCardBoxRepository;

    @Autowired
    public FlashCardBoxConnector(FlashCardBoxRepository flashCardBoxRepository) {
        this.flashCardBoxRepository = flashCardBoxRepository;
    }

    public List<FlashCardBox> getAllBoxFromUser(User user) {
        return flashCardBoxRepository.getAllByOwner(user);
    }

    public FlashCardBox save(FlashCardBox flashCardBox) {
        return flashCardBoxRepository.save(flashCardBox);
    }

    @Transactional
    public void deleteByIdAndUser(User user, Long id) {
        flashCardBoxRepository.deleteByOwnerAndId(user, id);
    }

    @Transactional
    public void deleteByUser(User user) {
        flashCardBoxRepository.deleteAllByOwner(user);
    }

    @Transactional
    public FlashCardBox getBoxByIdAndUser(Long id, User user) {
        return flashCardBoxRepository.findByIdAndOwner(id, user);
    }
}
