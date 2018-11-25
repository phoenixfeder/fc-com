package server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import server.exceptions.register.WrongFormatException;
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
    private final PasswordEncoder passwordEncoder;

    private final MailSending mailSending;

    @Autowired
    public RegisterService(UserRepository userRepository, RoleRepository roleRepository, VerificationTokenRepository verificationTokenRepository, CheckRegisterEntries checkRegisterEntries, MailSending mailSending, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.verificationTokenRepository = verificationTokenRepository;
        this.checkRegisterEntries = checkRegisterEntries;
        this.mailSending = mailSending;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseDTO addUser(RequestDTO requestDTO) {


        RegisterResponse registerResponse;

        try{
            registerResponse = checkRegisterEntries.validate(requestDTO);
        }catch(WrongFormatException e){
            e.printStackTrace();
            return new ResponseDTO(StatusResponse.create(StatusCode.FORMATERROR));
        }

        if(!registerResponse.isOk()){
            ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.REGISTERERROR));
            responseDTO.setRegisterResponse(registerResponse);
            return responseDTO;
        }

        UserRequest userRequest = requestDTO.getRegisterRequest().getUserRequest();

        User newUser = new User();
        newUser.insertDTOData(userRequest);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        Role role = roleRepository.findById(1).orElse(null);
        newUser.setRole(role);

        User savedUser = userRepository.save(newUser);

        VerificationToken token = verificationTokenRepository.save(new VerificationToken(savedUser));

        try{
            mailSending.send(savedUser.getEmail(), savedUser.getUsername(), String.valueOf(savedUser.getId()), token.getToken());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseDTO(StatusResponse.create(StatusCode.EMAILSENDERROR));
        }


        ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.OK));
        responseDTO.setRegisterResponse(registerResponse);
        responseDTO.getRegisterResponse().setUserResponse(new UserResponse(userRequest));

        return responseDTO;
    }

    public ResponseDTO verifyUser(String id, String token) {
        ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.OK));

        if (id == null || token == null) {
            responseDTO.setStatusResponse(StatusResponse.create(StatusCode.PATHERROR));
            return responseDTO;
        }
        int id_int;
        try {
            id_int = Integer.parseInt(id);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            responseDTO.setStatusResponse(StatusResponse.create(StatusCode.PATHERROR));
            return responseDTO;
        }
        if (!userRepository.findById((long) id_int).isPresent()) {
            responseDTO.setStatusResponse(StatusResponse.create(StatusCode.VERIFYERROR));
            return responseDTO;
        }

        User user = userRepository.findById((long) id_int).get();

        VerificationToken verificationToken = verificationTokenRepository.findByUser(user);
        if (verificationToken == null) {
            responseDTO.setStatusResponse(StatusResponse.create(StatusCode.VERIFYERROR));
            return responseDTO;
        }

        if (!token.equals(verificationToken.getToken())) {
            responseDTO.setStatusResponse(StatusResponse.create(StatusCode.VERIFYERROR));
            return responseDTO;
        }

        if (Calendar.getInstance().getTime().getTime() > verificationToken.getExpiryDate().getTime()) {
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
