package server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.config.Lang;
import server.config.StatusCode;
import server.entities.Role;
import server.entities.User;
import server.entities.VerificationToken;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.dto.request.UserRequest;
import server.entities.dto.response.RegisterResponse;
import server.entities.dto.response.StatusResponse;
import server.entities.dto.response.UserResponse;
import server.entities.repositories.RoleRepository;
import server.entities.repositories.UserRepository;
import server.entities.repositories.VerificationTokenRepository;
import server.services.register.CheckRegisterEntries;
import server.services.register.MailSending;

import java.util.Calendar;
import java.util.UUID;

@Service
public class RegisterService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final VerificationTokenRepository verificationTokenRepository;
    private CheckRegisterEntries checkRegisterEntries;

    private final MailSending mailSending;

    @Autowired
    public RegisterService(UserRepository userRepository, RoleRepository roleRepository, VerificationTokenRepository verificationTokenRepository, CheckRegisterEntries checkRegisterEntries, MailSending mailSending) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.verificationTokenRepository = verificationTokenRepository;
        this.checkRegisterEntries = checkRegisterEntries;
        this.mailSending = mailSending;
    }

    public ResponseDTO checkUsername(String name) {
        ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.OK));

        if (checkRegisterEntries.isUserNameTaken(name)) {
            RegisterResponse registerResponse = new RegisterResponse();
            registerResponse.setMessageUsername(Lang.UsernameIsTaken);
            responseDTO.setRegisterResponse(registerResponse);
        }

        System.out.println(UUID.randomUUID());

        if (name.length() < 3 || name.length() > 12) {
            RegisterResponse registerResponse = new RegisterResponse();
            registerResponse.setMessageUsername(Lang.UsernameTooShort);
            responseDTO.setRegisterResponse(registerResponse);
        }

        return responseDTO;
    }


    public ResponseDTO checkMail(String mail) {
        ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.OK));

        if (checkRegisterEntries.isEmailTaken(mail)) {
            RegisterResponse registerResponse = new RegisterResponse();
            registerResponse.setMessageEmail(Lang.EmailIsTaken);
            responseDTO.setRegisterResponse(registerResponse);
        }

        return responseDTO;
    }

    public ResponseDTO addUser(RequestDTO requestDTO) {

        ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.OK));

        RegisterResponse registerResponse = new RegisterResponse();
        responseDTO.setRegisterResponse(registerResponse);

        try {
            UserRequest userRequest = requestDTO.getRegisterRequest().getUserRequest();

            if (checkRegisterEntries.isUserNameTaken(userRequest.getUsername())) {
                responseDTO.getRegisterResponse().setMessageUsername(Lang.UsernameIsTaken);
                responseDTO.setStatusResponse(StatusResponse.create(StatusCode.REGISTERERROR));
            } else {
                if(checkRegisterEntries.isUsernameIncorrect(userRequest.getUsername())){
                    responseDTO.getRegisterResponse().setMessageUsername(Lang.UsernameSymbols);
                    responseDTO.setStatusResponse(StatusResponse.create(StatusCode.REGISTERERROR));
                }else{
                    if (checkRegisterEntries.isUsernameLengthIncorrect(userRequest.getUsername())) {
                        responseDTO.getRegisterResponse().setMessageUsername(Lang.UsernameTooShort);
                        responseDTO.setStatusResponse(StatusResponse.create(StatusCode.REGISTERERROR));
                    }
                }


            }

            if (checkRegisterEntries.isEmailTaken(userRequest.getEmail())) {
                responseDTO.getRegisterResponse().setMessageEmail(Lang.EmailIsTaken);
                responseDTO.setStatusResponse(StatusResponse.create(StatusCode.REGISTERERROR));
            } else {
                if (checkRegisterEntries.isEmailIncorrect(userRequest.getEmail())) {
                    responseDTO.getRegisterResponse().setMessageEmail(Lang.EmailFormat);
                    responseDTO.setStatusResponse(StatusResponse.create(StatusCode.REGISTERERROR));
                }
            }

            if (checkRegisterEntries.isPasswordLengthIncorrect(userRequest.getPassword())) {
                responseDTO.getRegisterResponse().setMessagePassword(Lang.PasswordTooShort);
                responseDTO.setStatusResponse(StatusResponse.create(StatusCode.REGISTERERROR));
            }


            if (responseDTO.getStatusResponse().isOk()) {
                User user = new User();
                user.insertDTOData(userRequest);
                if (roleRepository.findById(1).isPresent()) {
                    Role role = roleRepository.findById(1).get();
                    user.setRole(role);
                }
                User newuser = userRepository.save(user);
                VerificationToken token = verificationTokenRepository.save(new VerificationToken(newuser));

                mailSending.send(newuser.getEmail(), newuser.getUsername(), String.valueOf(newuser.getId()), token.getToken());

                responseDTO.getRegisterResponse().setUserResponse(new UserResponse(userRequest));
            }

        } catch (Exception e) {
            e.printStackTrace();
            responseDTO.setStatusResponse(StatusResponse.create(StatusCode.FORMATERROR));
            return responseDTO;
        }

        return responseDTO;
    }

    public ResponseDTO verifyUser(String id, String token) {
        ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.OK));

        if(id == null || token == null){
            responseDTO.setStatusResponse(StatusResponse.create(StatusCode.PATHERROR));
            return responseDTO;
        }
        int id_int;
        try{
            id_int = Integer.parseInt(id);
        }catch (NumberFormatException e){
            e.printStackTrace();
            responseDTO.setStatusResponse(StatusResponse.create(StatusCode.PATHERROR));
            return responseDTO;
        }
        if(!userRepository.findById((long)id_int).isPresent()){
            responseDTO.setStatusResponse(StatusResponse.create(StatusCode.VERIFYERROR));
            return responseDTO;
        }

        User user = userRepository.findById((long)id_int).get();

        VerificationToken verificationToken = verificationTokenRepository.findByUser(user);
        if(verificationToken == null){
            responseDTO.setStatusResponse(StatusResponse.create(StatusCode.VERIFYERROR));
            return responseDTO;
        }

        if(!token.equals(verificationToken.getToken())){
            responseDTO.setStatusResponse(StatusResponse.create(StatusCode.VERIFYERROR));
            return responseDTO;
        }

        if(Calendar.getInstance().getTime().getTime() > verificationToken.getExpiryDate().getTime()){
            responseDTO.setStatusResponse(StatusResponse.create(StatusCode.TOKENEXPIRED));
            return responseDTO;
        }

        user.setEnabled(true);
        userRepository.save(user);
        verificationTokenRepository.delete(verificationToken);

        RegisterResponse registerResponse = new RegisterResponse();
        registerResponse.setUserResponse(new UserResponse(user.getUsername()));
        responseDTO.setRegisterResponse(registerResponse);

        return responseDTO;
    }
}
