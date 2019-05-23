package server.modules.dbconnector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import server.entities.User;
import server.entities.dto.request.UserRequest;
import server.entities.repositories.UserRepository;
import server.exceptions.WrongUsernameOrPasswordException;

@Component
public class UserConnector {

    private final UserRepository userRepository;

    @Autowired
    public UserConnector(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByID(long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByName(String name) {
        return userRepository.findUserByUsername(name);
    }

    public User getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User getUserByNameOrEmail(UserRequest userRequest) throws WrongUsernameOrPasswordException {
        String username = userRequest.getUsername();
        User user = getUserByName(username);
        if (user == null) {
            user = getUserByEmail(username);
        }
        if (user == null) {
            throw new WrongUsernameOrPasswordException();
        }
        return user;
    }

    public void delete(User user) {
        userRepository.delete(user);
    }
}
