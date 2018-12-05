package server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import server.config.Lang;
import server.config.StatusCode;
import server.entities.Role;
import server.entities.Session;
import server.entities.User;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.dto.response.StatusResponse;
import server.entities.dto.response.UserResponse;
import server.entities.repositories.SessionRepository;
import server.entities.repositories.UserRepository;
import server.services.authentication.Authentication;
import server.services.register.CheckRegisterEntries;

@Service
public class EditProfileService {

    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;
    private final PasswordEncoder passwordEncoder;
    private final Authentication authentication;
    private final CheckRegisterEntries registerEntries;

    @Autowired
    public EditProfileService(UserRepository userRepository, SessionRepository sessionRepository, PasswordEncoder passwordEncoder, Authentication authentication, CheckRegisterEntries registerEntries) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.passwordEncoder = passwordEncoder;
        this.authentication = authentication;
        this.registerEntries = registerEntries;
    }

    public ResponseDTO getAccountData(RequestDTO requestDTO) {
        System.out.println(requestDTO.getSession());
        if (!authentication.authenticate(requestDTO.getSession())) {
            return new ResponseDTO(StatusResponse.create(StatusCode.PERMISSIONDENIED));
        }

        Session session = sessionRepository.findBySession(requestDTO.getSession().getSession());
        User user = session.getUser();

        Role role = user.getRole();

        if (role.getId() == 2 && requestDTO.getUserRequest() != null) {
            if (userRepository.existsById(requestDTO.getUserRequest().getUserID())
                    && userRepository.findById(requestDTO.getUserRequest().getUserID()).isPresent()) {
                user = userRepository.findById(requestDTO.getUserRequest().getUserID()).get();
            } else {
                return new ResponseDTO(StatusResponse.create(StatusCode.DATANOTFOUND));
            }
        }

        ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.OK));

        responseDTO.setUserResponse(new UserResponse(user));
        return responseDTO;
    }

    public ResponseDTO setAccountData(RequestDTO requestDTO) {
        System.out.println(requestDTO.getSession());
        if (!authentication.authenticate(requestDTO.getSession())) {
            return new ResponseDTO(StatusResponse.create(StatusCode.PERMISSIONDENIED));
        }

        if (requestDTO.getUserRequest() == null) {
            return new ResponseDTO(StatusResponse.create(StatusCode.FORMATERROR));
        }

        Session session = sessionRepository.findBySession(requestDTO.getSession().getSession());

        Role role = session.getUser().getRole();

        User user;

        if (role.getId() == 2 && requestDTO.getUserRequest().getUserID() > 0 && userRepository.findById(requestDTO.getUserRequest().getUserID()).isPresent()) {
            user = userRepository.findById(requestDTO.getUserRequest().getUserID()).get();
        } else {
            user = session.getUser();
        }

        user.updateNonSensitiveData(requestDTO.getUserRequest());

        user = userRepository.save(user);

        if (requestDTO.getUserRequest().getPassword() == null && requestDTO.getUserRequest().getEmail() == null) {
            return new ResponseDTO(StatusResponse.create(StatusCode.OK));
        }

        UserResponse userResponse = new UserResponse();


        if (requestDTO.getUserRequest().getOldPassword() == null || !passwordEncoder.matches(requestDTO.getUserRequest().getOldPassword(), user.getPassword())) {
            userResponse.setOldPasswordErrorMsg(Lang.PasswordIncorrect);
            ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.EDITPROFILEERROR));
            responseDTO.setUserResponse(userResponse);
            return responseDTO;
        }

        if (requestDTO.getUserRequest().getPassword() != null) {
            if (registerEntries.isPasswordLengthIncorrect(requestDTO.getUserRequest().getPassword())) {
                userResponse.setNewPasswordErrorMsg(Lang.PasswordTooShort);
            }
        }

        String newEmail = requestDTO.getUserRequest().getEmail();
        if (newEmail != null) {
            if (registerEntries.isEmailTaken(newEmail) && !(newEmail.equals(user.getEmail()))) {
                userResponse.setNewPasswordErrorMsg(Lang.EmailIsTaken);
            }
            if (registerEntries.isEmailIncorrect(requestDTO.getUserRequest().getEmail())) {
                userResponse.setNewEmailErrorMsg(Lang.EmailFormat);
            }
        }

        if (!userResponse.isOK()) {
            ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.EDITPROFILEERROR));
            responseDTO.setUserResponse(userResponse);
            return responseDTO;
        }

        if (requestDTO.getUserRequest().getPassword() != null) {
            user.setPassword(passwordEncoder.encode(requestDTO.getUserRequest().getPassword()));
        }
        if (newEmail != null) {
            user.setEmail(requestDTO.getUserRequest().getEmail());
        }

        userRepository.save(user);

        ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.OK));
        responseDTO.setUserResponse(userResponse);
        return responseDTO;
    }
}