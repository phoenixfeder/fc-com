package server.services.register;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import server.config.Lang;
import server.entities.dto.RequestDTO;
import server.entities.dto.request.UserRequest;
import server.entities.dto.response.RegisterResponse;
import server.entities.repositories.UserRepository;
import server.exceptions.WrongFormatException;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class CheckRegisterEntries {

    private UserRepository userRepository;

    @Autowired
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

    public RegisterResponse validate(RequestDTO requestDTO) throws WrongFormatException {

        RegisterResponse registerResponse = new RegisterResponse();

        if(requestDTO == null || requestDTO.getRegisterRequest() == null
                || requestDTO.getRegisterRequest().getUserRequest().getUsername() == null
                || requestDTO.getRegisterRequest().getUserRequest().getEmail() == null
                || requestDTO.getRegisterRequest().getUserRequest().getPassword() == null){
            throw new WrongFormatException();
        }

        UserRequest userRequest = requestDTO.getRegisterRequest().getUserRequest();

        //USERNAME
        if(isUserNameTaken(userRequest.getUsername())){
            registerResponse.setMessageUsername(Lang.UsernameIsTaken);
        }else{
            if (isUsernameIncorrect(userRequest.getUsername())) {
                registerResponse.setMessageUsername(Lang.UsernameSymbols);
            }else{
                if (isUsernameLengthIncorrect(userRequest.getUsername())) {
                    registerResponse.setMessageUsername(Lang.UsernameTooShort);
                }
            }
        }

        //MAIL
        if (isEmailTaken(userRequest.getEmail())) {
            registerResponse.setMessageEmail(Lang.EmailIsTaken);
        } else {
            if (isEmailIncorrect(userRequest.getEmail())) {
                registerResponse.setMessageEmail(Lang.EmailFormat);
            }
        }

        //PASSWORD
        if (isPasswordLengthIncorrect(userRequest.getPassword())) {
            registerResponse.setMessagePassword(Lang.PasswordTooShort);
        }

        return registerResponse;
    }
}
