package server.modules.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import server.config.Lang;
import server.entities.Role;
import server.entities.User;
import server.entities.VerificationToken;
import server.entities.dto.request.RegisterRequest;
import server.entities.dto.request.UserRequest;
import server.entities.dto.response.RegisterResponse;
import server.entities.repositories.RoleRepository;
import server.entities.repositories.UserRepository;
import server.entities.repositories.VerificationTokenRepository;
import server.modules.utils.Mail;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class RegisterComponent {

    final private PasswordEncoder passwordEncoder;
    final private Mail mail;


    //TODO Connectoren verwenden
    final private UserRepository userRepository;
    final private RoleRepository roleRepository;
    final private VerificationTokenRepository verificationTokenRepository;

    @Autowired
    public RegisterComponent(PasswordEncoder passwordEncoder, Mail mail, UserRepository userRepository, RoleRepository roleRepository, VerificationTokenRepository verificationTokenRepository) {
        this.passwordEncoder = passwordEncoder;
        this.mail = mail;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.verificationTokenRepository = verificationTokenRepository;
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

    public RegisterResponse checkEntriesAndGetResponse(RegisterRequest registerRequest) {
        RegisterResponse registerResponse = new RegisterResponse();

        UserRequest userRequest = registerRequest.getUserRequest();

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

    public User createNewUser(UserRequest userRequest) {
        User newUser = new User();
        newUser.insertDTOData(userRequest);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        Role role = roleRepository.findById(1).orElse(null);
        newUser.setRole(role);
        User savedUser = userRepository.save(newUser);
        VerificationToken token = verificationTokenRepository.save(new VerificationToken(savedUser));

        return savedUser;
    }

    public boolean sendVerificationMail(User user){
        VerificationToken token = verificationTokenRepository.findByUser(user);
        try {
            mail.send(user.getEmail(), user.getUsername(), String.valueOf(user.getId()), token.getToken());
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
