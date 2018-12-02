package server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import server.config.StatusCode;
import server.entities.Session;
import server.entities.User;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.dto.request.UserRequest;
import server.entities.dto.response.StatusResponse;
import server.entities.repositories.SessionRepository;
import server.entities.repositories.UserRepository;
import server.exceptions.WrongFormatException;

import java.util.UUID;

@Service
public class LoginService {

    private final PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private SessionRepository sessionRepository;

    @Autowired
    public LoginService(PasswordEncoder passwordEncoder, UserRepository userRepository, SessionRepository sessionRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
    }

    public ResponseDTO validateLogin(RequestDTO requestDTO){
        ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.OK));
        UserRequest userRequest;
        try{
            userRequest = requestDTO.getUserRequest();
            if(userRequest.getUsername() == null || userRequest.getPassword() == null){
                throw new WrongFormatException();
            }

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseDTO(StatusResponse.create(StatusCode.FORMATERROR));
        }

        User user = userRepository.findUserByUsername(userRequest.getUsername());

        System.out.println(user);

        if(user == null){
            user = userRepository.findUserByEmail(userRequest.getUsername());
        }

        if(user == null){
            return new ResponseDTO(StatusResponse.create(StatusCode.WRONGUNORPW));
        }

        if(!passwordEncoder.matches(userRequest.getPassword(), user.getPassword())){
            return new ResponseDTO(StatusResponse.create(StatusCode.WRONGUNORPW));
        }

        if(!user.isEnabled()){
            return new ResponseDTO(StatusResponse.create(StatusCode.USERNOTENABLED));
        }

        String session;
        do{
            session = UUID.randomUUID().toString();
        }while(sessionRepository.existsBySession(session));

        Session sessionEntity = new Session(session,user);
        sessionEntity = sessionRepository.save(sessionEntity);

        responseDTO.getStatusResponse().setSession(new server.entities.dto.response.Session());
        responseDTO.getStatusResponse().getSession().setHash(passwordEncoder.encode(String.valueOf(sessionEntity.getId())));
        responseDTO.getStatusResponse().getSession().setSession(session);
        responseDTO.getStatusResponse().getSession().setUsername(user.getUsername());
        responseDTO.getStatusResponse().getSession().setId(user.getId());

        //TODO HIER IST ALLES KORREKT --> LOGIN


        return responseDTO;
    }
}
