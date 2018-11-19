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

import java.util.UUID;

@Service
public class RegisterService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final VerificationTokenRepository verificationTokenRepository;
    private CheckRegisterEntries checkRegisterEntries;

    @Autowired
    public RegisterService(UserRepository userRepository, RoleRepository roleRepository, VerificationTokenRepository verificationTokenRepository, CheckRegisterEntries checkRegisterEntries) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.verificationTokenRepository = verificationTokenRepository;
        this.checkRegisterEntries = checkRegisterEntries;
    }

    public ResponseDTO checkUsername(String name) {
        ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.OK));

        if (checkRegisterEntries.isUserNameTaken(name)) {
            RegisterResponse registerResponse = new RegisterResponse();
            registerResponse.setMessageUsername(Lang.UsernameIsTaken);
            responseDTO.setRegisterResponse(registerResponse);
        }

        System.out.println(UUID.randomUUID());

        if (name.length() < 3 || name.length() > 12){
            RegisterResponse registerResponse = new RegisterResponse();
            registerResponse.setMessageUsername(Lang.UsernameTooShort);
            responseDTO.setRegisterResponse(registerResponse);
        }

        return responseDTO;
    }


    public ResponseDTO checkMail(String mail) {
        ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.OK));

        if(checkRegisterEntries.isEmailTaken(mail)){
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
            }else{
                if(checkRegisterEntries.isUsernameLengthIncorrect(userRequest.getUsername())){
                    responseDTO.getRegisterResponse().setMessageUsername(Lang.UsernameTooShort);
                    responseDTO.setStatusResponse(StatusResponse.create(StatusCode.REGISTERERROR));
                }
            }

            if (checkRegisterEntries.isEmailTaken(userRequest.getEmail())) {
                responseDTO.getRegisterResponse().setMessageEmail(Lang.EmailIsTaken);
                responseDTO.setStatusResponse(StatusResponse.create(StatusCode.REGISTERERROR));
            }else{
                if(checkRegisterEntries.isEmailIncorrect(userRequest.getEmail())){
                    responseDTO.getRegisterResponse().setMessageEmail(Lang.EmailFormat);
                    responseDTO.setStatusResponse(StatusResponse.create(StatusCode.REGISTERERROR));
                }
            }

            if(checkRegisterEntries.isPasswordLengthIncorrect(userRequest.getPassword())){
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
                VerificationToken verificationToken = new VerificationToken(newuser);
                verificationTokenRepository.save(verificationToken);

                responseDTO.getRegisterResponse().setUserResponse(new UserResponse(userRequest));
            }

        } catch (Exception e) {
            e.printStackTrace();
            responseDTO.setStatusResponse(StatusResponse.create(StatusCode.FORMATERROR));
            return responseDTO;
        }

        return responseDTO;
    }
}
