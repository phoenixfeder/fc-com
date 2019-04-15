package server.modules.account;

import org.springframework.stereotype.Component;
import server.entities.User;
import server.entities.dto.RequestDTO;
import server.entities.dto.request.UserRequest;
import server.exceptions.WrongFormatException;
import server.modules.authentication.Authenticator;

public class Profile {

    public static User updateNonSensitiveData(UserRequest userRequest, User user) throws WrongFormatException {
        try {
            if (userRequest.getDateOfBirth() != null) {
                user.setDateOfBirth(userRequest.getDateOfBirth());
            }
            if (userRequest.getRealName() != null) {
                user.setRealName(userRequest.getRealName());
            }
            if (userRequest.getInterest() != null) {
                user.setInterest(userRequest.getInterest());
            }
            return user;
        }catch(Exception e){
            throw new WrongFormatException();
        }
    }

    public static User updateSensitiveData(UserRequest userRequest, User user, Authenticator authenticator){
        if (userRequest.getPassword() != null) {
            user.setPassword(authenticator.encodePassword(userRequest.getPassword()));
        }
        if (userRequest.getEmail() != null) {
            user.setEmail(userRequest.getEmail());
        }

        return user;
    }
}
