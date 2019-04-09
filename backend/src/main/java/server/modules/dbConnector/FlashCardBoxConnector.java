package server.modules.dbConnector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import server.entities.FlashCardBox;
import server.entities.User;
import server.entities.repositories.FlashCardBoxRepository;

import java.util.List;
import java.util.Set;

@Component
public class FlashCardBoxConnector {
    private final FlashCardBoxRepository flashCardBoxRepository;

    @Autowired
    public FlashCardBoxConnector(FlashCardBoxRepository flashCardBoxRepository) {
        this.flashCardBoxRepository = flashCardBoxRepository;
    }

    public List<FlashCardBox> getAllBoxFromUser(User user){
        return flashCardBoxRepository.getAllByOwner(user);
    }
}
