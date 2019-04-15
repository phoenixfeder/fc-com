package server.entities.repositories;

import org.springframework.data.repository.CrudRepository;
import server.entities.FlashCardBox;
import server.entities.User;

import java.util.List;

public interface FlashCardBoxRepository extends CrudRepository<FlashCardBox, Long> {
    List<FlashCardBox> getAllByOwner(User user);
    void deleteByOwnerAndId(User user, Long id);

    void deleteAllByOwner(User user);

    FlashCardBox findByIdAndOwner(Long id, User user);
}
