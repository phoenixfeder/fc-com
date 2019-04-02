package server.modules.dbConnector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import server.entities.User;
import server.entities.repositories.UserRepository;

@Component
public class UserConnector {

    private final UserRepository userRepository;

    @Autowired
    public UserConnector(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByID(long id){
        return userRepository.findById(id).orElse(null);
    }

    public User save(User user){
        return userRepository.save(user);
    }

    public boolean existsByID(long id){
        return userRepository.findById(id).isPresent();
    }

}
