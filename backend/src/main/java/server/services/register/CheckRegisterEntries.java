package server.services.register;

import org.springframework.stereotype.Component;
import server.entities.repositories.UserRepository;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class CheckRegisterEntries {

    private UserRepository userRepository;

    public CheckRegisterEntries(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean isUserNameTaken(String name) {
        return userRepository.findUserByUsername(name) != null;
    }

    public boolean isUsernameLengthIncorrect(String name) {
        return (name.length() < 3 || name.length() > 12);
    }

    public boolean isUsernameIncorrect(String name){
        Pattern pattern = Pattern.compile("\\A[a-zA-Z0-9]+([_\\-]?[a-zA-Z0-9])*\\z");
        Matcher matcher = pattern.matcher(name);
        return !matcher.matches();
    }

    public boolean isEmailTaken(String email) {
        return userRepository.findUserByEmail(email) != null;
    }

    public boolean isEmailIncorrect(String mail) {
        Pattern pattern = Pattern.compile("\\A(?=[a-z0-9@.!#$%&'*+/=?^_`{|}~-]{6,254}\\z)" +
                "(?=[a-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@)" +
                "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*" +
                "@(?:(?=[a-z0-9-]{1,63}\\.)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+" +
                "(?=[a-z0-9-]{1,63}\\z)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\z");
        Matcher matcher = pattern.matcher(mail);
        return !matcher.matches();
    }

    public boolean isPasswordLengthIncorrect(String password) {
        return (password.length() < 6 || password.length() > 32);
    }
}
