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
import server.modules.dbConnector.RoleConnector;
import server.modules.dbConnector.TokenConnector;
import server.modules.dbConnector.UserConnector;
import server.modules.utils.Mail;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class RegisterComponent {

    private final PasswordEncoder passwordEncoder;
    private final Mail mail;
    private final UserConnector userConnector;
    private final TokenConnector tokenConnector;
    private final RoleConnector roleConnector;

//    final private UserRepository userRepository;
//    final private RoleRepository roleRepository;
//    final private VerificationTokenRepository verificationTokenRepository;

    @Autowired
    public RegisterComponent(PasswordEncoder passwordEncoder, Mail mail, UserConnector userConnector, RoleConnector roleConnector, TokenConnector tokenConnector) {
        this.passwordEncoder = passwordEncoder;
        this.mail = mail;
        this.userConnector = userConnector;
        this.roleConnector = roleConnector;
        this.tokenConnector = tokenConnector;
    }

    public boolean isUserNameTaken(String name) {
        return userConnector.getUserByName(name) != null;
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
        return userConnector.getUserByEmail(email) != null;
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
        Role role = roleConnector.findById(1);
        newUser.setRole(role);
        userConnector.save(newUser);
        tokenConnector.save(new VerificationToken(newUser));

        return newUser;
    }

    public boolean sendVerificationMail(User user){
        VerificationToken token = tokenConnector.getTokenByUser(user);
        try {
            mail.send(user.getEmail(), user.getUsername(), String.valueOf(user.getId()), token.getToken());
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }
}