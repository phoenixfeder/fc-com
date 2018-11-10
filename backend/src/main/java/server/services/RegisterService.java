package server.services;

import org.springframework.stereotype.Service;
import server.entities.User;
import server.entities.dto.response.Register;
import server.entities.dto.response.Status;
import server.entities.dto.ResponseDTO;
import server.entities.repositories.UserRepository;

@Service
public class RegisterService {
    private final UserRepository userRepository;

    public RegisterService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseDTO isUsernameTaken(String name){
        User user = userRepository.findUserByUserName(name);
        ResponseDTO responseDTO = new ResponseDTO();

        if(user != null){
            responseDTO.setStatus(Status.notOk("Username is taken"));
            Register register = new Register();
            register.setUserNameIsTaken(true);
            responseDTO.setRegister(register);
        }else{
            responseDTO.setStatus(Status.ok());
        }


        return responseDTO;
    }
}
