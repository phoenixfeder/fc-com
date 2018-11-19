package server.services.register;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import server.entities.repositories.UserRepository;

@Component
public class CheckRegisterEntries {

    private UserRepository userRepository;

    public CheckRegisterEntries(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean isUserNameTaken(String name){
        return userRepository.findUserByUsername(name) != null;
    }

    public boolean isUsernameLengthIncorrect(String name){
        return (name.length() < 3 || name.length() > 12);
    }

    public boolean isEmailTaken(String email){
        return userRepository.findUserByEmail(email) != null;
    }

    public boolean isEmailIncorrect(String mail){
        return false;
    }

    public boolean isPasswordLengthIncorrect(String password){
        return (password.length() < 6 || password.length() > 32);
    }
}
